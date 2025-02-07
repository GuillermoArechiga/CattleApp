import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs"; // Assuming you use bcrypt for hashing passwords
import { JWT_SECRET } from "./config.js";
import User from "../database/models/User.js"; // Assuming you have a User model

// Middleware to verify JWT token
export const verifyToken = async (ctx, next) => {
  // Ensure ctx exists
  if (!ctx) {
    ctx.throw(400, "Request context is missing");
  }

  let token = ctx.headers.authorization || ctx.cookies.get("token");

  // If no token is found
  if (!token) {
    ctx.throw(401, "Authentication token missing");
  }

  // Remove 'Bearer ' prefix if it exists
  if (token.startsWith("Bearer ")) {
    token = token.slice(7).trim();
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    ctx.state.user = decoded; // Attach the decoded user to the context state
    await next();
  } catch (err) {
    console.error("Token verification failed:", err.message);
    ctx.throw(401, "Invalid or expired token");
  }
};

// Login function to authenticate and return JWT
export const login = async (ctx) => {
  const { email, password } = ctx.request.body;

  console.log(email, password)

  if (!email || !password) {
    ctx.throw(400, "Email and password are required");
  }

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      ctx.throw(401, "Invalid email or password");
    }

    // Compare the password with the stored hash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      ctx.throw(401, "Invalid email or password");
    }

    // Create a JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: "1h" } // Token expires in 1 hour
    );

    // Send the token back to the client
    ctx.body = { token };

    console.log("Login successful, token generated");
  } catch (err) {
    console.error("Login error:", err.message);
    ctx.throw(500, "Server error");
  }
};