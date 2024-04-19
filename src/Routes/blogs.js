import { Router } from "express";
import blogsController from "../Controllers/blogs.js";

const router = Router();

router.get('/all', async (req, res) => {
    const result = await blogsController.getAllBlogs();
    res.status(result.status).json(result);
});

router.get('/list', async (req, res) => {
    const result = await blogsController.getListBlogs();
    res.status(result.status).json(result);
});

router.get("/getById", async (req, res) => {
    let id = req.query.id;
    const result = await blogsController.getBlogById(id);
    res.status(result.status).json(result);
});

router.get("/getDetailById", async (req, res) => {
    let id = req.query.id;
    const result = await blogsController.getDetailBlog(id);
    res.status(result.status).json(result);
});

router.post("/create", async (req, res) => {
    let blog = req.body;
    const result = await blogsController.createBlog(blog);
    res.status(result.status).json(result);
});

router.put("/update", async (req, res) => {
    let id = req.query.id;
    let blog = req.body;
    const result = await blogsController.updateBlog(id,blog);
    res.status(result.status).json(result);
});

router.delete("/delete", async (req, res) => {
    let id = req.query.id;
    const result = await blogsController.deleteBlog(id);
    res.status(result.status).json(result);
});

router.post("/updateReaction", async (req, res) => {
    let body = req.body;
    const result = await blogsController.updateReaction(body);
    res.status(result.status).json(result);
});


export default router;