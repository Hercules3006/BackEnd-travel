import orderModel from '../Models/orders.js';
import {model} from 'mongoose';

const order = model('order', orderModel);

const orderService = {
    getAllOrders: () => {
        try {
            return order.find();
        }
        catch (err) {
            return null;
        }
    },

    getOrderSchedule: () => {
        const st = new Date().toISOString();
        const en = new Date(new Date().getTime() + 2*24*60*60*1000).toISOString();
        try {
            return order.find({status: 0, startDate: {$gte: st, $lte: en}}).sort({startDate: 1}).populate('idClient', '_id userName email').populate('idDestination', '_id name images');
        }
        catch (err) {
            return null;
        }
    },

    getOrderByClientId: (id) => {
        try {
            return order.find({ idClient: id }).populate('idDestination');
        }
        catch (err) {
            return null;
        }
    },
    
    getOrderById: (id) => {
        try {
            return order.findById(id);
        }
        catch (err) {
            return null;
        }
    },

    getByBookmark: (bookmark) => {
        try {
            return order.find({ _id: { $in: bookmark } });
        }
        catch (err) {
            return null;
        }
    },

    getOrderByLocationCategory(location, category) {
        try {
            if(location === "") location = 0;
            if (category.length === 0) return order.find({ location: location });
            return order.find({ location: location, category: { $in: category } });
        }
        catch (err) {
            return null;
        }
    },
    createOrder: (destination) => {
        try {
            return order.create(destination);
        }
        catch (err) {
            return null;
        }
    },
    updateOrder: (id, destination) => {
        try {
            return order.findByIdAndUpdate(id, destination);
        }
        catch (err) {
            return null;
        }
    },
    deleteOrder: (id) => {
        try {
            return order.findByIdAndDelete(id);
        }
        catch (err) {
            return null;
        }
    },

    cancelOrder: (id) => {
        try {
            return order.findByIdAndUpdate(id, {status: 1});
        }
        catch (err) {
            return null;
        }
    }
}

export default orderService;