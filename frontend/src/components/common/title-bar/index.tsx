import React from "react";
import styled from "styled-components";

import LogoutBtn from "@components/logout-btn/index";

const AccountBar = (props: any) => {
  return (
    <Wrapper>
      <LeftWrapper>
        <Img src={props.img} alt="account" />
        <Name>{props.text}</Name>
      </LeftWrapper>
      {props.btn === "logout" ? <LogoutBtn /> : ""}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  margin-left: 10%;
  margin: 3% 12% 0 12%;
  justify-content: space-between;
`;

const LeftWrapper = styled.div`
  display: flex;
`;

const Img = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 40px;
`;

const Name = styled.div`
  font-size: 20px;
  padding: 10px 0;
  font-weight: 900;
`;

export default AccountBar;
