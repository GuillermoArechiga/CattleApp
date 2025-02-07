import Koa from "koa";
import koaBody from "koa-body";
import cors from "@koa/cors";
import { connectDB } from "./database/config.js";
import { ApolloServer } from "apollo-server-koa";
import router from "./routes.js"; 
import typeDefs from "./graphql/schema.js"; 
import { verifyToken } from "./auth/authMiddleware.js"; 
import resolvers from "./graphql/resolvers.js";

const app = new Koa();

// Enable CORS for frontend requests
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// Create ApolloServer instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ ctx }) => {
    const token = ctx.request.headers.authorization || ctx.cookies.get("token");

    // Use the reusable verifyTokenForGraphQL function to decode the token
    const user = verifyToken(token);

    return { user }; // Pass user (or null) into the GraphQL context
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