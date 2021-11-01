import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
// eslint-disable-next-line import/extensions
import colors from "./styles/theme";

const globalStyles = createGlobalStyle`
${reset};
input {
    border: 0px;
}
input:focus {
    border: 0px;
    outline: none;
}
*{
    box-sizing:boerder-box;
}
#root {
    height: 100vh;
}
#wrapper {
    height: 100%;
    width: 100%;
}
#body {
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 80%;
    height: 70%;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -45%);


    border: 1px solid ${colors["gray3"]};
}
`;
export default globalStyles;
