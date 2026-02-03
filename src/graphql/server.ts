import { ApolloServer } from '@apollo/server';
import { schemas } from './schema';
import { resolvers } from './resolvers';

export const server = new ApolloServer({
  introspection: true,
  typeDefs: schemas,
  resolvers
});
