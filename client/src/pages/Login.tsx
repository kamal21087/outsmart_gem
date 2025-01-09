import './Login.css'; // Custom styles for the Login page
import { useState, type FormEvent, type ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const Login = () => {
  const [formState, setFormState] = useState({ username: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);

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
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    setFormState({
      username: '',
      password: '',
    });
  };

  return (
    <main className="login-container">
      <h1 className="welcome-message">Welcome to OutSmart Gem</h1>
      <form className="login-form" onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label htmlFor="username" className="form-label">USERNAME</label>
          <div className="username-container">
            <input
              id="username"
              className="form-input"
              name="username"
              type="text"
              value={formState.username}
              onChange={handleChange}
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
            />
            <button className="btn-submit" type="submit">→</button>
          </div>
        </div>
      </form>

      <p className="signup-link">
        Don't have an account?{' '}
        <Link to="/signup" className="link">Sign up here</Link>
      </p>
      {error && <div className="error-message">{error.message}</div>}
    </main>
  );
};

export default Login;
