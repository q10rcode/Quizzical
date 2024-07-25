import { useState, useEffect } from 'react';
import './App.css'
import { decode } from 'html-entities';
import GamePage from './components/GamePage';

const App = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showStartPage, setShowStartPage] = useState(true);
  const [showQuizPage, setShowQuizPage] = useState(false);
  const [showResultPage, setShowResultPage] = useState(false);
  const [score, setScore] = useState(0);

  //functions for controlling which screen to display
  const startQuiz = () => {
    setShowStartPage(false);
    setShowQuizPage(true);
    setShowResultPage(false);
  };

  const restartQuiz = () => {
    setScore(0);
    setShowStartPage(true);
    setShowQuizPage(false);
    setShowResultPage(false);
    fetchQuizQuestions();
  };

  const endQuiz = (finalScore) => {
    setScore(finalScore);
    setShowQuizPage(false);
    setShowResultPage(true);
  };

  //functions for API data
  const decodeText = (question) => ({
    ...question,
    question: decode(question.question),
    correct_answer: decode(question.correct_answer),
    incorrect_answers: question.incorrect_answers.map(answer => decode(answer))
  });

  const fetchQuizQuestions = async () => {
    setLoading(true); // Start loading
    const response = await fetch('https://opentdb.com/api.php?amount=5&difficulty=easy');
    const data = await response.json();

    const decodedQuestions = data.results.map(decodeText);
    setQuestions(decodedQuestions);
    setLoading(false); // End loading
  };

  //load questions
  useEffect(() => {
    fetchQuizQuestions();
  }, []);

  
  return (
    <div>
      {loading && <p>Loading...</p>}
      {showStartPage && !loading && (
        <div>
          <h1 className="start--title">Quizzical</h1>
          <button className='start--button' onClick={startQuiz}>Start Quiz</button>
        </div>
      )}
      {showQuizPage && !loading && (
        <GamePage questions={questions} endQuiz={endQuiz} />
      )}
      {showResultPage && !loading && (
        <div>
          <h1>Your score: {score} out of {questions.length}</h1>
          <button className="reset--button" onClick={restartQuiz}>Restart Quiz</button>
        </div>
      )}
    </div>
  );
};

export default App;
