import React, { useRef, useEffect } from "react";
import Paper from "paper";
import Puzzle from "@components/puzzle-canvas/puzzle/index";
import styled from "styled-components";

const canvasStyle = {
  marginLeft: "100px",
};

const PuzzleCanvas = (props: any) => {
  const canvasRef = useRef(null);
  const levelTemp = 3;

  useEffect(() => {
    const canvas: any = canvasRef.current;
    if (canvas === null) return;
    Paper.setup(canvas);
    const puzzle = new Puzzle(Paper, props.puzzleImg, levelTemp);
    console.log(puzzle);
  }, []);

  return (
    <Wrapper>
      <Canvas ref={canvasRef} id="canvas" />
    </Wrapper>
  );
};

const Canvas = styled.canvas`
  width: 100%;
  height: 100%;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 50px 0;
  box-sizing: border-box;
`;

export default PuzzleCanvas;
