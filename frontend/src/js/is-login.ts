// eslint-disable-next-line import/extensions
import { getCookie } from "./cookie";
const isLogin = () => {
  return getCookie("id") !== undefined;
};
const getID = () => {
  return getCookie("id") === undefined ? "" : getCookie("id");
};

export { isLogin, getID };
