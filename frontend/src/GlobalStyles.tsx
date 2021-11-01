import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

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
`;
export default globalStyles;
