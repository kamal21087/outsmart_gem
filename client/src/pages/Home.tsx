import './Home.css'; // Custom styles for hover effects.
import { useNavigate } from 'react-router-dom';
import Auth from '../utils/auth'; // Authentication utility

const Home = () => {
  const navigate = useNavigate();

  // Function to handle game click
  const handleGameClick = (gamePath: string) => {
    if (Auth.loggedIn()) {
      navigate(gamePath); // Navigate to the game if logged in
    } else {
      navigate('/login'); // Redirect to login if not logged in
    }
  };

  return (
    <main>
      {/* Main Section */}
      <section className="section">
        <div className="container">
          {/* Welcome Message */}
          <h1 className="welcome-message">Welcome to OutSmart Gem</h1>

          {/* Game Boxes */}
          <div className="game-boxes">
            {/* Game Box 1 */}
            <div
              className="game-box"
              onClick={() => handleGameClick('/guesswho/landing')}

            >
              <p>GUESS WHO</p>
            </div>

            {/* Game Box 2 */}
            <div
              className="game-box"
              onClick={() => handleGameClick('/storyteller')}
            >
              <p>STORYTELLER</p>
            </div>

            {/* Game Box 3 */}
            <div
              className="game-box"
              onClick={() => handleGameClick('/identify-ai')}
            >
              <p>IDENTIFY THE AI</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
