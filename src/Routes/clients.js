import { Router } from "express";
import clientsController from "../Controllers/clients.js";

const router = Router();

router.get('/list', async (req, res) => {
    const result = await clientsController.getAllClients();
    res.status(result.status).json(result);
});

router.get("/getById", async (req, res) => {
    let id = req.query.id;
    const result = await clientsController.getClientById(id);
    res.status(result.status).json(result);
});
router.get("/getByEmail", async (req, res) => {
    let email = req.query.email;
    const result = await clientsController.getClientByEmail(email);
    res.status(result.status).json(result);
});

router.post("/create", async (req, res) => {
    let user = req.body;
    const result = await clientsController.createClient(user);
    res.status(result.status).json(result);
});

router.put("/update", async (req, res) => {
    let id = req.query.id;
    let user = req.body;
    const result = await clientsController.updateClient(id,user);
    res.status(result.status).json(result);
});

router.delete("/delete", async (req, res) => {
    let id = req.query.id;
    const result = await clientsController.deleteClient(id);
    res.status(result.status).json(result);
});

router.post("/login", async (req, res) => {
    let user = req.body;
    const result = await clientsController.login(user);
    res.status(result.status).json(result);
});

router.post("/logout", async (req, res) => {
    let body = req.body;
    const result = await clientsController.logout(body);
    res.status(result.status).json(result); 
});

router.post("/loginByToken", async (req, res) => {
    let body = req.body;
    const result = await clientsController.loginByToken(body);
    res.status(result.status).json(result);
});

router.get("/bookmark", async (req, res) => {
    let id = req.query.id;
    const result = await clientsController.getBookmark(id);
    res.status(result.status).json(result);
});

router.post("/updateBookmark", async (req, res) => {
    let body = req.body;
    const result = await clientsController.updateBookmark(body);
    res.status(result.status).json(result);
});

router.post("/verifyEmail", async (req, res) => {
    let body = req.body;
    const result = await clientsController.verifyEmail(body);
    res.status(result.status).json(result);
});

router.post("/recreateOTP", async (req, res) => {
    let body = req.body;
    const result = await clientsController.recreateOTP(body);
    res.status(result.status).json(result);
});

router.post("/register", async (req, res) => { 
    let user = req.body;
    await clientsController.register(user).then(result => {
        res.status(result.status).json(result);
    });
});

export default router;