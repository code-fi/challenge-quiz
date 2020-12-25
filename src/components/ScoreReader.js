import React from "react";
import styled from "styled-components";

const ScoreContainer = styled.div`
  width: 600px;
  margin: auto;
`;

const ScoreFlex = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ScoreProgressContainer = styled.div`
  position: relative;
  border-radius: 5px;
  height: 30px;
  margin-top: 4px;
  border: 1px solid #adadad;
`;

const ScoreProgress = styled.div`
  height: 100%;
  transition: width 400ms ease-in-out;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
`;
const MinimumScore = styled(ScoreProgress)`
  background-color: #af3939;
  z-index: 3;
  width: ${(props) => props.width}%;
`;
const ActualScore = styled(ScoreProgress)`
  background-color: #45a547;
  z-index: 2;
  width: ${(props) => props.width}%;
`;

const MaximumScore = styled(ScoreProgress)`
  background-color: #c6fdbf;
  z-index: 1;
  width: ${(props) => props.width}%;
`;

function ScoreReader({ totalQuestions, correctCount, wrongCount }) {
  const totalAnswered = correctCount + wrongCount;
  const remainingQuestions = totalQuestions - totalAnswered;
  const lowestPercentage = ((correctCount / totalQuestions) * 100).toFixed(0);
  const actualPercentage =
    correctCount > 0 ? ((correctCount / totalAnswered) * 100).toFixed(0) : 0;
  const highestPercentage = (
    ((correctCount + remainingQuestions) / totalQuestions) *
    100
  ).toFixed(0);

  return (
    <ScoreContainer>
      <ScoreFlex>
        <span>Score : {actualPercentage}%</span>
        <span>Max Score :{highestPercentage}%</span>
      </ScoreFlex>
      <ScoreProgressContainer className="score-progress">
        <MinimumScore
          width={lowestPercentage}
          title={`Your lowest possible score = ${lowestPercentage}%`}
        />
        <ActualScore
          width={actualPercentage}
          title={`Your actual score = ${actualPercentage}%`}
        />
        <MaximumScore
          width={highestPercentage}
          title={`Your maximum score = ${highestPercentage}%`}
        />
      </ScoreProgressContainer>
    </ScoreContainer>
  );
}

export default ScoreReader;
