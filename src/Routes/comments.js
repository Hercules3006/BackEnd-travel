import { Router } from "express";
import commentsController from "../Controllers/comments.js";

const router = Router();

router.get('/list', async (req, res) => {
    const result = await commentsController.getAllComments();
    res.status(result.status).json(result);
});

router.get("/getById", async (req, res) => {
    let id = req.query.id;
    const result = await commentsController.getCommentById(id);
    res.status(result.status).json(result);
});

router.post("/create", async (req, res) => {
    let user = req.body;
    const result = await commentsController.createComment(user);
    res.status(result.status).json(result);
});

router.put("/update", async (req, res) => {
    let id = req.query.id;
    let user = req.body;
    const result = await commentsController.updateComment(id,user);
    res.status(result.status).json(result);
});

router.delete("/delete", async (req, res) => {
    let id = req.query.id;
    const result = await commentsController.deleteComment(id);
    res.status(result.status).json(result);
});

router.post("/updateReaction", async (req, res) => {
    let body = req.body;
    const result = await commentsController.updateReaction(body);
    res.status(result.status).json(result);
});

export default router;