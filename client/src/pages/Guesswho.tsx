// import { Navigate, useParams } from 'react-router-dom';
// import Auth from '../utils/auth';

import { useMutation } from '@apollo/client';
import { useState, useEffect } from 'react';

import { ASK_GEMINI } from '../utils/mutations';

const GuessWhoGame = () => {
  // GEMINI comes up with final answer
  // const baseText = `We are playing a Guess Who game with the final answer being 'final_answer'. You should answer with a yes/no response. `;
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [guesses, setGuess] = useState(20);
  const [askGemini, { loading, error }] = useMutation(ASK_GEMINI);
  const [questionList, setQuestionList] = useState<string[]>([]);
  const [answerList, setAnswerList] = useState<string[]>([]);

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

  const restartGame = () => {
    setGuess(20);
    setQuestionList([]);
    setAnswerList([]);
    // send game log to server
  };

  useEffect(() => {
    if (guesses === 0) {
      alert('Game Over! Starting a new game.');
      restartGame();
    }
  }, [guesses]);

  return (
    <div>
      <h1>Guess Who Game</h1>
      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Type your question here"
      />
      <button onClick={handleAsk} disabled={loading}>
        {loading ? 'Asking...' : 'Ask Gemini'}
      </button>
      {error && <p>Error: {error.message}</p>}
      {answer && <p>Gemini's Answer: {answer}</p>}
    </div>
  );
};

export default GuessWhoGame;
