import { useState, type FormEvent, type ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

import Auth from '../utils/auth';
import './Signup.css'; // Import styles for the signup page

const Signup = () => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [addUser, { error }] = useMutation(ADD_USER);
  const navigate = useNavigate(); // Initialize useNavigate

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
      const { data } = await addUser({
        variables: { input: { ...formState } },
      });

      Auth.login(data.addUser.token);
      navigate('/'); // Redirect to the homepage
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main className="signup-container">
      <h1 className="welcome-message">Welcome to OutSmart Gem</h1>
      <form className="signup-form" onSubmit={handleFormSubmit}>
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
            />
          </div>
        </div>

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
      {error && <div className="error-message">{error.message}</div>}

      <p className="signup-link">
        Already have an account?{' '}
        <a href="/login" className="link">Log in here</a>
      </p>
    </main>
  );
};

export default Signup;
