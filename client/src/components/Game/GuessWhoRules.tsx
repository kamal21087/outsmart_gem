  interface GuessWhoRulesInput {
    display: boolean;
    onClose: () => void;
  }
  
  function GuessWhoRules({ display, onClose }: GuessWhoRulesInput) {
    if (!display) return null; // If display is false, return null to hide the component
  
    return (
      <div className="rules-popup">
        <h2 className="game-rule-title">HOW TO PLAY</h2>
        <ul>
          <li>Game rules here.</li>
          {/* Add additional game rules here */}
        </ul>
        <div className="exit-button" onClick={onClose}>X</div>
      </div>
    );
  }
  
  export default GuessWhoRules;
  