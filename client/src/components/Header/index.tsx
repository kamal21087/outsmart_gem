import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import Auth from '../../utils/auth';
import '../../App.css'; // Corrected path

const Header = () => {
  const location = useLocation(); // Get the current route
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  const logout = () => {
    Auth.logout();
    setDropdownOpen(false);
  };

  // Return empty header for the login page
  if (location.pathname === '/login') {
    return <header className="header header-empty" />;
  }

  const profile = Auth.getProfile();

  return (
    <header className="header">
      <div className="header-container">
        {Auth.loggedIn() ? (
          profile && profile.data ? (
            <>
              <span className="username-display">
                {profile.data.username}
              </span>
              <div className="dropdown">
                <button
                  className="hamburger"
                  onClick={toggleDropdown}
                  aria-label="Toggle menu"
                  aria-expanded={dropdownOpen}
                >
                  ☰
                </button>
                <ul className={`dropdown-menu ${dropdownOpen ? 'show' : ''}`}>
                  <li>
                    <Link to="/" className="dropdown-item" onClick={() => setDropdownOpen(false)}>
                      HOME
                    </Link>
                  </li>
                  <li>
                    <Link to="/me" className="dropdown-item" onClick={() => setDropdownOpen(false)}>
                      PROFILE
                    </Link>
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={logout}>
                      LOGOUT
                    </button>
                  </li>
                </ul>
              </div>
            </>
          ) : null // Closing bracket for profile && profile.data ternary expression
        ) : (
          <Link to="/login" className="login-button">
            LOGIN
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;