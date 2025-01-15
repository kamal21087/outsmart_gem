import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './StartLanding.css';
import 'bulma/css/bulma.min.css';
import GuessWhoRules from '../components/Game/GuessWhoRules';
import { useQuery } from '@apollo/client';

import { GET_HIGHSCORES } from '../utils/queries';
import { GET_OVERALLSCORE } from '../utils/queries';

const GamePage: React.FC = () => {
  const [isModalActive, setIsModalActive] = useState(false);
  const {data: highscorers} = useQuery(GET_HIGHSCORES);
  const {data: userOverallScore} = useQuery(GET_OVERALLSCORE);
  console.log(userOverallScore);

  const handleToggleModal = () => {
    setIsModalActive(!isModalActive);
  };

  const player1Name = highscorers?.topScorers[0]?.username || 'None Yet';
  const player1Score = highscorers?.topScorers[0]?.overallScore || 0;
  const player2Name = highscorers?.topScorers[1]?.username || 'None Yet';
  const player2Score = highscorers?.topScorers[1]?.overallScore || 0;
  const player3Name = highscorers?.topScorers[2]?.username || 'None Yet';
  const player3Score = highscorers?.topScorers[2]?.overallScore || 0;

  // Dummy data for high scores
  const highScores = [
    { username: player1Name, score: player1Score },
    { username: player2Name, score: player2Score },
    { username: player3Name, score: player3Score },
  ];

  const myOverallScore = userOverallScore?.me?.overallScore || 0;

  return (
    <div className="game-page-container">
      <h1 className="welcome-message">GUESS WHO</h1>
      

      <div className="content-wrapper">
        {/* Left Block */}
        <div className="game-info">
          {/* User Ranking */}
          <div className="user-ranking-section">
            <div className="user-ranking-star">
              <p className="user-ranking-username">Your Score: <span className='player-score'>{myOverallScore}</span></p>
            </div>
          </div>
          <Link to="/guesswho/play" className="game-button">
            START
          </Link>
          <button className="game-button" onClick={handleToggleModal}>
            HOW TO PLAY
          </button>
        </div>

        {/* Right Block */}
        <div className="high-score-container">
          <div className="title-wrapper">
            <h1 className="title-center">HIGHSCORE</h1>
          </div>
          <div className="high-score-box">
            {highScores.map((player, index) => (
              <div key={index} className="high-score-item">
                <div className="star">
                  <span className='ranking-text'>{index + 1}</span>
                </div>
                {player.username} : <span className='player-score'>{player.score}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      

      {/* How to Play Modal */}
      <div className={`modal ${isModalActive ? 'is-active' : ''}`}>
        <div onClick={handleToggleModal}></div>
        <div className="modal-content">
          <div>
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
