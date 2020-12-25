import React from "react";
import QuestionMeta from "./QuestionMeta";
import styled from "styled-components";
import Answers from "./Answers";

const WorkArea = styled.div`
  width: 60%;
  padding: 32px 0;
  display: flex;
  flex-direction: column;
`;
const Question = styled.div`
  font-size: 22px;
`;

function QuestionArea({
  currentQuestion: { answers, question, difficulty, category, correct_answer },
  currentQuestionNumber,
  totalQuestionNumber,
  onAnswered,
  answered,
}) {
  return (
    <WorkArea>
      <QuestionMeta
        difficulty={difficulty}
        current={currentQuestionNumber}
        total={totalQuestionNumber}
        category={category}
      />
      <Question>{decodeURIComponent(question)}</Question>
      <Answers
        answered={answered && correct_answer}
        answers={answers}
        onAnswerSelected={onAnswered}
      />
    </WorkArea>
  );
}

export default QuestionArea;
