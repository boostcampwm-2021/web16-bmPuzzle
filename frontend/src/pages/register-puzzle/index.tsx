import React, { useState } from "react";
import styled from "styled-components";
import LevelComponent from "@components/register-puzzle/level-component";
import Header from "@components/common/header/index";
import colors from "@styles/theme";
import { useHistory } from "react-router-dom";

const RegPuz = () => {
  const [checkedLevel, setLevel] = useState(1);
  const [title, setTitle] = useState("");
  const [selectedImg, setSelectedcImg] = useState<null | File>(null);
  const [url, setUrl] = useState("");
  const [name, setName] = useState("");
  const history = useHistory();

  const titleHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event?.target.value);
  };
  const fileHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files === null) return;
    const img = event.target.files[0];
    const imgUrl = URL.createObjectURL(img);
    setName(event.target.files[0].name);
    setSelectedcImg(img);
    setUrl(imgUrl);
  };
  const submitHandler = async () => {
    const formData = new FormData();
    const id: string | null =
      window.sessionStorage.getItem("id") === null
        ? ""
        : String(window.sessionStorage.getItem("id"));
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
          <Title>Upload Image</Title>
          <Content>
            <FormWrapper>
              <FlexDiv>
                <p>Title</p>
                <input
                  type="text"
                  name="title"
                  id="Title"
                  placeholder="Type name of puzzle"
                  onChange={titleHandler}
                  value={title}
                />
              </FlexDiv>
              <FlexDiv>
                <Input
                  value={name === "" ? "File Name" : name}
                  onChange={(e) => {
                    e.preventDefault();
                  }}
                  disabled
                  placeholder="File Name"
                />
                <Label htmlFor="file">
                  <span>Search</span>
                </Label>
                <input
                  id="file"
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
              <div>
                <Btn type="submit" onClick={submitHandler}>
                  submit
                </Btn>
              </div>
            </FormWrapper>
            <PreviewWrapper>
              <FlexDiv> Preview Image </FlexDiv>
              <ImgWrapper>
                {url === "" ? (
                  <Text>img has not been uploaded yet :(</Text>
                ) : (
                  <Img src={url} alt="" />
                )}
              </ImgWrapper>
            </PreviewWrapper>
          </Content>
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
  margin-bottom: 30px;
  align-content: center;
  & > p {
    margin-right: 10px;
  }
`;

const ComponentWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: start;
  width: 70%;
  flex-direction: column;
`;

const PreviewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 48%;
  margin-left: 5%;
  padding: 2.5% 0;
`;

const FormWrapper = styled.div`
  width: 52%;
  padding: 3% 5% 3% 0;
  border-right: 1px solid rgba(0, 0, 0, 0.15);
`;

const Input = styled.input`
  background: white;
  display: flex;
  height: 30px;
  padding: 0 10px;
  vertical-align: middle;
  border: 1px solid rgba(0, 0, 0, 0.15);
  width: 85%;
  color: rgba(0, 0, 0, 0.5);
  border-radius: 5px;
`;

const Img = styled.img`
  width: 100%;
  max-width: 150px;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
`;

const Title = styled.p`
  text-align: center;
  width: 100%;
  margin-bottom: 30px;
  font-size: 20px;
`;
const Text = styled.p`
  color: rgba(0, 0, 0, 0.5);
`;

const ImgWrapper = styled.div`
  display: flex;
  justify-content: center;
  background: rgba(0, 0, 0, 0.05);
  height: 100%;
  padding: 5%;
  align-items: center;
`;

const Label = styled.label`
  display: flex;
  padding: 2.1% 3%;
  width: 15%;
  color: white;
  border-radius: 5px;
  vertical-align: middle;
  background-color: black;
  cursor: pointer;
  height: 16px;
  margin-left: 10px;
  font-size: 12px;
  font-weight: 900;
  align-items: center;
  justify-content: center;
  &: hover {
    cursor: pointer;
    opacity: 0.5;
  }
`;

const Btn = styled.button`
  width: 100%;
  background: black;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 1.5% 5%;
  font-size: 14px;
  font-weight: 900;
  &: hover {
    cursor: pointer;
    opacity: 0.5;
  }
`;

export default RegPuz;
