import * as React from "react";
import { useHistory } from "react-router-dom";
import GoogleLogin from "react-google-login";
import styled from "styled-components";
import puzzleIcon from "@images/main-icon.png";

const Login = (props: any) => {
  const history = useHistory();
  const google_id: string = process.env.REACT_APP_CLIENT_ID || "";

  const onLoginSuccess = async (res: any) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: res.profileObj.name,
      }),
    }).then((response) => response.json());
    if (response.code === 200) {
      window.sessionStorage.setItem("id", res.profileObj.name);
      history.push("/register");
    } else {
      window.alert("잘못된 입력입니다!");
    }
  };

  return (
    <Wrapper>
      <Title>BM PUZZLE</Title>
      <Icon src={puzzleIcon} />
      <GoogleLoginBtn
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
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.div`
  color: white;
  font-size: 60px;
  font-weight: 900;
  margin-top: 125px;
`;
const Icon = styled.img`
  width: 200px;
  height: 200px;
  margin: 80px 0;
`;

const GoogleLoginBtn = styled(GoogleLogin)`
  justify-content: center;
  border-radius: 40px;
  height: 53px;
  width: 300px;
  span {
    font-size: 35px;
    color: black;
  }
`;

export default Login;
