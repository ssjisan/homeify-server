import express from "express";
import { register, login } from "../Controllers/auth.js";
import { requireSignin } from "../Middlewares/auth.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);

// Secrect Route
router.get("/secret", requireSignin, (req, res) => {
  res.json({ message: "Secret Route" });
});

export default router;
