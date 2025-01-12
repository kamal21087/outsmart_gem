import { Link } from 'react-router-dom';
import { MouseEvent } from 'react';
import Auth from '../../utils/auth';

const Header = () => {
  const logout = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    Auth.logout();
  };

  // Fetch the user's profile information using Auth.getProfile()
  const profile = Auth.getProfile();

  return (
    <header className="header">
      <div className="container">
        <div className="buttons">
          {Auth.loggedIn() ? (
            // Check if profile and profile.data are not null before accessing username
            profile && profile.data ? (
              <>
                <Link className="button" to="/me">
                  {profile.data.username}'s Profile
                </Link>
                <button className="button" onClick={logout}>
                  Logout
                </button>
              </>
            ) : (
              <p>Loading profile...</p>
            )
          ) : (
            <Link className="button" to="/login">
              Login</Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

