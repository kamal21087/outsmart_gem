import { useState } from "react";
import "./InGameNav.css";
// import GuessWhoRules from "./GuessWhoRules";

interface InGameNavInput {
    remainingQuestions: number
}

function InGameNav({ remainingQuestions }: InGameNavInput) {
    const [rulesDisplay, setRulesDisplay] = useState(false);

    return (
        <div className="ingame-nav-container">
            <ul className="ingame-nav">
                <li className="ingame-nav-element hoverable" onClick={() => 
                    setRulesDisplay(!rulesDisplay)}>HOW TO PLAY</li>
                <li className="ingame-nav-element hoverable">HINT</li>
                <li className="ingame-nav-element">QUESTIONS LEFT: {remainingQuestions}</li>
            </ul>
            {/* <GuessWhoRules ifhidden={rulesDisplay} /> */}
        </div>
    );
}

export default InGameNav;