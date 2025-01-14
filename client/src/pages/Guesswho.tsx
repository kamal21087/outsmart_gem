import { useMutation, useQuery } from '@apollo/client';
import { useState, useEffect, useRef } from 'react';

import { ASK_GEMINI, ADD_GAMELOG } from '../utils/mutations';
import { GET_LOGGED_IN_USERNAME, GET_USER_AVATAR, GET_USER_DATA } from '../utils/queries';

import './Guesswho.css';

import InGameNav from '../components/Game/InGameNav';
import ChatCloud from '../components/ChatBox/ChatCloud';
import EndGameScreen from '../components/Game/EndGameScreen';
import animalsList from '../utils/animalsList';
import pickRandom from '../utils/pickRandom';
import findCloseEnough from '../utils/areStringsCloseEnough';

interface questionAndResponse {
    question: string;
    answer: string;
}

const GuessWhoGame = () => {
  const maxGuesses = 10;
  const [finalAnswer, setFinalAnswer] = useState(() => pickRandom(animalsList));
  const baseText = `We are playing a Guess Who game with the final answer being ${finalAnswer}. You should answer with a yes/no response. `;
  console.log('Prompt:', baseText);
  const [question, setQuestion] = useState('');
  const [guesses, setGuess] = useState(maxGuesses);

  const { data } = useQuery(GET_LOGGED_IN_USERNAME);
  const displayName = data?.getLoggedInUsername || 'Guest';
  const { data: userAvatarData } = useQuery(GET_USER_AVATAR);
  const userAvatar = userAvatarData?.getUserAvatar || '../../images/option1.webp';
  const aiAvatar = '../../images/option0.webp';

  const [askGemini, { loading, error }] = useMutation(ASK_GEMINI);
  const [addGamelog] = useMutation(ADD_GAMELOG,{refetchQueries:[{query: GET_USER_DATA}]});

  const [qnAList, setQnAList] = useState<questionAndResponse[]>([]);
  const [gameResult, setGameResult] = useState(false);
  const [gameEnd, setGameEnd] = useState(false);

  const chatEndRef = useRef<HTMLDivElement>(null);

  const handleAsk = async () => {
    // Check if the question is empty
    if (!question.trim()) {
      alert('Please enter a valid question.');
      return;
    }

    try {
        const prompt = baseText + question;

        const { data } = await askGemini({
            variables: { question: prompt },
        });

        const newQnA = { question, answer: data.askGemini };
        const updatedQnAList = [...qnAList, newQnA];

        if (findCloseEnough(finalAnswer, question)) {
          setGameResult(true);
          gameWon(updatedQnAList);
          return;
        }

        setQnAList(updatedQnAList);
        setQuestion(''); // Clear the question input
        setGuess(guesses - 1); // Decrement the number of guesses
    } catch (err: any) {
        console.error('Error asking Gemini:', err.message);
    }
  };

  const handleAddGamelog = async (updatedQnAList:questionAndResponse[], ifWin:boolean) => {
    try {
      const input = {
        userQuestions: updatedQnAList.map((qa) => qa.question),
        aiResponses: updatedQnAList.map((qa) => qa.answer),
        results: ifWin ? 'W' : 'L',
        score: Math.round(guesses / maxGuesses * 100),
      };
      await addGamelog({
        variables: { input },
      });
    } catch (err: any) {
      console.error('Error adding gamelog:', err.message);
    }
  }

  const gameLost = (updatedQnAList:questionAndResponse[]) => {
    setGameEnd(true);
    handleAddGamelog(updatedQnAList, false);
  };

  const gameWon = (updatedQnAList:questionAndResponse[]) => {
    setGameEnd(true);
    handleAddGamelog(updatedQnAList, true);
  };

  const resetData = () => {
    setGameEnd(false);
    setGuess(maxGuesses);
    setQnAList([]);
    setFinalAnswer(pickRandom(animalsList));
    setGameResult(false);
  }

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }

  useEffect(() => {
    scrollToBottom();
  }, [qnAList]);  

  useEffect(() => {
    if (guesses === 0) {
      alert('Game Over! Starting a new game.');
      gameLost(qnAList);
    }
  }, [guesses]);

  const handleKeyPress = (e:any) => {
    if (e.key === 'Enter') {
      handleAsk();
    }
  };

  return (
    <div className='guesswho-container'>
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
        <div ref={chatEndRef}></div>
      </div>
      
      <div className='chat-entry-container' onKeyDown={handleKeyPress}>
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
      {gameEnd && (<EndGameScreen gameResult={ gameResult } guesses={guesses} maxGuesses={maxGuesses} points={Math.round(guesses / maxGuesses * 100)} answer={finalAnswer} resetData={resetData}/>)}
    </div>
  );
};

export default GuessWhoGame;
