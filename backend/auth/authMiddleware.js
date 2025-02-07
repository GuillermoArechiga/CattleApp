// authMiddleware.js
import jwt from "jsonwebtoken"; // Import JWT
import { JWT_SECRET } from "./config.js"; // Import your JWT secret

// Middleware to verify JWT token
export const verifyToken = async (ctx, next) => {
  let token = ctx.headers.authorization || ctx.cookies.get("token");

  if (!token) {
    ctx.throw(401, "Authentication token missing");
  }

  // Remove 'Bearer ' prefix if it exists
  if (token.startsWith("Bearer ")) {
    token = token.slice(7).trim();
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET); // Verify token
    ctx.state.user = decoded; // Attach decoded user to context state
    await next(); // Call the next middleware or route handler
  } catch (err) {
    console.error("Token verification failed:", err.message); // Log the error
    ctx.throw(401, "Invalid or expired token");
  }
};