import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
mongoose.set('strictQuery', true);

const app = express();
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log("DB error=>", err));
app.get("/user", (req, res) => {
  res.json({
    name: "sadman sakib jisan ssjisan",
  });
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`server running from port ${port}`);
});
