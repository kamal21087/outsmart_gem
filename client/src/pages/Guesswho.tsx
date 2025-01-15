import { useMutation, useQuery } from '@apollo/client';
import { useState, useEffect, useRef } from 'react';

import { ASK_GEMINI, ADD_GAMELOG } from '../utils/mutations';
import { GET_USER_DATA, GET_USERNAME_AVATAR } from '../utils/queries';

import './Guesswho.css';

import ChatCloud from '../components/ChatBox/ChatCloud';
import EndGameScreen from '../components/Game/EndGameScreen';

import GuessWhoRules from ".././components/Game/GuessWhoRules";
import animalsList from '../utils/animalsList';
import pickRandom from '../utils/pickRandom';
import findCloseEnough from '../utils/areStringsCloseEnough';
import getRandomQuestions from '../utils/getRandomQuestions';

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
  const [rulesDisplay, setRulesDisplay] = useState(false);

  const { data: userData } = useQuery(GET_USERNAME_AVATAR);

  console.log('userData:', userData?.me?.profileImage);

  const displayName = userData?.me?.username || 'Guest';
  const userAvatar = userData?.me?.profileImage || '../../images/option1.webp';
  const aiAvatar = '../../images/option0.webp';

  const [askGemini, { loading, error }] = useMutation(ASK_GEMINI);
  const [addGamelog] = useMutation(ADD_GAMELOG,{refetchQueries:[{query: GET_USER_DATA}]});

  const [qnAList, setQnAList] = useState<questionAndResponse[]>([]);
  const [gameResult, setGameResult] = useState(false);
  const [gameEnd, setGameEnd] = useState(false);

  const [exampleQuestions, setexampleQuestions] = useState(getRandomQuestions(5));

  
  const chatEndRef = useRef<HTMLDivElement>(null);

  const handleAsk = async (clickedQuestion? : string) => {
    // Check if the question is empty
    if (!question.trim() && !clickedQuestion) {
      alert('Please enter a valid question.');
      return;
    }

    try {
        
        const prompt = clickedQuestion ? baseText + clickedQuestion : baseText + question;

        console.log('Prompt:', prompt);

        const { data } = await askGemini({
            variables: { question: prompt },
        });

        const newQ = clickedQuestion ? clickedQuestion : question;

        const newQnA = { question : newQ, answer: data.askGemini };
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
      console.log('Gamelog input:', JSON.stringify(input));
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
    setexampleQuestions(getRandomQuestions(5));
  }

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }

  useEffect(() => {
    scrollToBottom();
  }, [qnAList]);  

  useEffect(() => {
    if (guesses === 0) {
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
      <div className='welcome-title-container'>
        <h1 className='welcome-message'>Guess Who</h1>
        <div className='button-container' onClick={() => 
                    setRulesDisplay(!rulesDisplay)}>
          <button className='how-to-play-button' >?</button>
        </div>
      </div>
            
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
        
        {qnAList.length === 0 && <div className='example-questions-container'>
          {exampleQuestions.map((question, index) => (
            <div key={index} className='example-questions' onClick={()=>handleAsk(question)}>
              {question}
            </div>
          ))}
        </div>}

        <p className='questions-left-text'>
          {qnAList.length === 0 && "Ask a Yes/No Question. "}
          You have {guesses} questions left.
        </p>

        <img className="chat-entry-avatar" src={userAvatar} alt="user avatar" />

        <textarea
          className='chat-entry-area'
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Type your question here"
        />

        <button className='chat-btn-submit' onClick={()=>handleAsk} disabled={loading}> {loading ? '...' : '→'} </button>

        {error && <p>Error: {error.message}</p>}
      </div>
      
      { /* Display the rules popup if rulesDisplay is true */ }
      <GuessWhoRules display={rulesDisplay} onClose={() => setRulesDisplay(false)} />

      {/* Hidden until game ends */}
      {gameEnd && (<EndGameScreen gameResult={ gameResult } guesses={guesses} maxGuesses={maxGuesses} points={Math.round(guesses / maxGuesses * 100)} answer={finalAnswer} resetData={resetData}/>)}
    </div>
  );
};

export default GuessWhoGame;
