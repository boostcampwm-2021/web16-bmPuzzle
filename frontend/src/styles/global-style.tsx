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
@font-face {
    src: url("./RobotoSlab.ttf");
    font-family: "roboto slab";
}
@font-face {
    src: url("./RobotoSlab-Bold.ttf");
    font-family: "roboto slab bold";
}
*{
    box-sizing:boerder-box;
    font-family: "roboto slab";
    font-weight: 400;
}
#root {
    height: 100vh;
    overflow-y: hidden;
}
div {
    font-family: "roboto slab bold";
    font-weight: bold;
    font-weight: 420;
}
`;
export default globalStyles;
