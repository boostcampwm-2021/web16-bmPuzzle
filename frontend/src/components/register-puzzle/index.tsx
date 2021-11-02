import React, { useState } from "react";
import styled from "styled-components";
import LevelComponent from "@components/register-puzzle/level-component";
import GlobalStyles from "@styles/global-style";
import Header from "@components/header/index";

const RegPuzDiv = styled.div`
  .rp-title {
    display: flex;
  }
  .rp-levelbox {
    display: flex;
  }
`;

const RegPuz = () => {
  const [checkedLevel, setLevel] = useState(1);
  return (
    <div id="wrapper">
      <Header></Header>
      <div id="body">
        <RegPuzDiv>
          <GlobalStyles />
          <form
            action="http://localhost:5000/api/register"
            accept-charset="utf-8"
            method="post"
          >
            <div className="rp-title">
              <p>Title</p>
              <input type="text" name="title" />
            </div>
            <div className="rp-upload">
              <input type="file" name="img" accept="image/*" />
            </div>
            <div className="rp-level">
              <div>Level</div>
              <div className="rp-levelbox">
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
              </div>
            </div>
            <div className="rp-submit">
              <button type="submit">submit</button>
            </div>
          </form>
        </RegPuzDiv>
      </div>
    </div>
  );
};

export default RegPuz;
