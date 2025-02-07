import koaRouter from "koa-router";
import { verifyToken } from "./auth/authMiddleware.js";

const router = new koaRouter();

// Token verification route - for checking if token is valid
router.get("/verify-token", verifyToken, (ctx) => {
  // Now you can safely access the decoded user from ctx.state.user
  ctx.body = { user: ctx.state.user }; // Send decoded user information
  console.log("Decoded user:", ctx.state.user); // Log the decoded user
});

// Export the router for use in the main server
export default router;
