import React, { useState } from "react";
import styled from "styled-components";
import Header from "@components/header/index";
import PuzzleCanvas from "@components/puzzle-canvas/index";

const PlayPuzzle = () => {
  return (
    <div>
      <Header />
      <PuzzleCanvas />
    </div>
  );
};

export default PlayPuzzle;
