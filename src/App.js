import React, { useState, useEffect } from "react";
import ProgressBar from "./components/ProgressBar";
import ScoreReader from "./components/ScoreReader";
import QuestionArea from "./components/QuestionArea";
import styled from "styled-components";
import { shuffle } from "./utils";
import ScoreSheet from "./components/ScoreSheet";
const questions = require("./questions.json");

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const NextButton = styled.button`
  font-size: 20px;
  padding: 10px 20px;
  background-color: #b0b0b0;
  cursor: pointer;
  border-radius: 5px;
  border: none;
`;
function App() {
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [answers, setAnswer] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState({});
  const [currentQuestionAnswered, setCurrentQuestionAnswered] = useState(false);
  const [score, setScore] = useState({ wrongCount: 0, correctCount: 0 });

  const totalQuestions = questions.length;
  const currentQuestionNumber = activeQuestionIndex + 1;

  const canGoNext =
    currentQuestionAnswered && currentQuestionNumber < totalQuestions;

  const testCompleted =
    currentQuestionAnswered && currentQuestionNumber === totalQuestions;

  const markQuestionAnswered = (answer) => {
    const marking = {
      questionNumber: currentQuestionNumber,
      isCorrect: currentQuestion.correct_answer === answer,
    };
    setAnswer([...answers, marking]);
    setCurrentQuestionAnswered(true);
  };

  useEffect(() => {
    const question = questions[activeQuestionIndex];

    const mergedAnswers = [
      ...question.incorrect_answers,
      question.correct_answer,
    ];

    question.answers = shuffle(mergedAnswers);
    setCurrentQuestion(question);
    setCurrentQuestionAnswered(false);

    if (activeQuestionIndex === 0) {
      setAnswer([]);
    }
  }, [activeQuestionIndex]);

  useEffect(() => {
    if (answers.length > 0) {
      const correctAnswers = answers.filter((answer) => answer.isCorrect)
        .length;
      const wrongAnswers = answers.length - correctAnswers;
      setScore({ correctCount: correctAnswers, wrongCount: wrongAnswers });
    } else {
      setScore({ wrongCount: 0, correctCount: 0 });
    }
  }, [answers]);

  return (
    <AppContainer>
      {testCompleted ? (
        <ScoreSheet
          answers={answers}
          onRestartTest={() => setActiveQuestionIndex(0)}
        />
      ) : (
        <>
          <ProgressBar
            percentage={(currentQuestionNumber / totalQuestions) * 100}
          />
          <QuestionArea
            answered={currentQuestionAnswered}
            onAnswered={markQuestionAnswered}
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
        </>
      )}
    </AppContainer>
  );
}

export default App;
