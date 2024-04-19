import BlogsModel from '../Models/blogs.js';
import {model, Types} from 'mongoose';

const Blogs = model('Blogs', BlogsModel);

const BlogsService = {
    getAllBlogs: () => {
        try{
            return Blogs.find();
        }
        catch(err) {
            return null;
        }
    },
    getBlogById: async (id) => {
        try{
            return await Blogs.findById(id);
        }
        catch(err) {
            return null;
        }
    },
    createBlog: (blog) => {
        try{
            return Blogs.create(blog);
        }
        catch(err) {
            return null;
        }
    },
    updateBlog: (id, blog) => {
        try{
            return Blogs.findByIdAndUpdate(id, blog);
        }
        catch(err) {
            return null;
        }
    },
    deleteBlog: (id) => {
        try{
            return Blogs.findByIdAndDelete(id);
        }
        catch(err) {
            return null;
        }
    },
    deleteBlogByAuthorId: (id) => {
        try{
            return Blogs.deleteMany({authorId: id})
        }
        catch(err) {
            return null;
        }
    },
    updateReactions: (id, reactions) => {
        try{
            return Blogs.findByIdAndUpdate(id, {reactions: reactions});
        }
        catch(err) {
            return null;
        }
    },
}

export default BlogsService;