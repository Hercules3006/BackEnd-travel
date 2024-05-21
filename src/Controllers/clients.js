import clientsService from "../Services/clients.js";
import blogsService from "../Services/blogs.js"
import commentsService from "../Services/comments.js"
import ResponseObj from "../ResponseObj/index.js";
import TokenService from "../Services/token.js";
import Valid from "../Utils/valid.js";
import Constants from "../Utils/constants.js";
import {sendOTP} from "../Services/sendMail.js";

const clientsController = {
    login: async (user) => {
        const client = await clientsService.getClientByEmail(user.email);
        if(client === null) return ResponseObj(300, Constants.client_not_found, null);
        // if(!client.active) return ResponseObj(300, "Account is not active", null);
        if(client.password !== user.password) return ResponseObj(300, Constants.password_incorrect, null);
        const token = TokenService.createToken(client._id);
        const rs = {
            "_id": client._id,
            "userName": client.userName,
            "image": client.image,
            "email": client.email,
            "token": token
        }
        await clientsService.updateToken(client._id, token);
        return ResponseObj(200, Constants.success, rs);
    },

    loginByToken: async (body) => {  
        if(Valid.Empty(body.token)) return ResponseObj(300, "Token is not found", null);
        const id = body.token.split(".")[0];
        const client = await clientsService.getClientById(id);
        if(client === null) return ResponseObj(300, Constants.client_not_found, null);
        if(!client.active) return ResponseObj(300, "Account is not active", null);
        if(client.token !== body.token) return ResponseObj(300, "Token is not correct", null);
        if(!TokenService.checkTokenExpiry(body.token)) return ResponseObj(300, "Token is expired", null);
        const rs = {
            "_id": client._id,
            "userName": client.userName,
            "image": client.image,  
            "email": client.email,
            "token": body.token
        }
        return ResponseObj(200, Constants.success, rs);
    },

    logout: async (body) => {
        if(body.id == null) return ResponseObj(300, Constants.invalid_id, null);
        const client = await clientsService.getClientById(body.id);
        if(client === null) return ResponseObj(300, Constants.client_not_found, null);
        await clientsService.deleteToken(body.id);
        return ResponseObj(200, Constants.success, null);
    },

    getAllClients: async () => {
        return ResponseObj(200, Constants.success, await clientsService.getAllClients());
    },

    getClientById: async (id) => {
        let result = await clientsService.getClientById(id);
        if (result === null) {
            return ResponseObj(404, Constants.client_not_found, null);
        }
        return ResponseObj(200, Constants.success, result);
    },

    getClientByEmail: async (email) => {
        let result = await clientsService.getClientByEmail(email);
        if (result === null) {
            return ResponseObj(404, Constants.client_not_found, null);
        }
        return ResponseObj(200, Constants.success, result);
    },

    register: async (user) => {
        if(Valid.Empty(user.userName)) return ResponseObj(300, Constants.username_not_valid , null)
        if(Valid.Empty(user.email)) return ResponseObj(300, Constants.email_not_valid , null)
        if(Valid.Empty(user.password)) return ResponseObj(300, Constants.password_not_valid, null)

        let client = await clientsService.getClientByEmail(user.email);
        if(client !== null) {
            if(client.active) return ResponseObj(300, Constants.email_exist, null);
            else await clientsService.deleteClient(client._id);
        }
        let OTP = TokenService.createOTP();
        console.log(OTP);
        let newUser = {
            userName: user.userName,
            email: user.email,
            password: user.password,
            token: OTP
        }
        try{
            let user = await clientsService.createClient(newUser);
            let result = {
                _id: user._id,
                userName: user.userName,
                email: user.email,
                image: user.image,
            }
            try{
                sendOTP(user.email, "Verify Email", OTP.split(".")[0]);
                return ResponseObj(200, Constants.success, result);
            }
            catch(err){
                console.log(err);
                return ResponseObj(300, Constants.server_error, null);
            }
        }
        catch(err){
            console.log(err);
            return ResponseObj(300, Constants.server_error , null);
        }
    },

    verifyEmail: async (body) => {
        if(Valid.Empty(body.id)) return ResponseObj(300, Constants.invalid_id, null);
        if(Valid.Empty(body.token)) return ResponseObj(300, "OTP is not found", null);
        let client = await clientsService.getClientById(body.id);
        if(client === null) return ResponseObj(300, Constants.client_not_found, null);
        else if(client.active) return ResponseObj(300, "Account is already active", null);
        if(client.token.split(".")[0] !== body.token) return ResponseObj(300, "OTP is not correct", null);
        if(!TokenService.checkOTPExpiry(client.token)) return ResponseObj(300, "OTP is expired", null);
        try{
            await clientsService.verifyEmail(body.id);
            return ResponseObj(200, Constants.success, null);
        }
        catch(err){
            return ResponseObj(300, Constants.server_error, null);
        }
    },

    recreateOTP: async (body) => {  
        if(Valid.Empty(body.id)) return ResponseObj(300, Constants.invalid_id, null);
        let client = await clientsService.getClientById(body.id);
        if(client === null) return ResponseObj(300, Constants.client_not_found, null);
        else if(client.active) return ResponseObj(300, "Account is already active", null);
        let OTP = TokenService.createOTP();
        try{
            await clientsService.updateToken(body.id, OTP);
            sendOTP(client.email, "Verify Email", OTP)
            return ResponseObj(200, Constants.success, null);
        }
        catch(err){
            return ResponseObj(300, Constants.server_error, null);
        }
    },

    createClient: async (user) => {
        if(Valid.Empty(user.userName)) return ResponseObj(300, Constants.username_not_valid , null)
        if(Valid.Empty(user.email)) return ResponseObj(300, Constants.email_not_valid , null)
        if(Valid.Empty(user.password)) return ResponseObj(300, Constants.password_not_valid, null)
        try{
            await clientsService.createClient(user);
            return ResponseObj(200, Constants.success, user);
        }
        catch(err){
            return ResponseObj(300, Object.keys(err.keyPattern)[0] + " is exist", null);
        }
    },

    updateClient: async (id,user) => {
        let preUser = await clientsService.getClientById(id);
        if(preUser === null) return ResponseObj(300, Constants.client_not_found, null);
        
        if(Valid.Empty(user.userName) || Valid.Empty(user.email) || Valid.Empty(user.password)) return ResponseObj(300, Constants.invalid_data, null);

        let check = await clientsService.getClientByEmail(user.email);
        if(check !== null && String(check._id) !== String(id)) return ResponseObj(300, Constants.email_exist, null);

        if(user.password === preUser.password && user.userName === preUser.userName && user.email === preUser.email && user.image === preUser.image) return ResponseObj(300, "Nothing change", null);

        try{
            await clientsService.updateClient(id, user);
            return ResponseObj(200, Constants.success, user);
        }
        catch(err){  
            return ResponseObj(300, "can't update user", null);
        }
    },

    deleteClient: async (id) => {
        try{
            await clientsService.deleteClient(id);
            await blogsService.deleteBlogByAuthorId(id);
            await commentsService.deleteCommentByAuthorId(id);
            return ResponseObj(200, Constants.success, null);
        }
        catch(err){
            return ResponseObj(300, Constants.client_not_found, null);
        }
    },

    getBookmark: async (id) => {
        let client = await clientsService.getClientById(id);
        if(client === null) return ResponseObj(300, Constants.client_not_found, null);
        console.log(client);
        return ResponseObj(200, Constants.success, client.bookmark);
    },

    updateBookmark: async (body) => {
        if(Valid.Empty(body.id)) return ResponseObj(300, Constants.invalid_id, null);
        if(Valid.Empty(body.idDestination)) return ResponseObj(300, "Bookmark is not found", null);
        let client = await clientsService.getClientById(body.id);
        if(client === null) return ResponseObj(300, Constants.client_not_found, null);
        if(client.bookmark.includes(body.idDestination)){
            client.bookmark = client.bookmark.filter(item => item !== body.idDestination);
        }
        else{
            client.bookmark.push(body.idDestination);
        }
        try{
            await clientsService.updateBookmark(client.id, client.bookmark);
            return ResponseObj(200, Constants.success, null);
        }
        catch(err){
            return ResponseObj(300, "Something went wrong!", null);
        }
    }
}

export default clientsController;
