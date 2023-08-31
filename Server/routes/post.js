import express from "express";
import { createPost, getPost, getOnePost } from "../controllers/post.js";
import verifyToken from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", verifyToken, getPost);
router.post("/create", verifyToken, createPost);
router.get("/:id", verifyToken, getOnePost);

export default router;
