import React, { useState } from "react";
import styled from "styled-components";
import LevelComponent from "@components/level-component";
import Header from "@components/header/index";
import colors from "@styles/theme";
import { fetchPost } from "@src/utils/fetch";

const registerURI = "http://localhost:5000/api/register";
const RegPuz = () => {
  const [checkedLevel, setLevel] = useState(1);
  const [title, setTitle] = useState("");
  const [selectedImg, setSelectedcImg] = useState(null);

  const titleHandler = (event: any) => {
    setTitle(event?.target.value);
  };
  const fileHandler = (event: any) => {
    setSelectedcImg(event.target.files[0]);
  };
  const submitHandler = () => {
    const formData = new FormData();
    const id = "Jaeyoung Lee";
    if (selectedImg === null || title === "") {
      alert("양식을 다 채우세요");
      return false;
    }
    formData.append("userId", id);
    formData.append("title", title);
    formData.append("img", selectedImg);
    formData.append("level", String(checkedLevel));
    fetchPost({ path: registerURI, body: formData });
  };

  return (
    <Wrapper>
      <Header />
      <Body>
        <ComponentWrap>
          <div>
            <FlexDiv>
              <p>Title</p>
              <input
                type="text"
                name="title"
                id="Title"
                onChange={titleHandler}
                value={title}
              />
            </FlexDiv>
            <FlexDiv>
              <input
                type="file"
                name="img"
                accept="image/*"
                onChange={fileHandler}
              />
            </FlexDiv>
            <div>
              <FlexDiv>Level</FlexDiv>
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
            <button type="submit" onClick={submitHandler}>
              submit
            </button>
          </div>
        </ComponentWrap>
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
  margin-bottom: 50px;
`;

const ComponentWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

export default RegPuz;
