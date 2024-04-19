import { Schema, Types } from 'mongoose';

const orders = new Schema({
    _id: {type:Types.ObjectId, auto:true},
    idDestination: {type:Types.ObjectId, ref:"destinations"},
    idClient: {type:Types.ObjectId, ref:"clients"},
    startDate: {type:Date},
    endDate: {type:Date},
    quantity: {type:Number},
    note: {type:String},
    createdAt: {type:Date,default:Date.now},
    status: {type:Number, default:0}
})

export default orders;