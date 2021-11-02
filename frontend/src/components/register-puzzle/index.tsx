import React, { useState } from "react";
import styled from "styled-components";
import LevelComponent from "@components/register-puzzle/level-component";
import Header from "@components/header/index";
import colors from "@styles/theme";

const RegPuz = () => {
  const [checkedLevel, setLevel] = useState(1);
  return (
    <Wrapper>
      <Header />
      <Body>
        <div>
          <form
            action="http://localhost:5000/api/register"
            accept-charset="utf-8"
            method="post"
          >
          <FlexDiv>
            <p>Title</p>
            <input type="text" name="title" />
          </FlexDiv>
          <div className="rp__upload">
            <input type="file" name="img" accept="image/*" />
          </div>
          <div>
            <div>Level</div>
            <FlexDiv>
              <LevelComponent
                  num={1}
                  checkedLevel={checkedLevel}
                  checkFunction={setLevel}
                ></LevelComponent>
                <LevelComponent
                  num={2}
                  checkedLevel={checkedLevel}
                  checkFunction={setLevel}
                ></LevelComponent>
                <LevelComponent
                  num={3}
                  checkedLevel={checkedLevel}
                  checkFunction={setLevel}
                ></LevelComponent>
            </FlexDiv>
          </div>
        </div>
        <div className="rp__submit">
          <button type="submit">submit</button>
        </div>
        </form>
      </Body>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
`;
const Body = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 80%;
  height: 70%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -45%);

  border: 1px solid ${colors["gray3"]};
`;

const FlexDiv = styled.div`
  display: flex;
`;

export default RegPuz;
