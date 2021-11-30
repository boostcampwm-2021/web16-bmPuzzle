import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const UploadButton = () => {
  const history = useHistory();

  const handleMove = () => history.push("/register");

  return (
    <Wrapper>
      <Btn onClick={handleMove}>+</Btn>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  justify-content: flex-end;
  display: flex;
`;

const Btn = styled.button`
  width: 40px;
  background: black;
  height: 40px;
  color: white;
  position: absolute;
  top: 480px;
  font-size: 20px;
  font-weight: 900;
  margin-right: 7px;
  border: none;
  border-radius: 50px;
  box-shadow: 0 3px 6px rgb(0 0 0 / 16%), 0 3px 6px rgb(0 0 0 / 23%);
  outline: none;

  &:hover {
    cursor: pointer;
    opacity: 0.5;
  }
`;

export default UploadButton;
