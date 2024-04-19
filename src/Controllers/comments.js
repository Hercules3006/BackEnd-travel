import ClientsService from "../Services/clients.js";
import AdminsService from "../Services/admins.js";
import BlogsService from "../Services/blogs.js";    
import CommentsService from "../Services/comments.js";
import ResponseObj from "../ResponseObj/index.js";
import Valid from "../Utils/valid.js";
import Constants from "../Utils/constants.js";

const CommentsController = {
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

    getAllComments: async () => {
        return ResponseObj(200, Constants.success, await CommentsService.getAllComments());
    },

    getCommentById: async (id) => {
        let result = await CommentsService.getCommentById(id);
        if (result === null) {
            return ResponseObj(404, "Comment not found", null);
        }
        return ResponseObj(200, Constants.success, result);
    },

    createComment: async (Comment) => {
        if(Valid.Empty(Comment.content)) return ResponseObj(300, "Content is not valid", null)

        if(Valid.Empty(Comment.authorId)) return ResponseObj(300, "AuthorId is not valid", null);
        else{
            let client = await ClientsService.getClientById(Comment.authorId);
            if(client === null){
                let admin = await AdminsService.getAdminById(Comment.authorId);
                if(admin === null) return ResponseObj(300, "AuthorId is not valid", null);
            }
        }
        if(Valid.Empty(Comment.blogId)) return ResponseObj(300, "BlogId is not valid", null);
        else{
            let blog = await BlogsService.getBlogById(Comment.blogId);
            if(blog === null) return ResponseObj(300, "BlogId is not valid", null);
        }
        if(!Valid.Empty(Comment.replyId)){
            let reply = await CommentsService.getCommentById(Comment.replyId);
            if(reply === null) return ResponseObj(300, "ReplyId is not valid", null);
        }
        else Comment.replyId = null;

        if(Valid.Empty(Comment.content)) return ResponseObj(300, "Content is not valid", null);

        try{
            await CommentsService.createComment(Comment);
            return ResponseObj(200, Constants.success, Comment);
        }
        catch(err){
            return ResponseObj(300, err, null);
        }
    },

    updateComment: async (id,Comment) => {
        let preComment = await CommentsService.getCommentById(id);
        if(preComment === null) return ResponseObj(300, "Comment not found", null);
        
        if(Valid.Empty(Comment.content)) return ResponseObj(300, "Content is not valid", null);
        else if(preComment.content === Comment.content) return ResponseObj(300, "Nothing is change", null);
    
        try{
            await CommentsService.updateComment(id, Comment);
            return ResponseObj(200, Constants.success, Comment);
        }
        catch(err){
            return ResponseObj(300, "Can't update Comment", null);
        }
    
    },

    deleteComment: async (id) => {
        try{
            await CommentsService.deleteComment(id);
            await CommentsService.deleteCommentByReplyId(id);
            return ResponseObj(200, Constants.success, null);
        }
        catch(err){
            return ResponseObj(300, "Comment not found", null);
        }
    },

    updateReaction: async (body) => {
        if(Valid.Empty(body.id)) return ResponseObj(300, "Id is not valid", null);
        if(Valid.Empty(body.userId)) return ResponseObj(300, "UserId is not valid", null);

        let comment = await CommentsService.getCommentById(body.id);
        if(comment === null) return ResponseObj(300, "comment not found", null);
        if(comment.reactions.includes(body.userId)){
            comment.reactions = comment.reactions.filter(reaction => reaction !== body.userId);
        }
        else{
            comment.reactions.push(body.userId);
        }
        
        try{
            await CommentsService.updateReactions(body.id, comment.reactions);
            return ResponseObj(200, Constants.success, comment.reactions);
        }
        catch(err){
            return ResponseObj(300, "can't update reaction", null);
        }
    }
}

export default CommentsController;