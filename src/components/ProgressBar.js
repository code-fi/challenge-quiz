import React from "react";
import styled from "styled-components";

const Progress = styled.div`
  height: 100%;
  background-color: #959595;
  border-radius: 0 10px 10px 0;
  transition: width 300ms ease-in-out;
  width: ${(props) => props.percentage}%;
`;
const ProgressContainer = styled.div`
  width: 100%;
  height: 10px;
  background-color: #eeeeee;
  overflow: hidden;
`;
function ProgressBar({ percentage }) {
  return (
    <ProgressContainer>
      <Progress percentage={percentage} />
    </ProgressContainer>
  );
}

export default ProgressBar;
