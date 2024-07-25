// components/GamePage.js
import React, { useState } from 'react';
import Question from './Question';

const GamePage = ({ questions , endQuiz }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  

  //function for checking and progressing questions
  const handleAnswerOptionClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestionIndex + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestionIndex(nextQuestion);
    } else {
      endQuiz(score);
    }
  };

  return (
    <div>
      <Question
        question={questions[currentQuestionIndex]}
        handleAnswerOptionClick={handleAnswerOptionClick}
      />
    </div>
  );
};

export default GamePage;
