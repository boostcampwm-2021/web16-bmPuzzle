import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import shareBtnImg from "@images/share-btn.png";

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

  const validURL = async (imgID: any) => {
    const urlHash = await getValidURL();
    return `/room/${imgID}/${urlHash}`;
  };

  const moveHandler = async (imgID: any) => {
    history.push(await validURL(imgID));
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
            onClick={() => {
              moveHandler(ele.id);
            }}
          >
            <Img src={ele.image} />
            <Content>
              <div>{ele.title}</div>
              <DetailWrap>
                <div>{time}</div>
                <ShareButton
                  shareControl={props.shareControl}
                  onClick={async (e) => {
                    e.stopPropagation();
                    const link = await validURL(ele.id);
                    props.shareControl(true, ele.image, link);
                  }}
                >
                  <img src={shareBtnImg} alt="공유" />
                </ShareButton>
              </DetailWrap>
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

type shareBtnType = {
  shareControl: any;
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
    cursor: pointer;
  }
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  width: 65%;
  font-size: 12px;
  color: gray;
  line-height: 30px;
`;

const Img = styled.img`
  width: 80%;
  height: 80%;
  margin-bottom: 10px;
  object-fit: contain;
  &: hover {
    opacity: 0.5;
  }
`;
const DetailWrap = styled.div`
  display: flex;
  flex-direction: row;
`;
const ShareButton = styled.button<shareBtnType>`
  display: ${(props) => (props.shareControl === undefined ? "none" : "block")};
  padding: 0px;
  margin: 0px 0px 0px 10px;
  background: none;
  border: none;
  width: 30px;
  height: 30px;
  &: hover {
    cursor: pointer;
    opacity: 0.5;
  }
  img {
    width: 30px;
    height: 30px;
    object-fit: scale-down;
  }
`;
export default ImageCard;
