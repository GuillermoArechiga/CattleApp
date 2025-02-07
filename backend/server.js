import Koa from "koa";
import koaBody from "koa-body";
import cors from "@koa/cors";
import { connectDB } from "./database/config.js";
import { ApolloServer } from "apollo-server-koa";
import router from "./routes.js"; 
import typeDefs from "./graphql/schema.js"; 
import resolvers from "./graphql/resolvers.js";

const app = new Koa();

// Enable CORS for frontend requests
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// Create ApolloServer instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ ctx }) => {
    // The user will be available in ctx.state if the token is verified
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