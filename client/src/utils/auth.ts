import { type JwtPayload, jwtDecode } from 'jwt-decode';

// Extending the JwtPayload interface to include additional data fields specific to the application.
interface ExtendedJwt extends JwtPayload {
  data: {
    username: string;
    email: string;
    id: string;
  };
}

class AuthService {
  // This method decodes the JWT token to get the user's profile information.
  getProfile() {
    const token = this.getToken();
    if (token) {
      try {
        const decoded = jwtDecode<ExtendedJwt>(token);
        console.log('Decoded Token:', decoded); // Debug log entire token
        return decoded;
      } catch (error) {
        console.error('Error decoding token:', error);
        return null;
      }
    }
    console.warn('No token found in localStorage.');
    return null;
  }

  // This method checks if the user is logged in by verifying the presence and validity of the token.
  loggedIn() {
    const token = this.getToken();
    // Returns true if the token exists and is not expired.
    return !!token && !this.isTokenExpired(token);
  }

  // This method checks if the provided token is expired.
  isTokenExpired(token: string) {
    try {
      // jwtDecode decodes the token to check its expiration date.
      const decoded = jwtDecode<JwtPayload>(token);

      // Returns true if the token has expired, false otherwise.
      return decoded?.exp ? decoded.exp < Date.now() / 1000 : false;
    } catch (err) {
      // If decoding fails, assume the token is not expired.
      return false;
    }
  }

  // This method retrieves the token from localStorage.
  getToken(): string | null {
    return localStorage.getItem('id_token');
  }

  // This method logs in the user by storing the token in localStorage and redirecting to the home page.
  login(idToken: string) {
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }

  // This method logs out the user by removing the token from localStorage and redirecting to the home page.
  logout() {
    localStorage.removeItem('id_token');
    window.location.assign('/');
  }
}

export default new AuthService();
