import React, { useState } from "react";
import styled from "styled-components";

const AnswersContainer = styled.div`
  display: inline-grid;
  grid-gap: 50px;
  grid-template-columns: auto auto;
  margin: 32px auto 0 auto;
  width: 80%;
  align-self: center;
`;

const AnswerButton = styled.button`
  padding: 10px 30px;
  background-color: ${(props) =>
    props.isActive ? "#222222" : props.isWrong ? "#d2d2d2" : "transparent"};
  border: 1px solid;
  border-radius: 5px;
  cursor: pointer;
  font-size: 18px;
  color:${(props) => (props.isActive ? "#ffffff" : "#686868")};
  border-color:${(props) => (props.isActive ? "#686868" : "#eeeeee")}
  color: ${(props) =>
    props.isActive ? "#ffffff" : props.isWrong ? "#eeeeee" : "#686868"};
  transition: background-color 300ms ease-in-out;
  
  :hover:not(:disabled) {
    background-color: ${(props) => (props.isActive ? "#222222" : "#d2d2d2")}
  }
  :disabled {
    cursor: not-allowed;
  }
`;
const AnswerRemarks = styled.h3`
  font-size: 22px;
  text-align: center;
  margin: 24px 0;
  color: ${(props) => (props.correct ? "green" : "red")};
`;

function Answers({ answers = [], onAnswerSelected, answered }) {
  const [selected, setSelected] = useState(null);
  const isCorrect = answered === selected;

  const answerSelected = (answer) => {
    setSelected(answer);
    onAnswerSelected(answer);
  };

  const renderAnswers = answers.map((answer, index) => (
    <AnswerButton
      onClick={() => answerSelected(answer)}
      isWrong={answered && !isCorrect}
      disabled={answered}
      isActive={answered === answer}
      key={index}
    >
      {decodeURIComponent(answer)}
    </AnswerButton>
  ));
  return (
    <>
      <AnswersContainer>{renderAnswers}</AnswersContainer>
      {answered && (
        <AnswerRemarks correct={isCorrect}>
          {isCorrect ? "Correct" : "Sorry"}
        </AnswerRemarks>
      )}
    </>
  );
}

export default Answers;
