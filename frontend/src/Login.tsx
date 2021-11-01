import * as React from "react";
import GoogleLogin from "react-google-login";
import "dotenv/config";

const Login = (props: any) => {
  const google_id: string = process.env.REACT_APP_CLIENT_ID || "";
  const [userObj, setUserObj] = React.useState({
    email: "",
    name: "",
  });

  const onLoginSuccess = (res: any) => {
    setUserObj({
      ...userObj,
      email: res.profileObj.email,
      name: res.profileObj.name,
    });
    window.sessionStorage.setItem("id", res.profileObj.name);
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
