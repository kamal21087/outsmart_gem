interface GuessWhoRulesInput {
    ifhidden: boolean
}

function GuessWhoRules({ ifhidden }:GuessWhoRulesInput) {
    return (
        <div className={`rules-popup ${ifhidden ? "hidden" : ""}`}>
            <h2 className="game-rule-title">HOW TO PLAY</h2>
            <ul>
                <li>Game rules here.</li>
            </ul>
            <div className="exit-button" 
            onClick={() => ifhidden = true}>X</div>
        </div>
    )
}

export default GuessWhoRules;