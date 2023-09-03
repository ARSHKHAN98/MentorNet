import express from "express";
import { getUser, updateUser, allUser } from "../controllers/user.js";
import verifyToken from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/find/:userId", verifyToken, getUser);
router.put("/", verifyToken, updateUser);
router.get("/", verifyToken, allUser);

export default router;
