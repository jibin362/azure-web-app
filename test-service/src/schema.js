import { createSchema } from "graphql-yoga";
import prisma from "@libs/prismaorm";
import { sum } from "@libs/test";

export const schema = createSchema({
  typeDefs: /* GraphQL */ `
    type User {
      id: Int!
      email: String!
      name: String
    }
    type Query {
      hello: String!
      users: [User]
      sum(a: Int!, b: Int!): Int!
    }
    type Mutation {
      createUser(email: String!, name: String): User!
    }
  `,
  resolvers: {
    Query: {
      hello: () => "world!",
      users: async () => {
        return await prisma.user.findMany();
      },
      sum: async (_, { a, b }) => {
        return sum(a, b);
      },
    },
    Mutation: {
      createUser: async (_, { email, name }) => {
        return await prisma.user.create({
          data: {
            email,
            name,
          },
        });
      },
    },
  },
});
