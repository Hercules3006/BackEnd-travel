import { Router } from "express";
import destinationController from "../Controllers/destinations.js";

const router = Router();

router.get('/list', async (req, res) => {
    const result = await destinationController.getAllDestinations();
    res.status(result.status).json(result);
});

router.get("/getById", async (req, res) => {
    let id = req.query.id;
    const result = await destinationController.getDestinationById(id);
    res.status(result.status).json(result);
});

router.get("/getByBookmark", async (req, res) => {
    let id = req.query.id;
    const result = await destinationController.getByBookmark(id);
    res.status(result.status).json(result);
}); 

router.get("/getByLocationCategory", async (req, res) => {
    let location = req.query.location;
    let category = req.query.category;
    const result = await destinationController.getDestinationByLocationCategory(location, category);
    res.status(result.status).json(result);
});

router.post("/create", async (req, res) => {
    const destination = req.body;
    const result = await destinationController.createDestination(destination);
    res.status(result.status).json(result);
});

router.put("/update", async (req, res) => {
    let id = req.query.id;
    const destination = req.body;
    const result = await destinationController.updateDestination(id, destination);
    res.status(result.status).json(result);
});

router.delete("/delete", async (req, res) => {
    let id = req.query.id;
    const result = await destinationController.deleteDestination(id);
    res.status(result.status).json(result);
});


export default router;