import bcrypt from "bcryptjs";
import { User } from "../models/user.model.js";
import { generateVerificationCode } from "../config/generateVerificationCode.js";
import { generateTokenAndSetCookie } from "../config/generateTokenAndSetCookie.js";
import { sendVerificationEmail, sendWelcomeEmail } from "../mailtrap/emails.js";

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
    const verificationToken = generateVerificationCode();

    const user = new User({
      email,
      password: hashedPassword,
      name,
      verificationToken,
      verificationTokenExpiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });
    await user.save();

    generateTokenAndSetCookie(res, user._id);

    sendVerificationEmail(user.email, verificationToken);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: { ...user._doc, password: undefined },
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const login = (req, res) => {
  res.send("login");
};

export const verifyEmail = async (req, res) => {
  const { code } = req.body;
  console.log(code);
  try {
    if (!code) {
      throw new Error("Verification code is required");
    }
    const user = await User.findOne({ verificationToken: code });
    if (!user) {
      throw new Error("Invalid verification code");
    }
    if (user.verificationTokenExpiresAt < Date.now()) {
      throw new Error("Verification code expired");
    }
    user.isVerified = true;
    user.verificationToken = null;
    user.verificationTokenExpiresAt = null;
    await user.save();

    sendWelcomeEmail(user.email, user.name);
    res
      .status(200)
      .json({ success: true, message: "Email verified successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};
export const logout = (req, res) => {
  res.send("logout");
};
