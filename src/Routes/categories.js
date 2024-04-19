import { Router } from "express";
import categoriesController from "../Controllers/categories.js";

const router = Router();

router.get('/list', async (req, res) => {
    const result = await categoriesController.getAllCategories();
    res.status(result.status).json(result);
});

router.get("/getById", async (req, res) => {
    let id = req.query.id;
    const result = await categoriesController.getCategoryById(id);
    res.status(result.status).json(result);
});

router.post("/create", async (req, res) => {
    const categorie = req.body;
    const result = await categoriesController.createCategory(categorie);
    res.status(result.status).json(result);
});

router.put("/update", async (req, res) => {
    let id = req.query.id;
    const categorie = req.body;
    const result = await categoriesController.updateCategory(id, categorie);
    res.status(result.status).json(result);
});

router.delete("/delete", async (req, res) => {
    let id = req.query.id;
    const result = await categoriesController.deleteCategory(id);
    res.status(result.status).json(result);
});


export default router;