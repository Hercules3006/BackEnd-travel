import { Schema, Types} from 'mongoose';

const categories = new Schema({
    _id: {type: Number},
    name: {type: String},
})

export default categories;