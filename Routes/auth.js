import express from "express";
import {user} from "../Controllers/auth.js";
const router = express.Router();

router.get("/user", user);

export default router;
