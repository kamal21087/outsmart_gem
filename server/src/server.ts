import express from 'express';
import path from 'node:path';
import type { Request, Response } from 'express';
import db from './config/connection.js';
import { ApolloServer } from '@apollo/server'; // Note: Import from @apollo/server-express
import { expressMiddleware } from '@apollo/server/express4';
import { typeDefs, resolvers } from './schemas/index.js';
import { authenticateToken } from './utils/auth.js';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Resolve __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startApolloServer = async () => {
  await server.start(); // Start Apollo Server
  await db(); // Connect to the database

  const PORT = process.env.PORT || 3001;
  const app = express();

  // Middleware for parsing requests
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  // Serve static files from the public directory
  app.use(express.static(path.join(__dirname, '..', 'public')));

  // Set up Apollo middleware
  app.use(
    '/graphql',
    expressMiddleware(server as any, {
      context: authenticateToken as any, // Pass authentication middleware
    })
  );

  // Serve React client in production
  if (process.env.NODE_ENV === 'production') {
    // Serve static files from the client's `dist` directory
    app.use(express.static(path.join(__dirname, '../client/dist')));

    // Serve React's index.html for any unknown route
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  } else {
    console.log('Running in development mode.');
  }

  // Start the Express server
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`GraphQL endpoint available at http://localhost:${PORT}/graphql`);
  });
};

startApolloServer();
