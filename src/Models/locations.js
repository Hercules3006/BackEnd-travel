import { Schema, Types} from 'mongoose';

const locations = new Schema({
    _id: {type: Number},
    name: {type: String},
    image: {type: String},
})

export default locations;