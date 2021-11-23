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

*::-webkit-scrollbar {
    width: 10px;
    height: 100%;
}
*::-webkit-scrollbar-thumb {
    background-color: #D7D7D7;
    border-radius: 10px;
    opacity: 0.5;
}
*::-webkit-scrollbar-track {
    background-color: white;
}

* input[type="file"] {
    position: absolute;
    width: 0;
    height: 0;
    padding: 0;
    overflow: hidden;
    border: 0;
}
`;
export default globalStyles;
