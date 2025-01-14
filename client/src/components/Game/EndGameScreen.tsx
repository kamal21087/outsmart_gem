import GameWinScreen from "./GameWinScreen";
import GameLoseScreen from "./GameLoseScreen";
import './EndGameScreen.css';

interface EndGameScreenInput {
    gameResult: boolean
    guesses: number
    maxGuesses: number
    points: number
    answer: string
    resetData: () => void
}

function EndGameScreen({ gameResult, guesses, maxGuesses, points, answer, resetData }:EndGameScreenInput) {
    console.log(gameResult);
    return (
        <div>
            {
                gameResult 
                ? (<GameWinScreen guesses={guesses} points={points} resetData={resetData} />)
                : (<GameLoseScreen maxGuesses={maxGuesses} resetData={resetData} answer={answer}/>)
            
            }
        </div>
    );
}

export default EndGameScreen;