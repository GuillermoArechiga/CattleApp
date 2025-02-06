import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config.js";

// Middleware to check if the user is authenticated
export const authenticate = (ctx, next) => {
  const token = ctx.headers.authorization || ctx.cookies.get("token");

  if (!token) {
    ctx.status = 401; // Unauthorized
    ctx.body = { error: "Authentication token required" };
    return;
  }

  try {
    // Verify the token
    const user = jwt.verify(token, JWT_SECRET);
    ctx.state.user = user; 
    return next(); 
  } catch (err) {
    ctx.status = 401; // Unauthorized
    ctx.body = { error: "Invalid or expired token" };
  }
};