import koaRouter from "koa-router";
import { verifyToken } from "./auth/authMiddleware.js";

const router = new koaRouter();

// Token verification route - for checking if token is valid
router.get("/verify-token", verifyToken, (ctx) => {
  // Now you can safely access the decoded user from ctx.state.user
  ctx.body = { user: ctx.state.user }; // Send decoded user information
});

export default router;
