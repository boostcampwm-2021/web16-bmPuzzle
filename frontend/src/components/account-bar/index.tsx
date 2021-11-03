import React from "react";
import styled from "styled-components";
import accountImg from "@images/account-black-icon.png";

const AccountBar = (props: any) => {
  return (
    <Wrapper>
      <Img src={accountImg} alt="account" />
      <Name>Hello! {props.user}: )</Name>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  margin-left: 10%;
  margin: 2% 10% 0 10%;
`;

const Img = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 50px;
`;

const Name = styled.div`
  font-size: 30px;
  padding: 10px 0;
  font-weight: 900;
`;

export default AccountBar;
