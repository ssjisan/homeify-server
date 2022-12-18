import User from "../Models/user.js";
import { hashPassword, comparePassword } from "../Helper/auth.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// Register
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
    // 6. Create signed jwt
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    // 7. send response
    res.json({
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        address: user.address,
      },
      token,
    });
  } catch (err) {
    console.log(err);
  }
};

//  Login
export const login = async (req, res) => {
  try {
    // 1. destructure name,email,password from req.body
    const { email, password } = req.body;
    // 2. all fields require
    if (!email) {
      return res.json({ error: "Email is required" });
    }
    if (!password || password.lenght < 6) {
      return res.json({ error: "Password lenght must be 6 char longs" });
    }
    // 3. Find User using email
    const user = await User.findOne({ email });
    if (!user) {
      res.json({ error: "User not found" });
    }
    // 4. compare password
    const match = await comparePassword(password, user.password);
    if (!match) {
      res.json({ error: "Wrong Password" });
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    // 5. send response
    res.json({
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        address: user.address,
      },
      token,
    });
  } catch (err) {
    console.log(err);
  }
};

export const secret = async (req, res) => {
  res.json({ currentUser: req.user });
};
