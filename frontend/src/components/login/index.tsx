import * as React from "react";
import GoogleLogin from "react-google-login";
import styled from "styled-components";
import puzzleIcon from "@images/main-icon.png";

const Login = (props: any) => {
  const google_id: string = process.env.REACT_APP_CLIENT_ID || "";

  const onLoginSuccess = async (res: any) => {
    await fetch(`${process.env.REACT_APP_API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: res.profileObj.name,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.code === 200) {
          window.sessionStorage.setItem("id", res.profileObj.name);
        } else {
          window.alert("잘못된 입력입니다!");
        }
      });
  };

  return (
    <Wrapper>
      <Icon src={puzzleIcon} />
      <GoogleLogin
        clientId={google_id}
        icon={false}
        buttonText="Login"
        onSuccess={(result) => onLoginSuccess(result)}
        onFailure={(result) => console.log(result)}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: black;
  height: 100%;
`;
const Icon = styled.img`
  width: 50%;
  height: 50%;
`;

export default Login;
