import Koa from "koa";
import koaBody from "koa-body";
import cors from "@koa/cors";
import { connectDB } from "./database/config.js";
import { ApolloServer } from "apollo-server-koa";
import router from "./routes.js"; 
import typeDefs from "./graphql/schema.js"; 
import resolvers from "./graphql/resolvers.js";
import jwt from "jsonwebtoken";

const app = new Koa();
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

// Middleware to parse JWT token
app.use(async (ctx, next) => {
  const token = ctx.headers.authorization?.split(" ")[1]; // Get token from Authorization header

  if (token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET); // Verify and decode the token
      ctx.state.user = { id: decoded.userId, email: decoded.email }; // Attach user to context
    } catch (err) {
      console.error("Token is invalid or expired", err);
      ctx.state.user = null; // If token is invalid, set user to null
    }
  }

  await next(); // Proceed with request
});

// Enable CORS for frontend requests
app.use(cors({ origin: "*" }));

// Create ApolloServer instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ ctx }) => {
    const user = ctx.state.user || null;
    return { user }; // Pass user into the GraphQL context
  },
});

const startServer = async () => {
  await connectDB();
  await server.start();

  app.use(koaBody());

  // Register Koa routes before Apollo to avoid blocking them
  app.use(router.routes()).use(router.allowedMethods());

  // Apply Apollo middleware AFTER Koa routes
  app.use(server.getMiddleware());

  app.listen(4000, () => {
    console.log("🚀 Server running at http://localhost:4000");
  });
};

startServer();
