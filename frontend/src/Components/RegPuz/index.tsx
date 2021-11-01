import React from "react";
import styled from "styled-components";
import LevelComponent from "./Components/LevelComponent";
import GlobalStyles from "../../GlobalStyles";

const RegPuzDiv = styled.div`
  .rp__title {
    display: flex;
  }
  .rp__levelBox {
    display: flex;
  }
`;

const RegPuz: React.FC = () => {
  return (
    <RegPuzDiv>
      <GlobalStyles />
      <div className="rp__title">
        <p>Title</p>
        <input type="text" name="title" />
      </div>
      <div className="rp__upload">
        <input type="file" name="img" accept="image/*" />
      </div>
      <div className="rp__level">
        <div>Level</div>
        <div className="rp__levelBox">
          <LevelComponent num={1}></LevelComponent>
          <LevelComponent num={2}></LevelComponent>
          <LevelComponent num={3}></LevelComponent>
        </div>
      </div>
      <div className="rp__submit"></div>
    </RegPuzDiv>
  );
};

export default RegPuz;
