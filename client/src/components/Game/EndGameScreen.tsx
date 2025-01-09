import GameWinScreen from "./GameWinScreen";
import GameLoseScreen from "./GameLoseScreen";

interface EndGameScreenInput {
    gameResult: boolean
}

function EndGameScreen({ gameResult }:EndGameScreenInput) {
    return (
        <div>
            {
                gameResult ? (<GameWinScreen />) : (<GameLoseScreen />)
            }
        </div>
    );
}

export default EndGameScreen;