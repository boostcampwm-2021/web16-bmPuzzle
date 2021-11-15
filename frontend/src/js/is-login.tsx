const isLogin = () => window.sessionStorage.getItem("id") !== null;

export default isLogin;
