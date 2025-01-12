import './Login.css'; // Import styles
import { useState, type FormEvent, type ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const Login = () => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN_USER);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const { data } = await login({
        variables: { email: formState.email, password: formState.password }, // Ensure variables are passed
      });

      Auth.login(data.login.token); // Save the token for authenticated actions
    } catch (e) {
      console.error('Login failed:', e);
    }

    // Reset the form state after submission
    setFormState({
      email: '',
      password: '',
    });
  };

  return (
    <main className="login-container">
      <h1 className="welcome-message">Welcome to OutSmart Gem</h1>
      <form className="login-form" onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label htmlFor="email" className="form-label">EMAIL</label>
          <div className="email-container">
            <input
              id="email"
              className="form-input"
              name="email"
              type="email"
              value={formState.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required // Ensure the email field is validated
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="password" className="form-label">PASSWORD</label>
          <div className="password-container">
            <input
              id="password"
              className="form-input"
              name="password"
              type="password"
              value={formState.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required // Ensure the password field is validated
            />
            <button className="btn-submit" type="submit">→</button>
          </div>
        </div>
      </form>

      <p className="signup-link">
        Don&apos;t have an account?{' '}
        <Link to="/signup" className="link">Sign up here</Link>
      </p>
      {error && (
        <div className="error-message">
          {error.message || 'An error occurred while logging in.'}
        </div>
      )}
    </main>
  );
};

export default Login;
