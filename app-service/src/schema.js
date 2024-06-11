import { createSchema } from "graphql-yoga";
import { sum } from "@libs/test";

export const schema = createSchema({
  typeDefs: /* GraphQL */ `
    type Query {
      hello: String!
      sum(a: Int!, b: Int!): Int!
    }
  `,
  resolvers: {
    Query: {
      hello: () => "hello from app service!",
      sum: async (_, { a, b }) => {
        return sum(a, b);
      },
    },
  },
});
