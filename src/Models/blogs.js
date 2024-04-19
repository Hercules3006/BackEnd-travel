import { Schema, Types } from 'mongoose';

const blog = new Schema({
    _id: {type:Types.ObjectId, auto:true},
    authorId: {type:Types.ObjectId},
    title: {type:String},
    content: {type:String},
    image: {type:String},
    reactions: {type:Array, default:[]},
    createdAt: {type:Date,default:Date.now},
})

export default blog;