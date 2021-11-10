import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const ImageCard = (props: any) => {
  const history = useHistory();
  const getValidURL = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/room/urlcheck`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const resJSON = await response.json();
    return resJSON.validURL;
  };

  const moveHandler = async (event: any, imgID: any) => {
    const validURL = await getValidURL();
    history.push(`/room/${imgID}/${validURL}`);
  };

  const convertTime = (time: number) => {
    let hour, minute, second;
    if (time >= 3600) {
      hour = Math.floor(time / 3600);
      time = time % 3600;
    }

    if (time >= 60) {
      minute = Math.floor(time / 60);
      second = time % 60;
    } else {
      second = time;
    }

    const timeArr = [
      { value: hour, string: "시간 " },
      { value: minute, string: "분 " },
      { value: second, string: "초" },
    ];
    const str = timeArr.map((ele, idx) => {
      return ele.value === undefined ? "" : `${ele.value}${ele.string}`;
    });

    return str.join("");
  };
  return (
    <ImageGroup {...props}>
      {props.img.map((ele: any, idx: any) => {
        const time =
          ele.time === undefined ? ele.visit_time : convertTime(ele.time);
        return (
          <Wrapper
            key={idx}
            onClick={(event: any) => {
              moveHandler(event, ele.id);
            }}
          >
            <Img src={ele.image} />
            <Content>
              <div>{ele.title}</div>
              <div>{time}</div>
            </Content>
          </Wrapper>
        );
      })}
    </ImageGroup>
  );
};

type marginType = {
  margin: number;
};
const ImageGroup = styled.div<marginType>`
  display: flex;
  margin-top: ${(props) => {
    return props.margin || 0;
  }}px;
  flex-wrap: wrap;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
  margin: 3% 5% 1% 5%;
  align-items: center;
  &: hover {
    opacity: 0.5;
    cursor: pointer;
  }
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  width: 65%;
  font-size: 12px;
  color: gray;
`;

const Img = styled.img`
  width: 80%;
  height: 80%;
  margin-bottom: 10px;
  object-fit: contain;
`;
export default ImageCard;
