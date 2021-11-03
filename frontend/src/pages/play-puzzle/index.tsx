import React, { useState } from "react";
import styled from "styled-components";
import Header from "@components/header/index";
import PuzzleCanvas from "@components/puzzle-canvas/index";

const PlayPuzzle = () => {
  return (
    <div>
      <Header />
      <PuzzleCanvas />
      <img
        id="puzzleImage"
        src="https://cphoto.asiae.co.kr/listimglink/6/2019110809333471277_1573173214.png"
      />
    </div>
  );
};

export default PlayPuzzle;
