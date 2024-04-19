import { Router } from "express";
import orderController from "../Controllers/orders.js";

const router = Router();

router.get('/list', async (req, res) => {
    const result = await orderController.getAllOrders();
    res.status(result.status).json(result);
});

router.get("/getById", async (req, res) => {
    let id = req.query.id;
    const result = await orderController.getOrderById(id);
    res.status(result.status).json(result);
});

router.get("/getByClientId", async (req, res) => {
    let id = req.query.id;
    const result = await orderController.getOrderByClientId(id);
    res.status(result.status).json(result);
});

router.post("/create", async (req, res) => {
    const order = req.body;
    const result = await orderController.createOrder(order);
    res.status(result.status).json(result);
});

router.put("/update", async (req, res) => {
    let id = req.query.id;
    const order = req.body;
    const result = await orderController.updateOrder(id, order);
    res.status(result.status).json(result);
});

router.delete("/delete", async (req, res) => {
    let id = req.query.id;
    const result = await orderController.deleteOrder(id);
    res.status(result.status).json(result);
});

router.post("/cancelOrder", async (req, res) => {
    let body = req.body;
    const result = await orderController.cancelOrder(body);
    res.status(result.status).json(result);
});

export default router;