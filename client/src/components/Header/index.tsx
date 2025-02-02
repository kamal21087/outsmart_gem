import { Link } from 'react-router-dom';
import { useState } from 'react';
import Auth from '../../utils/auth';
import '../../App.css'; // Corrected path
import { useNavigate } from 'react-router-dom'; // Corrected path

const Header = () => {
  // const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  const logout = () => {
    Auth.logout();
    setDropdownOpen(false);
  };

  const profile = Auth.getProfile();

  const navigate = useNavigate(); // Corrected path

  return (
    <header className="header">
      <div className="header-container">
        {/* Left: OUTSMART GEM */}
        <div className="header-left">
          <Link to="/" className="header-title-link">
            OUTSMART GEM
          </Link>
        </div>

        {/* Right: Username and Dropdown Menu */}
        <div className="header-right">
          {Auth.loggedIn() ? (
            profile && profile.data ? (
              <>
                <span className="username-display" onClick={() => navigate('./me')}>{profile.data.username}</span>
                <div className="dropdown is-right">
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
                      <Link
                        to="/"
                        className="dropdown-item"
                        onClick={() => setDropdownOpen(false)}
                      >
                        HOME
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/me"
                        className="dropdown-item"
                        onClick={() => setDropdownOpen(false)}
                      >
                        PROFILE
                      </Link>
                    </li>
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={logout}
                      >
                        LOGOUT
                      </button>
                    </li>
                  </ul>
                </div>
              </>
            ) : null
          ) : (
            <Link to="/login" className="login-button">
              LOGIN
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
