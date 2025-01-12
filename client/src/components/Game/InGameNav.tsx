import { useState } from "react";
import GuessWhoRules from "./GuessWhoRules";

interface InGameNavInput {
  remainingQuestions: number;
}

function InGameNav({ remainingQuestions }: InGameNavInput) {
  const [rulesDisplay, setRulesDisplay] = useState(false);

  const handleToggleRules = () => {
    setRulesDisplay(!rulesDisplay);
  };

  return (
    <div>
      <ul>
        <li onClick={handleToggleRules}>HOW TO PLAY</li>
        <li>HINT</li>
        <li>QUESTIONS LEFT: {remainingQuestions}</li>
      </ul>
      <GuessWhoRules display={rulesDisplay} onClose={handleToggleRules} /> 
    </div>
  );
}

export default InGameNav;

