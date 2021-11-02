import * as React from "react";
import GoogleLogin from "react-google-login";
import styled from "styled-components";

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
        }
      });
  };

  return (
    <div>
      <GoogleLogin
        clientId={google_id}
        buttonText="Google"
        onSuccess={(result) => onLoginSuccess(result)}
        onFailure={(result) => console.log(result)}
      />
    </div>
  );
};

export default Login;
