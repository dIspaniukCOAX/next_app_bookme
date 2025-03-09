import { ApolloServer } from "@apollo/server";
import { resolvers } from "./resolvers";
import { typeDefs } from "./schemas";
import { Context } from "@apollo/client";

export const server = new ApolloServer<Context>({ typeDefs, resolvers });
