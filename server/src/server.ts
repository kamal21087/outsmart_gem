import express from 'express';
import path from 'node:path';
import type { Request, Response } from 'express';
import db from './config/connection.js';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { typeDefs, resolvers } from './schemas/index.js';
import { authenticateToken } from './utils/auth.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Resolve __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startApolloServer = async () => {
  await server.start();
  await db();

  const PORT = process.env.PORT || 3001;
  const app = express();

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  // Serve static files in production
  if (process.env.NODE_ENV === 'production' || process.env.RENDER) {
    const staticPath = path.join(__dirname, './client');
    console.log('Serving static files from:', staticPath);

    app.use(express.static(staticPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(staticPath, 'index.html'));
    });
  } else {
    console.log('Running in development mode.');
  }

  app.use(
    '/graphql',
    expressMiddleware(server as any, {
      context: authenticateToken as any,
    })
  );

  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`GraphQL endpoint available at http://localhost:${PORT}/graphql`);
  });
};

startApolloServer();
