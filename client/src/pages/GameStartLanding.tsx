import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './StartLanding.css';
import 'bulma/css/bulma.min.css';
import GuessWhoRules from '../components/Game/GuessWhoRules';
import AuthService from '../utils/auth';

const GamePage: React.FC = () => {
  const userAuthData = AuthService.getProfile();
  const userName = userAuthData?.data?.username;
  const [isModalActive, setIsModalActive] = useState(false);

  const handleToggleModal = () => {
    setIsModalActive(!isModalActive);
  };

  // Dummy data for high scores
  const highScores = [
    { username: 'Player1', score: 150 },
    { username: 'Player2', score: 130 },
    { username: 'Player3', score: 110 },
  ];
  const userRank = 4;

  return (
    <div className="game-page-container">
      <div className="title-wrapper">
        <h1 className="title-left">GUESS WHO</h1>
        <h1 className="title-center">HIGHSCORE</h1>
      </div>

      <div className="content-wrapper">
        {/* Left Block */}
        <div className="game-info">
          <Link to="/guesswho/play" className="game-button">
            START
          </Link>
          <button className="game-button" onClick={handleToggleModal}>
            HOW TO PLAY
          </button>
        </div>

        {/* Right Block */}
        <div className="high-score-container">
          <div className="high-score-box">
            {highScores.map((player, index) => (
              <div key={index} className="high-score-item">
                <div className="star">
                  <span>{index + 1}</span>
                </div>
                {player.username} - {player.score}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* User Ranking */}
      <div className="user-ranking-section">
        <div className="user-ranking-star">
          <div className="star">
            <span>{userRank}</span>
          </div>
          <p className="user-ranking-username">{userName}</p>
        </div>
      </div>

      {/* How to Play Modal */}
      <div className={`modal ${isModalActive ? 'is-active' : ''}`}>
        <div className="modal-background" onClick={handleToggleModal}></div>
        <div className="modal-content">
          <div className="box">
            <GuessWhoRules display={isModalActive} onClose={handleToggleModal} />
          </div>
        </div>
        <button
          className="modal-close is-large"
          aria-label="close"
          onClick={handleToggleModal}
        ></button>
      </div>
    </div>
  );
};

export default GamePage;
