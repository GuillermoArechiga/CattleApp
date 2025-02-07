import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config.js";

// Middleware to check if the user is authenticated
export const authenticate = async (ctx, next) => {
  let token = ctx.headers.authorization || ctx.cookies.get("token");

  if (!token) {
    ctx.status = 401; // Unauthorized
    ctx.body = { error: "Authentication token required" };
    return;
  }

  // If the token is in the Authorization header, remove "Bearer "
  if (token.startsWith("Bearer ")) {
    token = token.slice(7).trim();
  }

  try {
    // Verify the token
    const user = jwt.verify(token, JWT_SECRET);
    ctx.state.user = user; // Attach user data to ctx.state

    await next(); // Continue processing the request
  } catch (err) {
    ctx.status = 401; // Unauthorized
    ctx.body = { error: "Invalid or expired token" };
  }
};
