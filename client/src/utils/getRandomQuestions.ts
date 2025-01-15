const guessWhoQuestions = [
    // General Questions
    "Is it a living thing?",
    "Is it bigger than a breadbox?",
    "Can it move on its own?",
    "Is it commonly found outdoors?",
    "Does it have fur or hair?",
    "Is it associated with a specific color?",
    "Can it make a sound?",
    "Is it known for being fast?",
    "Does it belong in a specific habitat (e.g., water, land, or air)?",
    "Can it be considered dangerous?",
  
    // Person-Specific Questions
    "Is it a human?",
    "Is this person famous?",
    "Is this person alive today?",
    "Is this person associated with entertainment (movies, music, etc.)?",
    "Is this person a historical figure?",
    "Does this person have a specific job or profession?",
    "Is this person known for their physical appearance (e.g., hairstyle, clothing)?",
    "Is this person associated with sports?",
    "Is this person known for their intelligence or inventions?",
    "Has this person won any awards?",
  
    // Animal-Specific Questions
    "Is it a mammal?",
    "Does it live in the ocean?",
    "Can it fly?",
    "Does it have a tail?",
    "Is it a pet?",
    "Is it a predator?",
    "Does it eat plants?",
    "Is it known for being cute or cuddly?",
    "Does it live in a group or by itself?",
    "Is it an endangered species?"
  ];
  
  const getRandomQuestions = (numQuestions: number) => {
    const shuffled = guessWhoQuestions.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, numQuestions);
  }

  export default getRandomQuestions;