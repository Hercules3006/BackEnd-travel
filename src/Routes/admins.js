import { Router } from "express";
import adminsController from "../Controllers/admins.js";

const router = Router();

router.get('/list', async (req, res) => {
    const result = await adminsController.getAllAdmins();
    res.status(result.status).json(result);
});

router.get("/getById", async (req, res) => {
    let id = req.query.id;
    const result = await adminsController.getAdminById(id);
    res.status(result.status).json(result);
});

router.post("/create", async (req, res) => {
    let Admin = req.body;
    const result = await adminsController.createAdmin(Admin);
    res.status(result.status).json(result);
});

router.put("/update", async (req, res) => {
    let id = req.query.id;
    let Admin = req.body;
    const result = await adminsController.updateAdmin(id,Admin);
    res.status(result.status).json(result);
});

router.delete("/delete", async (req, res) => {
    let id = req.query.id;
    const result = await adminsController.deleteAdmin(id);
    res.status(result.status).json(result);
});

router.post("/login", async (req, res) => {
    let user = req.body;
    const result = await adminsController.login(user);
    res.status(result.status).json(result);
});

router.post("/logout", async (req, res) => {
    let body = req.body;
    const result = await adminsController.logout(body);
    res.status(result.status).json(result); 
});

router.post("/loginByToken", async (req, res) => {
    let body = req.body;
    const result = await adminsController.loginByToken(body);
    res.status(result.status).json(result);
});

export default router;