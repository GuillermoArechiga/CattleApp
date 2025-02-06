import Koa from "koa";
import { ApolloServer } from "apollo-server-koa";
import typeDefs from "./graphql/schema.js";
import resolvers from "./graphql/resolvers.js";

const app = new Koa();
const apolloServer = new ApolloServer({ typeDefs, resolvers });

async function startApollo() {
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });
}

export { app, startApollo };