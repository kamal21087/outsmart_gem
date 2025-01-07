import { Link } from 'react-router-dom';
import { type MouseEvent } from 'react';
import Auth from '../../utils/auth';

const Header = () => {
  const logout = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <header className="header">
      <div className="container">
        <div className="buttons">
          {Auth.loggedIn() ? (
            <>
              <Link className="button" to="/me">
                {Auth.getProfile().data.username}'s Profile
              </Link>
              <button className="button" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <Link className="button" to="/login">
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
