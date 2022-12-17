import User from "../Models/user.js";
export const register = async (req, res) => {
  try {
    // 1. destructure name,email,password from req.body 
    const user = await new User(req.body).save();
    res.json(user);
  } catch (err) {
    console.log(err);
  }
};
