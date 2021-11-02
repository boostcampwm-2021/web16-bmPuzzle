import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
// eslint-disable-next-line import/extensions
import colors from "@styles/theme";

const globalStyles = createGlobalStyle`
${reset};
html{
}
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
`;
export default globalStyles;
