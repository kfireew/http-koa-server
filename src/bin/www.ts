import { app } from '../app';
import { connectDB } from '../db';
import { conf } from '../utils/config';
import schema from '../schema';
import resolvers from '../resolvers';
import { ApolloServer } from '@apollo/server';

const server = new ApolloServer({
  introspection: true,
  typeDefs: schema,
  resolvers,
  formatError: (error) => {
    const message = error.message
      .replace('SequelizeValidationError: ', '')
      .replace('Validation error: ', '');

    return {
      ...error,
      message
    };
  }
});

(async () => {
  await connectDB();
  await server.start();
  const port = parseInt(conf.get('port'));
  app.listen(port, () => console.log(`🚀 Server listening on port ${port}`));
})();
