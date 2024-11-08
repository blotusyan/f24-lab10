import React, { useState, useEffect } from 'react';
import './Quiz.css';
import QuizCore from '../core/QuizCore';
import QuizQuestion from '../core/QuizQuestion';

const Quiz: React.FC = () => {
  // Instantiate QuizCore to manage quiz logic.
  const quizCore = new QuizCore();

  // Initial state derived from QuizCore
  const [currentQuestion, setCurrentQuestion] = useState<QuizQuestion | null>(quizCore.getCurrentQuestion());
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState<number>(quizCore.getScore());
  const [isQuizComplete, setIsQuizComplete] = useState<boolean>(false);

  // Function to handle answer selection
  const handleOptionSelect = (option: string): void => {
    setSelectedAnswer(option);
  };

  // Function to handle "Next Question" or "Submit" button click
  const handleButtonClick = (): void => {
    if (currentQuestion && selectedAnswer) {
      // Record the answer in QuizCore and update score
      quizCore.answerQuestion(selectedAnswer);
      setScore(quizCore.getScore()); // Update score in state
      
      // Move to the next question if available
      if (quizCore.hasNextQuestion()) {
        quizCore.nextQuestion();
        setCurrentQuestion(quizCore.getCurrentQuestion());
        setSelectedAnswer(null); // Reset selected answer for the new question
      } else {
        // If no more questions, mark the quiz as complete
        setIsQuizComplete(true);
      }
    }
  };

  if (isQuizComplete) {
    return (
      <div>
        <h2>Quiz Completed</h2>
        <p>Final Score: {score} out of {quizCore.getTotalQuestions()}</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Quiz Question:</h2>
      <p>{currentQuestion?.question}</p>
    
      <h3>Answer Options:</h3>
      <ul>
        {currentQuestion?.options.map((option) => (
          <li
            key={option}
            onClick={() => handleOptionSelect(option)}
            className={selectedAnswer === option ? 'selected' : ''}
          >
            {option}
          </li>
        ))}
      </ul>

      <h3>Selected Answer:</h3>
      <p>{selectedAnswer ?? 'No answer selected'}</p>

      <button onClick={handleButtonClick}>
        {quizCore.hasNextQuestion() ? 'Next Question' : 'Submit'}
      </button>
    </div>
  );
};

export default Quiz;
