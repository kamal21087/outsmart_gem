import './Home.css'; // Custom styles for hover effects.
import { useNavigate } from 'react-router-dom';
import Auth from '../utils/auth'; // Authentication utility
import { useState, useEffect } from 'react';

const Home = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  // Function to handle game click
  const handleGameClick = (gamePath: string) => { 
    if (Auth.loggedIn()) { 
      if (gamePath === '/storyteller' || gamePath === '/identify-ai') { 
        console.log('Showing modal for:', gamePath);
        setShowModal(true); // Show modal for unavailable games 
        } else { 
          navigate(gamePath); 
        } } else { 
          navigate('/login'); 
          } 
      };

  // Debugging log to check modal state 
  useEffect(() => { 
    console.log('Modal state:', showModal); 
  }, [showModal]);

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
              onClick={() => handleGameClick('/guesswho')}
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

      {/* Modal */} 
      {showModal && (
        <div className="modal is-active">
          <div className="modal-background" onClick={() => setShowModal(false)}></div>
          <div className="modal-content">
            <div className="box">
              <p className="modal-text">Game is coming soon!</p>
              <button className="button is-primary" onClick={() => setShowModal(false)}>Close</button>
            </div>
          </div>
          <button className="modal-close is-large" aria-label="close" onClick={() => setShowModal(false)}></button>
        </div>
        )}

    </main>
  );
};

export default Home;
