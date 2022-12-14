import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRouter from "./Routes/auth.js";

dotenv.config();
mongoose.set("strictQuery", true);

const app = express();
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log("DB error=>", err));

app.use("/api", authRouter);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`server running from port ${port}`);
});
