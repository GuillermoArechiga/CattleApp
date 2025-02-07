import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config.js";

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
