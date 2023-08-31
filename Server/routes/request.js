import express from "express";
import verifyToken from "../middleware/authMiddleware.js";
import { createRequest, deleteRequest, getRequest, updateRequest } from "../controllers/request.js";

const router = express.Router();

router.get("/", verifyToken, getRequest);
router.post("/", verifyToken, createRequest);
router.post("/:id", verifyToken, updateRequest);
router.delete("/:id", verifyToken, deleteRequest);

export default router;
