import React from 'react';
import './InGameNav.css'; // Import your custom CSS

interface GuessWhoRulesInput {
  display: boolean;
  onClose: () => void;
}

const GuessWhoRules: React.FC<GuessWhoRulesInput> = ({ display, onClose }) => {
  if (!display) return null; // If display is false, return null to hide the component

  return (
    <div className="rules-popup box">
      <button className="delete exit-button" onClick={onClose}></button>
      <br></br>
      <h2 className="title is-4">How To Play</h2>
      <ul className="rules-section">
        <li>The objective of the game is to guess the identity of the bot Gem's mystery person, place, or thing within 20 questions.</li>
        <li>Only ask yes-or-no questions to narrow down the possibilities and guess the correct identity.</li>
        <li>Gem will answer truthfully with "Yes" or "No" until you either run out of questions or guess the correct mystery item.</li>
        <li>After each question, Gem will provide a count of how many questions remain.</li>
        <li>The fewer questions needed to identify Gem's mystery item, the higher your score.</li>
      </ul>
      <br></br>
      <h2 className="title is-4">Strategy Tips</h2>
      <ul className="rules-section">
        <li><strong>Start Broad:</strong> Begin with broad questions that can help you narrow down the category (person, place, or thing) and eliminate multiple possibilities at once.</li>
        <li><strong>Think Logically:</strong> Use logical reasoning to ask questions that will quickly narrow down the options.</li>
        <li><strong>Be Specific:</strong> As you get closer to the 20-question limit, ask more specific questions to pinpoint the correct identity.</li>
      </ul>
    </div>
  );
};

export default GuessWhoRules;

  