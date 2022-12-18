import express from "express";
import { register, login, secret } from "../Controllers/auth.js";
import { requireSignin } from "../Middlewares/auth.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);

// Secrect Route
router.get("/secret", requireSignin, secret);

export default router;
