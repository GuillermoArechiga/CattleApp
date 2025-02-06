import koaRouter from "koa-router";
import jwt from "jsonwebtoken"; // Import jwt
import { JWT_SECRET } from "./auth/config.js"; // Ensure JWT secret is available

const router = new koaRouter();

// Token verification route - for checking if token is valid
router.get("/verify-token", async (ctx) => {
  const token = ctx.headers.authorization || ctx.cookies.get("token");

  if (!token) {
    ctx.throw(401, "Authentication token missing");
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    ctx.body = { user: decoded }; // Send back user info if valid
  } catch (err) {
    ctx.throw(401, "Invalid or expired token");
  }
});

// Public routes: Registration and Login (No Authentication Required)
router.post("/register", async (ctx) => {
  const { email, password } = ctx.request.body;
  // Handle user creation (hash password, etc.)
  ctx.body = { message: "User registered successfully" };
});

router.post("/login", async (ctx) => {
  const { email, password } = ctx.request.body;
  // Handle user login and token generation
  const token = jwt.sign({ user: email }, JWT_SECRET, { expiresIn: "1h" });
  ctx.body = { token }; // Send token back
});

// Export the router for use in the main server
export default router;