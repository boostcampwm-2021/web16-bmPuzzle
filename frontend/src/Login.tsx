import * as React from "react";
import GoogleLogin from "react-google-login";

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

    fetch("http://localhost:5000/api/login", {
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
        if (response.token) {
          window.sessionStorage.setItem("id", response.token);
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
