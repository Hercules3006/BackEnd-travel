import destinationService from '../Services/destinations.js';
import clientService from '../Services/clients.js';
import ResponseObj from '../ResponseObj/index.js';
import Valid from "../Utils/valid.js";
import Constants from '../Utils/constants.js';

const destinationController = {
    getAllDestinations: async () => {
        return ResponseObj(200, Constants.success, await destinationService.getAllDestinations());
    },

    getByBookmark: async (id) => {
        let client = await clientService.getClientById(id);
        if(client === null) {
            return ResponseObj(404, Constants.client_not_found, null);
        }
        let listDestination = await destinationService.getByBookmark(client.bookmark);
        return ResponseObj(200, Constants.success, listDestination);
    },

    getDestinationByLocationCategory: async (location, category) => {
        try{
            let listCategory = Valid.Empty(category)?[]:category.split("");
            let rs = await destinationService.getDestinationByLocationCategory(location, listCategory);
            if(rs === null || rs.length === 0) {
                return ResponseObj(404, "Destination not found", rs);
            }
            return ResponseObj(200, Constants.success, rs);
        }
        catch(err) {
            return ResponseObj(500, "Server error", null);
        }
    },

    getDestinationById: async (id) => {
        if(Valid.Empty(id)) return ResponseObj(400, "Invalid id", null);
        let rs = await destinationService.getDestinationById(id);
        if(rs === null || rs.length === 0) {
            return ResponseObj(404, "Destination not found", rs);
        }
        return ResponseObj(200, Constants.success, rs);
    },

    createDestination: async (destination) => {
        if(Valid.Empty(destination.location) || Valid.Empty(destination.category) || Valid.Empty(destination.name) || Valid.Empty(destination.address) || Valid.Empty(destination.description) || Valid.Empty(destination.images) || Valid.Empty(destination.rate) || Valid.Empty(destination.price)) {
            return ResponseObj(400, Constants.invalid_data, null);
        }
        try{
            await destinationService.createDestination(destination);
            return ResponseObj(200, Constants.success, destination);
        }
        catch(err) {
            console.log(err);
            return ResponseObj(500, "Server error", null);
        }
    },

    updateDestination: async (id, destination) => {
        if(Valid.Empty(destination.location) || Valid.Empty(destination.category) || Valid.Empty(destination.name) || Valid.Empty(destination.address) || Valid.Empty(destination.description) || Valid.Empty(destination.images) || Valid.Empty(destination.rate) || Valid.Empty(destination.price)) {
            return ResponseObj(400, Constants.invalid_data, null);
        }
        let preDestination = await destinationService.getDestinationById(id);
        if (preDestination === null) {
            return ResponseObj(404, "Destination not found", preDestination);
        }
        return ResponseObj(200, Constants.success, await destinationService.updateDestination(id, destination));
    },

    deleteDestination: async (id) => {
        return ResponseObj(200, Constants.success, await destinationService.deleteDestination(id));
    }
}

export default destinationController;