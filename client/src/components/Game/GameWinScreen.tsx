import { useNavigate } from "react-router-dom";

interface GameWinScreenProps {
    guesses: number;
    points: number;
    resetData: () => void;
}

function GameWinScreen({ guesses, points, resetData }: GameWinScreenProps) {
    const navigate = useNavigate();

    return (
        <div className="end-game-screen">
            <h2 className="ifwin-declaration">CONGRATULATIONS!</h2>
            <p>You found the answer in "Guess Who?" by asking {guesses} questions.</p>
            <p className="cursive">You just received {points} points.</p>
            <div className="button-container">
                <button className="play-again-button" onClick={resetData}>
                    PLAY AGAIN
                </button>
                <button className="return-home-button" onClick={() => navigate("/")}>HOME</button>
            </div>
        </div>
    );
}

export default GameWinScreen;
