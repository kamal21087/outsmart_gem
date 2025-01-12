// import { Navigate } from 'react-router-dom';

import { useMutation, useQuery } from '@apollo/client';
import { useState, useEffect } from 'react';

import { ASK_GEMINI, ADD_GAMELOG } from '../utils/mutations';
import { GET_LOGGED_IN_USERNAME, GET_USER_AVATAR, } from '../utils/queries';

import './Guesswho.css';

import InGameNav from '../components/Game/InGameNav';
import ChatCloud from '../components/ChatBox/ChatCloud';
import EndGameScreen from '../components/Game/EndGameScreen';
import animalsList from '../utils/animalsList';
import pickRandom from '../utils/pickRandom';

interface questionAndResponse {
    question: string;
    answer: string;
}

const GuessWhoGame = () => {
  const maxGuesses = 20;
  const [finalAnswer, setFinalAnswer] = useState(() => pickRandom(animalsList));
  const baseText = `We are playing a Guess Who game with the final answer being ${finalAnswer}. You should answer with a yes/no response. `;

  const [question, setQuestion] = useState('');
  const [guesses, setGuess] = useState(maxGuesses);

  const { data } = useQuery(GET_LOGGED_IN_USERNAME);
  const displayName = data?.getLoggedInUsername || 'Guest';
  const { data: userAvatarData } = useQuery(GET_USER_AVATAR);
  const userAvatar = userAvatarData?.getUserAvatar || '../../images/option1.webp';
  const aiAvatar = '../../public/images/option0.webp';

  const [askGemini, { loading, error }] = useMutation(ASK_GEMINI);
  const [addGamelog] = useMutation(ADD_GAMELOG);

  const [qnAList, setQnAList] = useState<questionAndResponse[]>([]);
  const [gameResult, setGameResult] = useState(false);
  const [gameEnd, setGameEnd] = useState(false);

  const handleAsk = async () => {
    // Check if the question is empty
    if (!question.trim()) {
      alert('Please enter a valid question.');
      return;
    }

    try {
        const prompt = baseText + question;
        console.log('Prompt:', prompt);

        const { data } = await askGemini({
            variables: { question: prompt },
        });
        console.log(data);

        const newQnA = { question, answer: data.askGemini };
        setQnAList([...qnAList, newQnA]);

        if (question.includes(finalAnswer)) {
          setGameResult(true);
          restartGame();
          return;
        }

        console.log(qnAList);
        setQuestion(''); // Clear the question input
        setGuess(guesses - 1); // Decrement the number of guesses
    } catch (err: any) {
        console.error('Error asking Gemini:', err.message);
    }
  };

  const handleAddGamelog = async () => {
    try {
      const input = JSON.stringify({
        userQuestions: qnAList.map((qa) => qa.question),
        aiResponses: qnAList.map((qa) => qa.answer),
        results: gameResult ? 'W' : 'L',
        score: Math.round((maxGuesses - guesses) / maxGuesses * 100),
      });
      console.log('Gamelog input:', input);
      await addGamelog({
        variables: { input },
      });
    } catch (err: any) {
      console.error('Error adding gamelog:', err.message);
    }
  }

  const restartGame = () => {
    setGuess(maxGuesses);
    setQnAList([]);
    setGameEnd(true);
    handleAddGamelog();
    setFinalAnswer(pickRandom(animalsList));
  };

  useEffect(() => {
    if (guesses === 0) {
      alert('Game Over! Starting a new game.');
      setGameResult(false);
      restartGame();
    }
  }, [guesses]);

  return (
    <div>
      <h1 className='welcome-message'>Guess Who</h1>
      <InGameNav remainingQuestions={guesses} />
            
      <div className='chat-container'>
        <ul>
          {qnAList.map((qa, index) => (
            <li key = {index}>
              <ChatCloud message={qa.question} username={displayName}avatarLink={userAvatar} ifself={true} />
              <ChatCloud message={qa.answer} username='Gem'avatarLink={aiAvatar} ifself={false} />
            </li>
          ))}
        </ul>
      </div>
      
      <div className='chat-entry-container'>
        <img className="chat-entry-avatar" src={userAvatar} alt="user avatar" />

        <textarea
          className='chat-entry-area'
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Type your question here"
        />

        <button className='btn-submit' onClick={handleAsk} disabled={loading}> {loading ? '...' : '→'} </button>

        {error && <p>Error: {error.message}</p>}
      </div>


      {/* Hidden until game ends */}
      {gameEnd && (<EndGameScreen gameResult={ gameResult } />)}
    </div>
  );
};

export default GuessWhoGame;
