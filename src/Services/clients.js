import clientsModel from '../Models/clients.js';
import { model, Types } from 'mongoose';

const clients = model('clients', clientsModel);

const clientsService = {
    getAllClients: () => {
        try {
            return clients.find();
        }
        catch (err) {
            return null;
        }
    },
    getClientById: async (id) => {
        try {
            return await clients.findById(id);
        }
        catch (err) {
            return null;
        }
    },
    getClientByEmail: (email) => {
        try {
            return clients.findOne({ email: email });
        }
        catch (err) {
            return null;
        }
    },
    verifyEmail: async (id) => {
        try {
            return clients.findByIdAndUpdate(id, { active: true });
        }
        catch (err) {
            return null;
        }
    },
    createClient: (user) => {
        try {
            return clients.create(user);
        }
        catch (err) {
            return null;
        }
    },
    updateClient: (id, user) => {
        try {
            return clients.findByIdAndUpdate(id, user);
        }
        catch (err) {
            return null;
        }
    },
    deleteClient: (id) => {
        try {
            return clients.findByIdAndDelete(id);
        }
        catch (err) {
            return null;
        }
    },
    updateToken: async (id, token) => {
        try {
            return clients.findByIdAndUpdate(id, { token: token });
        }
        catch (err) {
            return null;
        }
    },
    deleteToken: (id) => {
        try {
            return clients.findByIdAndUpdate(id, { token: "" });
        }
        catch (err) {
            return null;
        }
    },

    updateBookmark: async (id, bookmark) => {
        try {
            return clients.findByIdAndUpdate(id, { bookmark: bookmark });
        }
        catch (err) {
            return null;
        }
    }
}

export default clientsService;