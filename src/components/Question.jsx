// components/Question.js
import React from 'react';

const Question = ({ question, handleAnswerOptionClick }) => {
  
  //store choices and shuffle them
  const shuffledAnswers = [
    ...question.incorrect_answers,
    question.correct_answer,
  ].sort(() => Math.random() - 0.5);

  return (
    <div>
      <h2 className='question'>{question.question}</h2>
      <div>
        {shuffledAnswers.map((answer) => (
          <button
            className='answer--buttons'
            key={answer}
            onClick={() => handleAnswerOptionClick(answer === question.correct_answer)}
          >
            {answer}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Question;
