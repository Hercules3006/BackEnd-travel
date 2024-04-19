import { Schema, Types } from 'mongoose';

const comment = new Schema({
    _id: {type:Types.ObjectId, auto:true},
    authorId: {type:Types.ObjectId},
    blogId: {type:Types.ObjectId, default:null},
    replyId: {type:Types.ObjectId, default:null},
    content: {type:String},
    reactions: {type:Array},
    createdAt: {type:Date,default:Date.now},
})

export default comment;