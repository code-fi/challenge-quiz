import React from "react";
import styled from "styled-components";

const Sheet = styled.div`
  width: 730px;
  padding: 40px;
  display: flex;
  flex-direction: column;
`;

const Line = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 4px 0;
`;

const Mark = styled.span`
  font-size: 14px;
  font-weight: bold;
  color: ${(props) => (props.isCorrect ? "green" : "red")};
`;

function ScoreSheet({ answers, onRestartTest }) {
  const renderAnswers = answers.map(({ questionNumber, isCorrect }) => (
    <AnswerSheet
      questionNumber={questionNumber}
      isCorrect={isCorrect}
      key={answers.questionNumber}
    />
  ));
  return (
    <Sheet>
      {renderAnswers}
      <button onClick={onRestartTest}>Restart</button>
    </Sheet>
  );
}

const AnswerSheet = ({ questionNumber, isCorrect }) => {
  return (
    <Line>
      <span>Question {questionNumber}</span>
      <Mark isCorrect={isCorrect}>{isCorrect ? "correct" : "wrong"}</Mark>
    </Line>
  );
};

export default ScoreSheet;
