import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import './StartLanding.css'; // Import custom CSS
import 'bulma/css/bulma.min.css'; // Import Bulma CSS
import GuessWhoRules from '../components/Game/GuessWhoRules';
import AuthService from '../utils/auth'; // Import AuthService for authentication

const GamePage: React.FC = () => {
  const userAuthData = AuthService.getProfile();
  const userName = userAuthData?.data?.username;
  const [isModalActive, setIsModalActive] = useState(false);

  const handleToggleModal = () => {
    setIsModalActive(!isModalActive);
  };
  //Don't believe this is needed bc the user can't get here without being auth but adding just in case
  if (!userName) return <p>Please sign in to start the game!</p>;

  return (
    <div className="game-page">
      <section className="section main-content">
        <div className="container">
          <h2 className="title">Welcome, {userName}</h2>
          <p className="subtitle">Click the button below to start the game.</p>
          <Link to="/guesswho/play" className="button is-primary">Start Game</Link>
          <button className="button is-info" onClick={handleToggleModal}>How to Play</button>
        </div>
      </section>
      <div className={`modal ${isModalActive ? 'is-active' : ''}`}>
        <div className="modal-background" onClick={handleToggleModal}></div>
        <div className="modal-content">
          <div className="box">
            <GuessWhoRules display={isModalActive} onClose={handleToggleModal} />
          </div>
        </div>
        <button className="modal-close is-large" aria-label="close" onClick={handleToggleModal}></button>
      </div>
    </div>
  );
};

export default GamePage;
