import AdminsModel from '../Models/admins.js';
import {model, Types} from 'mongoose';

const Admins = model('Admins', AdminsModel);

const adminsService = {
    getAllAdmins: () => {
        try{
            return Admins.find();
        }
        catch(err) {
            return null;
        }
    },
    getAdminById: async (id) => {
        try{
            return await Admins.findById(id);
        }
        catch(err) {
            return null;
        }
    },
    getAdminByEmail: (email) => {
        try{
            return Admins.findOne({email: email});
        }
        catch(err) {
            return null;
        }
    },
    createAdmin: (user) => {
        try{
            return Admins.create(user);
        }
        catch(err) {
            return null;
        }
    },
    updateAdmin: (id, user) => {
        try{
            return Admins.findByIdAndUpdate(id, user);
        }
        catch(err) {
            return null;
        }
    },
    deleteAdmin: (id) => {
        try{ 
            return Admins.findByIdAndDelete(id);
        }
        catch(err) {
            return null;
        }
    },
    updateToken: async (id, token) => {
        try{
            return await Admins.findByIdAndUpdate(id, {token: token});
        }
        catch(err) {
            return null;
        }
    },
    deleteToken: (id) => {
        try{
            return Admins.findByIdAndUpdate(id, {token: ""});
        }
        catch(err) {
            return null;
        }
    }
}

export default adminsService;