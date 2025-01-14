import { useNavigate } from "react-router-dom";

interface GameLoseScreenProps {
    maxGuesses: number;
    answer: string;
    resetData: () => void;
}

function GameLoseScreen({ maxGuesses, answer, resetData }: GameLoseScreenProps) {
    const navigate = useNavigate();
    
    return (
        <div className="end-game-screen">
            <h2 className="ifwin-declaration">BETTER LUCK NEXT TIME!</h2>
            <p>You were not able to "Guess Who?" within {maxGuesses} questions. Answer: {answer}"</p>
            <p className="cursive">Better luck next time!</p>
            <div className="button-container">
                <button className="play-again-button" onClick={resetData}>
                    PLAY AGAIN
                </button>
                <button className="return-home-button" onClick={() => navigate("/")}>HOME</button>
            </div>
        </div>
    );
}

export default GameLoseScreen;