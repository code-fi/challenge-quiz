import React, { useState, useEffect } from "react";
import ProgressBar from "./components/ProgressBar";
import ScoreReader from "./components/ScoreReader";
import QuestionArea from "./components/QuestionArea";
import styled from "styled-components";
import { shuffle } from "./utils";
const questions = require("./questions.json");

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const NextButton = styled.button`
  font-size: 20px;
  padding: 10px 20px;
  background-color:#b0b0b0;
  cursor: pointer;
  border-radius: 5px;
  border:none
`;
function App() {
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [answers, setAnswer] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState({});
  const [currentQuestionAnswered, setCurrentQuestionAnswered] = useState(false);
  const [score, setScore] = useState({ wrongCount: 0, correctCount: 0 });
  const markQuestion = (answer) => {
    const marking = {
      question_number: currentQuestionNumber,
      isCorrect: currentQuestion.correct_answer === answer,
    };
    setAnswer([...answers, marking]);
    setCurrentQuestionAnswered(true);
  };

  useEffect(() => {
    const _currentQuestion = questions[activeQuestionIndex];

    // create new question object for display
    const _answers = [
      ..._currentQuestion.incorrect_answers,
      _currentQuestion.correct_answer,
    ];
    _currentQuestion.answers = shuffle(_answers);
    setCurrentQuestion(_currentQuestion);
    setCurrentQuestionAnswered(false);
  }, [activeQuestionIndex]);

  useEffect(() => {
    if (answers.length > 0) {
      const correctCount = answers.filter((answer) => answer.isCorrect).length;
      const wrongCount = answers.length - correctCount;
      setScore({ correctCount, wrongCount });
    }
  }, [answers]);


  const totalQuestions = questions.length;
  const currentQuestionNumber = activeQuestionIndex + 1;
  const currentProgressPercentage =
    (currentQuestionNumber / totalQuestions) * 100;

  const canGoNext =
    currentQuestionAnswered && currentQuestionNumber < totalQuestions;

  return (
    <AppContainer>
      <ProgressBar percentage={currentProgressPercentage} />
      <QuestionArea
        answered={currentQuestionAnswered}
        onAnswered={markQuestion}
        currentQuestion={currentQuestion}
        currentQuestionNumber={currentQuestionNumber}
        totalQuestionNumber={totalQuestions}
      />
      {canGoNext && (
        <NextButton
          onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}
        >
          Next Question
        </NextButton>
      )}
      <ScoreReader
        correctCount={score.correctCount}
        totalQuestions={totalQuestions}
        wrongCount={score.wrongCount}
      />
    </AppContainer>
  );
}

export default App;
