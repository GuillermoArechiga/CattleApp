import Koa from "koa";
import koaRouter from "koa-router";
import koaBody from "koa-body";
import cors from "@koa/cors"; 
import { ApolloServer } from "apollo-server-koa";
import jwt from "jsonwebtoken"; // Import jwt
import typeDefs from "./graphql/schema.js";
import resolvers from "./graphql/resolvers.js";
import { connectDB } from "./database/config.js";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret"; // Ensure JWT secret is available

const app = new Koa();
const router = new koaRouter();

// Enable CORS for frontend requests
app.use(cors());

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

    return { user }; // Authentication is optional
  },
});

const startServer = async () => {
  await connectDB();
  await server.start(); // ✅ Start Apollo Server first!

  app.use(koaBody()); // ✅ Middleware after server start
  app.use(router.routes()).use(router.allowedMethods());

  // ✅ Register GraphQL middleware after server start
  router.post("/graphql", server.getMiddleware());

  app.listen(4000, () => {
    console.log("🚀 Server running at http://localhost:4000/graphql");
  });
};

startServer();