import { useState } from "react";
import GuessWhoRules from "./GuessWhoRules";

interface InGameNavInput {
    remainingQuestions: number
}

function InGameNav({ remainingQuestions }: InGameNavInput) {
    const [rulesDisplay, setRulesDisplay] = useState(false);

    return (
        <div>
            <ul>
                <li onClick={() => 
                    setRulesDisplay(!rulesDisplay)}>HOW TO PLAY</li>
                <li>HINT</li>
                <li>QUESTIONS LEFT: {remainingQuestions}</li>
            </ul>
            <GuessWhoRules ifhidden={rulesDisplay} />
        </div>
    );
}

export default InGameNav;