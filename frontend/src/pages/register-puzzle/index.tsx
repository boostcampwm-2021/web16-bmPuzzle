import React, { useState } from "react";
import styled from "styled-components";
import LevelComponent from "@src/components/register-puzzle/level-component";
import Header from "@src/components/common/header/index";
import colors from "@styles/theme";
import { useHistory } from "react-router-dom";

const RegPuz = () => {
  const [checkedLevel, setLevel] = useState(1);
  const [title, setTitle] = useState("");
  const [selectedImg, setSelectedcImg] = useState(null);
  const history = useHistory();

  const titleHandler = (event: any) => {
    setTitle(event?.target.value);
  };
  const fileHandler = (event: any) => {
    setSelectedcImg(event.target.files[0]);
  };
  const submitHandler = async () => {
    const formData = new FormData();
    const id: any = window.sessionStorage.getItem("id");
    if (selectedImg === null || title === "") {
      alert("양식을 다 채우세요");
      return false;
    }
    formData.append("userId", id);
    formData.append("title", title);
    formData.append("img", selectedImg);
    formData.append("level", String(checkedLevel));
    const response = await fetch(`${process.env.REACT_APP_API_URL}/register`, {
      method: "POST",
      headers: {},
      body: formData,
    });
    if (response.status === 200) {
      history.push("/main");
    } else {
      alert("Upload Fail");
    }
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
              <FlexDiv>Level: {checkedLevel}</FlexDiv>
              <FlexDiv>
                {[1, 2, 3].map((i) => {
                  return (
                    <LevelComponent
                      key={i}
                      number={i}
                      checkedLevel={checkedLevel}
                      checkFunction={setLevel}
                    />
                  );
                })}
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
