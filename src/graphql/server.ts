import { ApolloServer } from "@apollo/server";
import { resolvers } from "./resolvers";
import { typeDefs } from "./schemas";

export const server = new ApolloServer({ typeDefs, resolvers });
