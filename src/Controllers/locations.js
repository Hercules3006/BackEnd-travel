import locationService from '../Services/locations.js';
import ResponseObj from '../ResponseObj/index.js';
import Valid from "../Utils/valid.js";
import Constants from '../Utils/constants.js';

const locationController = {
    getAllLocations: async () => {
        return ResponseObj(200, Constants.success, await locationService.getAllLocations());
    },

    getLocationById: async (id) => {
        let rs = await locationService.getLocationById(id);
        if(rs === null || rs.length === 0) {
            return ResponseObj(404, "Location not found", rs);
        }
        return ResponseObj(200, Constants.success, rs);
    },

    createLocation: async (location) => {
        if(Valid.Empty(location._id) || Valid.Empty(location.name) || Valid.Empty(location.image)) {
            return ResponseObj(400, Constants.invalid_data, null);
        }
        let preLocation = await locationService.getLocationById(location._id);
        if (preLocation !== null && preLocation.length > 0) {
            return ResponseObj(400, "Location already exists", preLocation);
        }
        try{
            await locationService.createLocation(location);
            return ResponseObj(200, Constants.success, location);
        }
        catch(err) {
            return ResponseObj(500, "Server error", null);
        }
    },

    updateLocation: async (id, location) => {
        if(Valid.Empty(location.name) || Valid.Empty(location.image)) {
            return ResponseObj(400, Constants.invalid_data, null);
        }
        let preLocation = await locationService.getLocationById(id);
        if (preLocation === null) {
            return ResponseObj(404, "Location not found", preLocation);
        }
        return ResponseObj(200, Constants.success, await locationService.updateLocation(id, location));
    },

    deleteLocation: async (id) => {
        return ResponseObj(200, Constants.success, await locationService.deleteLocation(id));
    }
}

export default locationController;