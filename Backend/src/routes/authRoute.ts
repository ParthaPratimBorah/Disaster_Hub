import { Router, Request, Response } from "express";
import { z } from "zod";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import User from "../models/users";

const SECRET = process.env.JWT_SECRET || "supersecret";

const SignupSchema = z.object({
  name: z.string().min(1).max(20),
  email: z.string().email(),
  password: z.string().min(6),
});

const SigninSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const router = Router();

router.post("/signup", async (req: Request, res: Response) => {
  const parsed = SignupSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.format() });
  }

  const { name, email, password } = parsed.data;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    return res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
});

// 🔹 Signin
router.post("/signin", async (req: Request, res: Response) => {
  const parsed = SigninSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.format() });
  }

  const { email, password } = parsed.data;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id, email: user.email }, SECRET, { expiresIn: "1h" });

    return res.json({ message: "User signed in successfully", token });
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
});

export default router;
