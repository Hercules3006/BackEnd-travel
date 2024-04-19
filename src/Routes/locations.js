import { Router } from "express";
import locationController from "../Controllers/locations.js";

const router = Router();

router.get('/list', async (req, res) => {
    const result = await locationController.getAllLocations();
    res.status(result.status).json(result);
});

router.get("/getById", async (req, res) => {
    let id = req.query.id;
    const result = await locationController.getLocationById(id);
    res.status(result.status).json(result);
});

router.post("/create", async (req, res) => {
    const location = req.body;
    const result = await locationController.createLocation(location);
    res.status(result.status).json(result);
});

router.put("/update", async (req, res) => {
    let id = req.query.id;
    const location = req.body;
    const result = await locationController.updateLocation(id, location);
    res.status(result.status).json(result);
});

router.delete("/delete", async (req, res) => {
    let id = req.query.id;
    const result = await locationController.deleteLocation(id);
    res.status(result.status).json(result);
});


export default router;