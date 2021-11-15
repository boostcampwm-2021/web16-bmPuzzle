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
    font-family: 'roboto slab';
    src: local("./RobotoSlab.ttf");
}
@font-face {
    font-family: roboto slab bold;
    src: local("./RobotoSlab-Bold.ttf");
}
*{
    font-family: "roboto slab bold";
}
#root {
    height: 100vh;
    overflow-y: hidden;
}
div {
    font-family: "roboto slab";
    font-weight: bold;
}
`;
export default globalStyles;
