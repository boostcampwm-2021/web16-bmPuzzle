import * as React from "react";
import GoogleLogin from "react-google-login";

const Login = (props: any) => {
  //사용자 정보를 담아둘 userObj
  const [userObj, setUserObj] = React.useState({
    email: "",
    name: "",
  });
  //로그인 성공시 res처리
  const onLoginSuccess = (res: any) => {
    setUserObj({
      ...userObj,
      email: res.profileObj.email,
      name: res.profileObj.name,
    });
    console.log(res.profileObj.name);
  };

  return (
    <div>
      <GoogleLogin
        clientId={
          "413166234631-5sdmatteo3vq9v1gpbgktpkjmga9df7p.apps.googleusercontent.com"
        }
        buttonText="Google"
        onSuccess={(result) => onLoginSuccess(result)}
        onFailure={(result) => console.log(result)}
      />
    </div>
  );
};

export default Login;
