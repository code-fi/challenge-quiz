import React from "react";
import styled from "styled-components";
import { DIFFICULT_LEVEL_HARD, DIFFICULT_LEVEL_MEDIUM } from "../constants";

const QuestionMetaContainer = styled.div`
  margin-bottom: 16px;
`;

const QuestionCounter = styled.h3`
  font-size: 18px;
  margin: 0;
  font-weight: bold;
`;

const QuestionCategory = styled.span`
  font-size: 12px;
  color: #a2a2a2;
`;

const Star = styled.span`
  font-size: 14px;
  color: ${(props) => (props.active ? "#222" : "#d2d2d2")};
`;

const Stars = styled.div`
  display: flex;
  margin-top: 2px;
`;

function QuestionMeta({ current, total, category, difficulty }) {
  const difficultyRating =
    difficulty === DIFFICULT_LEVEL_HARD
      ? 3
      : difficulty === DIFFICULT_LEVEL_MEDIUM
      ? 2
      : 1;
  return (
    <QuestionMetaContainer>
      <QuestionCounter>
        Question {current} of {total}
      </QuestionCounter>
      <QuestionCategory>{decodeURIComponent(category)}</QuestionCategory>
      <Stars>
        <Star active={difficultyRating >= 1}>&#9733;</Star>
        <Star active={difficultyRating >= 2}>&#9733;</Star>
        <Star active={difficultyRating === 3}>&#9733;</Star>
      </Stars>
    </QuestionMetaContainer>
  );
}

export default QuestionMeta;
