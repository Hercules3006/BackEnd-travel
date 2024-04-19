import CommentsModel from '../Models/comments.js';
import { model, Types } from 'mongoose';

const Comments = model('Comments', CommentsModel);

const CommentsService = {
    getAllComments: () => {
        try {
            return Comments.find();
        }
        catch (err) {
            return null;
        }
    },

    getCommentById: async (id) => {
        try {
            return await Comments.findById(id);
        }
        catch (err) {
            return null;
        }
    },

    getCommentByAuthorId: async (id) => {
        try {
            return await Comments.find({ authorId: id });
        }
        catch (err) {
            return null;
        }
    },

    getCommentByBlogId: async (id) => {
        try {
            return await Comments.find({ blogId: id });
        }
        catch (err) {
            return null;
        }
    },

    getCommentByReplyId: async (id) => {
        try {
            return await Comments.find({ replyId: id });
        }
        catch (err) {
            return null;
        }
    },

    createComment: (user) => {
        try {
            return Comments.create(user);
        }
        catch (err) {
            return null;
        }
    },
    updateComment: (id, user) => {
        try {
            return Comments.findByIdAndUpdate(id, user);
        }
        catch (err) {
            return null;
        }
    },
    deleteComment: (id) => {
        try {
            return Comments.findByIdAndDelete(id);
        }
        catch (err) {
            return null;
        }
    },
    deleteCommentInList: (listId) => {
        try {
            return Comments.deleteMany({ _id: { $in: listId } });
        }
        catch (err) {
            return null;
        }
    },
    deleteCommentByAuthorId: (id) => {
        try {
            return Comments.deleteMany({ authorId: id });
        }
        catch (err) {
            return null;
        }
    },
    deleteCommentByBlogId: (id) => {
        try {
            return Comments.deleteMany({ blogId: id });
        }
        catch (err) {
            return null;
        }
    },
    deleteCommentByReplyId: (id) => {
        try {
            return Comments.deleteMany({ replyId: id });
        }
        catch (err) {
            return null;
        }
    },
    updateReactions: (id, reactions) => {
        try {
            return Comments.findByIdAndUpdate(id, { reactions: reactions });
        }
        catch (err) {
            return null;
        }
    },
}

export default CommentsService;