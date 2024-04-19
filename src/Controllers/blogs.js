import BlogsService from "../Services/blogs.js";
import ClientsService from "../Services/clients.js";
import AdminsService from "../Services/admins.js";
import CommentsService from "../Services/comments.js";

import ResponseObj from "../ResponseObj/index.js";
import Valid from "../Utils/valid.js";
import Constants from "../Utils/constants.js";

const BlogsController = {
    getAuthorInfor: (authorId, allClient, allAdmin) => {
        allClient.forEach(client => {
            if(String(authorId) == String(client._id)){
                return {
                    _id: client._id,
                    userName: client.userName,
                    image: client.image,
                    role: "Customer",
                }
            }
        });

        allAdmin.forEach(admin => {
            if(String(authorId) == String(admin._id)){
                return {
                    _id: admin._id,
                    userName: admin.userName,
                    image: admin.image,
                    role: "Admin",
                }
            }
        });
    },

    getComments: async (commentId, allComments) => {
        allComments.forEach(comment => {
            if(String(commentId) == String(comment._id)){
                return comment;
            }
        });
    },

    getAllBlogs: async () => {
        return ResponseObj(200, Constants.success, await BlogsService.getAllBlogs());
    },

    getListBlogs: async () => {
        let allBlog = await BlogsService.getAllBlogs();
        let allClient = await ClientsService.getAllClients();
        let allAdmin = await AdminsService.getAllAdmins();
        let allComments = await CommentsService.getAllComments();

        let blogRs = [];
        
        allBlog.forEach(async (blog) => {
            let authorInfor = null;

            allClient.find(client => {
                if(String(blog.authorId) == String(client._id)){
                    authorInfor = {
                        _id: client._id,
                        userName: client.userName,
                        image: client.image,
                        role: "Customer",
                    }
                }
            });

            if(authorInfor == null || authorInfor == undefined)
                allAdmin.find(admin => {
                    if(String(blog.authorId) == String(admin._id)){
                        authorInfor = {
                            _id: admin._id,
                            userName: admin.userName,
                            image: admin.image,
                            role: "Admin",
                        }
                    }
                });
            
            let comments = [];
            allComments.forEach(comment => {
                if(String(comment.blogId) == String(blog._id)){
                    comments.push(comment);
                }
            });

            blogRs.push({
                _id: blog._id,
                title: blog.title,
                content: blog.content,
                image: blog.image,
                reactions: blog.reactions,
                comments: comments,
                createdAt: blog.createdAt,
                author: authorInfor
            });
        });
        
        return ResponseObj(200, Constants.success, blogRs);
    },

    getBlogById: async (id) => {
        let result = await BlogsService.getBlogById(id);
        if (result === null) {
            return ResponseObj(404, "blog not found", null);
        }
        return ResponseObj(200, Constants.success, result);
    },

    getDetailBlog: async (id) => {
        let blog = await BlogsService.getBlogById(id);
        if(blog === null) return ResponseObj(300, "Blog not found", null);
        let allClient = await ClientsService.getAllClients();
        let allAdmin = await AdminsService.getAllAdmins();
        let allComments = await CommentsService.getCommentByBlogId(id);


        let allCommentsAddAuthor = [];
        allComments.forEach(res => {
            let authorInfor = null;
            allClient.find(client => {
                if(String(res.authorId) == String(client._id)){
                    authorInfor = {
                        _id: client._id,
                        userName: client.userName,
                        image: client.image,
                        role: "Customer",
                    }
                }
            });

            if(authorInfor == null || authorInfor == undefined)
                allAdmin.find(admin => {
                    if(String(res.authorId) == String(admin._id)){
                        authorInfor = {
                            _id: admin._id,
                            userName: admin.userName,
                            image: admin.image,
                            role: "Admin",
                        }
                    }
                });
            
            allCommentsAddAuthor.push({
                _id: res._id,
                blogId: res.blogId,
                replyId: res.replyId,
                author: authorInfor,
                content: res.content,
                reactions: res.reactions,
                createdAt: res.createdAt
            });
        });


        let commentsRs = [];

        allCommentsAddAuthor.forEach(res => {
            if(res.replyId == null){
                let replys = [];
                allCommentsAddAuthor.forEach(reply => {
                    if(String(reply.replyId) == String(res._id)){
                        replys.push(reply);
                    }
                });

                commentsRs.push({
                    _id: res._id,
                    blogId: res.blogId,
                    replys: replys,
                    author: res.author,
                    content: res.content,
                    reactions: res.reactions,
                    createdAt: res.createdAt
                });
            };
        });


        let authorInfor = null;
        allClient.find(client => {
            if(String(blog.authorId) == String(client._id)){
                authorInfor = {
                    _id: client._id,
                    userName: client.userName,
                    image: client.image,
                    role: "Customer",
                }
            }
        });

        if(authorInfor == null || authorInfor == undefined)
            allAdmin.find(admin => {
                if(String(blog.authorId) == String(admin._id)){
                    authorInfor = {
                        _id: admin._id,
                        userName: admin.userName,
                        image: admin.image,
                        role: "Admin",
                    }
                }
            });

        let rs = {
            _id: blog._id,
            title: blog.title,
            content: blog.content,
            image: blog.image,
            reactions: blog.reactions,
            comments: commentsRs,
            createdAt: blog.createdAt,
            author: authorInfor
        }

        return ResponseObj(200, Constants.success, rs);
    },
    
    createBlog: async (blog) => {
        if(Valid.Empty(blog.title)) return ResponseObj(300, "Title is not valid", null)
        if(Valid.Empty(blog.content)) return ResponseObj(300, "Content is not valid", null)

        let author = await ClientsService.getClientById(blog.authorId);
        if(author === null) author = await AdminsService.getAdminById(blog.authorId);
        if(author === null) return ResponseObj(300, "Author not found", null);

        try{
            await BlogsService.createBlog(blog);
            return ResponseObj(200, Constants.success, blog);
        }
        catch(err){
            return ResponseObj(300, Object.keys(err.keyPattern)[0] + " is exist", null);
        }
    },

    updateBlog: async (id,blog) => {
        let preblog = await BlogsService.getBlogById(id);
        if(preblog === null) return ResponseObj(300, "Blog not found", null);
        
        if(Valid.Empty(blog.title) && Valid.Empty(blog.content) && Valid.Empty(blog.image)) return ResponseObj(300, "Nothing is change", null);
        if((!Valid.Empty(blog.title) && preblog.title !== blog.title) || (!Valid.Empty(blog.content) && preblog.content !== blog.content) || (!Valid.Empty(blog.image) && preblog.image !== blog.image)){
            try{
                await BlogsService.updateBlog(id, blog);
                return ResponseObj(200, Constants.success, blog);
            }
            catch(err){
                return ResponseObj(300, "can't update blog", null);
            }
        }
        else{
            return ResponseObj(300, "Nothing is change", null);
        }
    },

    deleteBlog: async (id) => {
        try{
            await BlogsService.deleteBlog(id);
            await CommentsService.deleteCommentByBlogId(id);
            return ResponseObj(200, Constants.success, null);
        }
        catch(err){
            return ResponseObj(300, "blog not found", null);
        }
    },

    updateReaction: async (body) => {
        if(Valid.Empty(body.id)) return ResponseObj(300, "Id is not valid", null);
        if(Valid.Empty(body.userId)) return ResponseObj(300, "UserId is not valid", null);

        let blog = await BlogsService.getBlogById(body.id);
        if(blog === null) return ResponseObj(300, "Blog not found", null);
        if(blog.reactions.includes(body.userId)){
            blog.reactions = blog.reactions.filter(reaction => reaction !== body.userId);
        }
        else{
            blog.reactions.push(body.userId);
        }

        try{
            await BlogsService.updateReactions(body.id, blog.reactions);
            return ResponseObj(200, Constants.success, blog.reactions);
        }
        catch(err){
            return ResponseObj(300, "can't update reaction", null);
        }
    }
}

export default BlogsController;