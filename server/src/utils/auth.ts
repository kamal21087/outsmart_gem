import jwt from 'jsonwebtoken';
import { GraphQLError } from 'graphql';
import dotenv from 'dotenv';
dotenv.config();

export const authenticateToken = ({ req }: { req: any }) => {
  const secretKey: any = process.env.JWT_SECRET_KEY; // Get the secret key from environment variables
  let token: string | undefined =
    req.body.token || req.query.token || req.headers.authorization;

  // If token is in the Authorization header, extract it
  if (req.headers.authorization) {
    const authHeader = req.headers.authorization;
    token = authHeader.split(' ').pop()?.trim();
  }

  // If no token is provided, return the request object as is
  if (!token) {
    console.warn('No token provided in the request.');
    return req;
  }

  // Try to verify the token
  try {
    const { data }: any = jwt.verify(token, secretKey, { maxAge: '2h' });
    // If the token is valid, attach the user data to the request object
    req.user = data;
  } catch (err) {
    // Explicitly typecast `err` to an Error to access the `message` property
    console.error('Invalid token:', (err as Error).message);
  }

  // Return the request object
  return req;
};

export const signToken = (username: string, email: string, _id: unknown) => {
  // Create a payload with the user information
  const payload = { username, email, _id };
  const secretKey: any = process.env.JWT_SECRET_KEY; // Get the secret key from environment variables
  // Debug: Log the payload and secretKey for verification
  console.debug('Signing token with payload:', payload);
  console.debug('Using secret key:', secretKey);

  // Sign the token with the payload and secret key, and set it to expire in 2 hours
  return jwt.sign({ data: payload }, secretKey, { expiresIn: '2h' });
};

export class AuthenticationError extends GraphQLError {
  constructor(message: string) {
    super(message, undefined, undefined, undefined, ['UNAUTHENTICATED']);
    Object.defineProperty(this, 'name', { value: 'AuthenticationError' });
  }
};
