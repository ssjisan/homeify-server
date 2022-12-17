import User from "../Models/user.js";
import { hashPassword, comparePassword } from "../Helper/auth.js";
export const register = async (req, res) => {
  try {
    // 1. destructure name,email,password from req.body
    const { name, email, password } = req.body;
    // 2. all fields require
    if (!name.trim()) {
      return res.json({ error: "Name is required" });
    }
    if (!email) {
      return res.json({ error: "Email is required" });
    }
    if (!password || password.lenght < 6) {
      return res.json({ error: "Password lenght must be 6 char longs" });
    }
    // 3. email unique
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.json({ error: "Email is taken" });
    }
    // 4. has password
    const hashedPassword = await hashPassword(password);
    // 5. register user
    const user = await new User({
      name,
      email,
      password: hashedPassword,
    }).save();
    // 6. send response
    res.json(user);
  } catch (err) {
    console.log(err);
  }
};
