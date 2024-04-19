import locationsModel from '../Models/locations.js';
import { model, Types } from 'mongoose';

const locations = model('locations', locationsModel);

const locationsService = {
    getAllLocations: () => {
        try {
            return locations.find();
        }
        catch (err) {
            return null;
        }
    },

    getLocationById: (id) => {
        try {
            return locations.findById(id);
        }
        catch (err) {
            return null;
        }
    },
    createLocation: (location) => {
        try {
            return locations.create(location);
        }
        catch (err) {
            return null;
        }
    },
    updateLocation: (id, location) => {
        try {
            return locations.findByIdAndUpdate(id, location);
        }
        catch (err) {
            return null;
        }
    },
    deleteLocation: (id) => {
        try {
            return locations.findByIdAndDelete(id);
        }
        catch (err) {
            return null;
        }
    }
}

export default locationsService;