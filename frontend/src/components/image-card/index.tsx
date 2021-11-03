import React from "react";
import styled from "styled-components";

const ImageCard = (props: any) => {
  return (
    <ImageGroup>
      {props.img.map((ele: any, idx: any) => {
        return (
          <Wrapper key={idx}>
            <Img src={ele.image} />
            <Content>
              <div>{ele.title}</div>
              <div>{ele.visit_time}</div>
            </Content>
          </Wrapper>
        );
      })}
    </ImageGroup>
  );
};

const ImageGroup = styled.div`
  display: flex;
  margin-top: 25px;
  flex-wrap: wrap;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
  padding: 3% 5%;
  align-items: center;
  &: hover {
    opacity: 0.5;
    cursor: pointer;
  }
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
  font-size: 18px;
  color: gray;
`;

const Img = styled.img`
  width: 85%;
  height: 85%;
  margin-bottom: 15px;
  object-fit: contain;
`;
export default ImageCard;
