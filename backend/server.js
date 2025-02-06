import Koa from "koa";
import koaBody from "koa-body";
import cors from "@koa/cors";
import { authenticate } from "./auth/authMiddleware.js"; // Import the authenticate middleware
import { connectDB } from "./database/config.js";
import { ApolloServer } from "apollo-server-koa";

import bcrypt from "bcryptjs";

const password = "memo"; // The password you entered during login
const storedHash =
  "$2a$10$aK.Oig8S0f1IH0b1R7Y8s.KeXMjbOf5uxSosQYQkKaCOAa/Fe.5xW"; // The hash from MongoDB

bcrypt.compare(password, storedHash, (err, result) => {
  if (err) {
    console.error("Error comparing passwords:", err);
    return;
  }
  console.log("Password match result:", result);
});

// Import routes from the routes file
import router from "./routes.js";

// Import typeDefs and resolvers
import typeDefs from "./graphql/schema.js";
import resolvers from "./graphql/resolvers.js";

const app = new Koa();

// Enable CORS for frontend requests
app.use(cors({ origin: "http://localhost:5173" }));

// Create ApolloServer instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ ctx }) => {
    const token = ctx.headers.authorization || ctx.cookies.get("token");

    let user = null;
    if (token) {
      try {
        user = jwt.verify(token, JWT_SECRET);
      } catch (err) {
        console.error("Invalid token:", err.message);
      }
    }

    return { user }; // Authentication is optional for GraphQL
  },
});

const startServer = async () => {
  await connectDB();
  await server.start();

  app.use(koaBody());

  router.post("/graphql", server.getMiddleware());

  router.use(authenticate); // Only apply this middleware to the routes that need auth

  // Example of a protected route
  router.get("/protected", (ctx) => {
    ctx.body = { message: "This is a protected route" };
  });

  // Public routes: no authentication required
  router.get("/public", (ctx) => {
    ctx.body = { message: "This is a public route" };
  });

  app.use(router.routes()).use(router.allowedMethods()); // Register routes

  app.listen(4000, () => {
    console.log("🚀 Server running at http://localhost:4000");
  });
};

startServer();
