import destinationsModel from '../Models/destinations.js';
import { get, model, Types } from 'mongoose';

const destinations = model('destinations', destinationsModel);

const destinationsService = {
    getAllDestinations: () => {
        try {
            return destinations.find();
        }
        catch (err) {
            return null;
        }
    },
    
    getDestinationById: (id) => {
        try {
            return destinations.findById(id);
        }
        catch (err) {
            return null;
        }
    },

    getByBookmark: (bookmark) => {
        try {
            return destinations.find({ _id: { $in: bookmark } });
        }
        catch (err) {
            return null;
        }
    },

    getDestinationByLocationCategory(location, category) {
        try {
            if(location === "") location = 0;
            if (category.length === 0) return destinations.find({ location: location });
            return destinations.find({ location: location, category: { $in: category } });
        }
        catch (err) {
            return null;
        }
    },
    createDestination: (destination) => {
        try {
            return destinations.create(destination);
        }
        catch (err) {
            return null;
        }
    },
    updateDestination: (id, destination) => {
        try {
            return destinations.findByIdAndUpdate(id, destination);
        }
        catch (err) {
            return null;
        }
    },
    deleteDestination: (id) => {
        try {
            return destinations.findByIdAndDelete(id);
        }
        catch (err) {
            return null;
        }
    }
}

export default destinationsService;