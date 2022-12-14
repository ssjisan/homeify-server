import express  from "express";

const router = express.Router();

router.get("/user", (req, res) => {
  res.json({
    name: "sadman sakib jisan ssjisan",
  });
});

export default router;
