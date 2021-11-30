import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { RouteComponentProps, StaticContext } from "react-router";
import styled from "styled-components";

import GoogleLogin from "react-google-login";

import LogoCanvas from "@components/logo-canvas";
import { isLogin } from "@src/js/is-login";
import { setCookie } from "@src/js/cookie";

type LocationState = {
  prevPath: Location;
};

const Login = (
  props: RouteComponentProps<{}, StaticContext, LocationState>
) => {
  const history = useHistory();
  const google_id: string = process.env.REACT_APP_CLIENT_ID || "";

  const fetchLogin = async (res: any) => {
    return fetch(`${process.env.REACT_APP_API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: res.profileObj.name,
      }),
    });
  };

  const onLoginSuccess = async (res: any) => {
    let response;
    try {
      response = await fetchLogin(res);
    } catch (error) {
      throw error;
    }

    if (response.ok) {
      setCookie("id", res.profileObj.name);
      const goalPath =
        props.location.state === undefined ||
        props.location.state.prevPath === undefined
          ? "/main"
          : props.location.state.prevPath;
      history.push(goalPath);
    }
  };

  useEffect(() => {
    if (
      isLogin() &&
      (props.location.state === undefined ||
        props.location.state.prevPath === undefined)
    ) {
      history.push("/main");
    }
  }, []);

  return (
    <Wrapper>
      <LogoCanvas></LogoCanvas>
      <GoogleLogin
        clientId={google_id}
        render={(renderProps) => (
          <GoogleButton
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
          >
            <span>Login</span>
          </GoogleButton>
        )}
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

const GoogleButton = styled.button`
  z-index: 2;
  position: absolute;
  left: 50%;
  bottom: 15%;
  transform: translate(-50%, 0);
  justify-content: center;
  border-radius: 50px;
  height: 45px;
  width: 300px;
  span {
    font-size: 30px;
    color: black;
    padding: 1%;
    font-weight: 900;
  }
  border: none;

  &:hover {
    opacity: 0.5;
    cursor: pointer;
  }
`;

export default Login;
