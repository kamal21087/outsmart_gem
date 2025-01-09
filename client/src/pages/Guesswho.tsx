// import { Navigate, useParams } from 'react-router-dom';
// import Auth from '../utils/auth';

import { useMutation } from '@apollo/client';
import { useState, useEffect } from 'react';

import { ASK_GEMINI } from '../utils/mutations';

import InGameNav from '../components/Game/InGameNav';
// import ChatCloud from '../components/ChatBox/ChatCloud';
import EndGameScreen from '../components/Game/EndGameScreen';

const GuessWhoGame = () => {
  // GEMINI comes up with final answer
  // const baseText = `We are playing a Guess Who game with the final answer being 'final_answer'. You should answer with a yes/no response. `;
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [guesses, setGuess] = useState(20);
  const [askGemini, { loading, error }] = useMutation(ASK_GEMINI);
  const [questionList, setQuestionList] = useState<string[]>([]);
  const [answerList, setAnswerList] = useState<string[]>([]);
  const [gameResult, setGameResult] = useState(false);

  const handleAsk = async () => {
    try {
        setQuestionList([...questionList, question]);
        const { data } = await askGemini({
            variables: { question },
        });
        setAnswer(data.askGuessWhoGemini);
        setAnswerList([...answerList, data.askGuessWhoGemini]);
    } catch (err: any) {
        console.error('Error asking Gemini:', err.message);
    }
  };

  const restartGame = (ifWin: boolean) => {
    setGuess(20);
    setQuestionList([]);
    setAnswerList([]);
    if (ifWin) {

    }
    // send game log to server
  };

  useEffect(() => {
    if (guesses === 0) {
      alert('Game Over! Starting a new game.');
      setGameResult(false);
      restartGame(false);
    }
  }, [guesses]);

  // useEffect for if user question contains the answer -> Gamewin

  return (
    <div>
      <h1>Guess Who Game</h1>
      <InGameNav remainingQuestions={guesses} />
      {
        // Set up display for questions & answers
      }
      <textarea
        className='chat-entry-area'
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Type your question here"
      />
      <button className='send-chat-button' onClick={handleAsk} disabled={loading}>
        {loading ? 'Asking...' : 'Ask Gemini'}
      </button>
      {error && <p>Error: {error.message}</p>}
      {answer && <p>Gemini's Answer: {answer}</p>}
      <div className='ifhidden'></div>
      <EndGameScreen gameResult={gameResult} />
    </div>
  );
};

export default GuessWhoGame;
