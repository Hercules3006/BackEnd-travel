import { Schema, Types} from 'mongoose';

const destination = new Schema({
    _id: {type: Types.ObjectId, auto:true},
    name: {type:String},
    description: {type:String},
    address: {type:String},
    images: {type:Array},
    rate: {type:Number},
    price: {type:Number},
    location: {type:Number},
    category: {type:Number},
})

export default destination;