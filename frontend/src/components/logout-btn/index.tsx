import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { removeCookie } from "@src/js/cookie";

const LogoutBtn = () => {
  const history = useHistory();

  const logout = () => {
    removeCookie("id");
    history.push("/");
  };

  return <LogoutButton onClick={logout}>Logout</LogoutButton>;
};

const LogoutButton = styled.button`
  background: black;
  border: none;
  padding: 0px;
  width: 90px;
  color: white;
  font-size: 16px;
  border-radius: 60px;
  font-weight: 900;
  &:hover {
    cursor: pointer;
    opacity: 0.5;
  }
`;

export default LogoutBtn;
