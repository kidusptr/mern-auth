import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { generateVerificationCode } from "../config/generateVerificationCode.js";
import { generateTokenAndSetCookie } from "../config/generateTokenAndSetCookie.js";

export const signup = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    if (!email || !password || !name) {
      throw new Error("All fields are required");
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verficationToken = generateVerificationCode();
    const user = await User.create({
      email,
      password: hashedPassword,
      name,
      verficationToken,
      verificationTokenExpiresAt: Date.now() + 3600000,
    });
    await user.save();
    generateTokenAndSetCookie(res, user._id);
    res
      .status(201)
      .json({
        success: true,
        message: "User created successfully",
        user: { ...user._doc, password: "****" },
      });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const login = (req, res) => {
  res.send("login");
};

export const logout = (req, res) => {
  res.send("logout");
};
