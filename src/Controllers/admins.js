import AdminsService from "../Services/admins.js";
import blogsService from "../Services/blogs.js"
import commentsService from "../Services/comments.js"
import ResponseObj from "../ResponseObj/index.js";
import TokenService from "../Services/token.js";
import Valid from "../Utils/valid.js";
import Constants from "../Utils/constants.js";

const AdminsController = {
    login: async (user) => {
        const Admin = await AdminsService.getAdminByEmail(user.email);
        if(Admin === null) return ResponseObj(300, Constants.client_not_found, null);
        if(Admin.password !== user.password) return ResponseObj(300, Constants.password_incorrect, null);
        const token = TokenService.createToken(Admin._id);
        const rs = {
            "_id": Admin._id,
            "userName": Admin.userName,
            "image": Admin.image,
            "email": Admin.email,
            "token": token
        }
        await AdminsService.updateToken(Admin._id, token);
        return ResponseObj(200, Constants.success, rs);
    },

    loginByToken: async (body) => {    
        if(Valid.Empty(body.token)) return ResponseObj(300, "Token is not found", null);
        const id = body.token.split(".")[0];
        const Admin = await AdminsService.getAdminById(id);
        if(Admin === null) return ResponseObj(300, Constants.client_not_found, null);
        if(Admin.token !== body.token) return ResponseObj(300, "Token is not correct", null);
        if(!TokenService.checkTokenExpiry(body.token)) return ResponseObj(300, "Token is expired", null);
        const rs = {
            "_id": Admin._id,
            "userName": Admin.userName,
            "image": Admin.image,
            "email": Admin.email,
            "token": body.token
        }
        return ResponseObj(200, Constants.success, rs);
    },

    logout: async (body) => {
        if(body.id == null) return ResponseObj(300, Constants.invalid_id, null);
        const Admin = await AdminsService.getAdminById(body.id);
        if(Admin === null) return ResponseObj(300, Constants.client_not_found, null);
        await AdminsService.deleteToken(body.id);
        return ResponseObj(200, Constants.success, null);
    },

    getAllAdmins: async () => {
        return ResponseObj(200, Constants.success, await AdminsService.getAllAdmins());
    },

    getAdminById: async (id) => {
        let result = await AdminsService.getAdminById(id);
        if (result === null) {
            return ResponseObj(404, Constants.client_not_found, null);
        }
        return ResponseObj(200, Constants.success, result);
     
    },
    createAdmin: async (user) => {
        if(Valid.Empty(user.userName)) return ResponseObj(300, "Username is not valid", null)
        if(Valid.Empty(user.email)) return ResponseObj(300, "Email is not valid", null)
        if(Valid.Empty(user.password)) return ResponseObj(300, "Password is not valid", null)
        try{
            await AdminsService.createAdmin(user);
            return ResponseObj(200, Constants.success, user);
        }
        catch(err){
            return ResponseObj(300, err, null);
        }
    },

    updateAdmin: async (id,user) => {
        if(String(id) == "65e6eaa0150926318a724220") return ResponseObj(300, "Can't Edit Super Admin", null);
        let preUser = await AdminsService.getAdminById(id);
        if(preUser === null) return ResponseObj(300, Constants.client_not_found, null);
        
        if(Valid.Empty(user.userName) || Valid.Empty(user.email) || Valid.Empty(user.password)) return ResponseObj(300, Constants.invalid_data, null);

        let check = await AdminsService.getAdminByEmail(user.email);
        if(check !== null && String(check._id) !== String(id)) return ResponseObj(300, Constants.email_exist, null);

        if(user.password === preUser.password && user.userName === preUser.userName && user.email === preUser.email && user.image === preUser.image) return ResponseObj(300, "Nothing change", null);

        try{
            await AdminsService.updateAdmin(id, user);
            return ResponseObj(200, Constants.success, user);
        }
        catch(err){
            return ResponseObj(300, "can't update user", null);
        }
    },

    deleteAdmin: async (id) => {
        if(String(id) == "65e6eaa0150926318a724220") return ResponseObj(300, "Can't Delete Super Admin", null);
        try{
            await AdminsService.deleteAdmin(id);
            await blogsService.deleteBlogByAuthorId(id);
            await commentsService.deleteCommentByAuthorId(id);
            return ResponseObj(200, Constants.success, null);
        }
        catch(err){
            return ResponseObj(300, Constants.client_not_found, null);
        }
    }
}

export default AdminsController;