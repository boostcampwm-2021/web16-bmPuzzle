import React, { useRef, useEffect } from "react";
import Paper from "paper";
import Puzzle from "@components/puzzle-canvas/puzzle/index";
import styled from "styled-components";

const setConfig = (img: any, level: number) => {
  const originHeight = img.current.height;
  const originWidth = img.current.width;
  const imgWidth = 500;
  const imgHeight = Math.round((500 * originHeight) / originWidth / 100) * 100;
  const tileWidth = 100;
  return {
    originHeight: originHeight,
    originWidth: originWidth,
    imgWidth: 500,
    imgHeight: Math.round((500 * originHeight) / originWidth / 100) * 100,
    tilesPerRow: Math.floor(imgWidth / tileWidth),
    tilesPerColumn: Math.floor(imgHeight / tileWidth),
    tileWidth: 100,
    tileMarginWidth: tileWidth * 0.203125,
    level: level,
    imgName: "puzzleImage",
  };
};

const PuzzleCanvas = (props: any) => {
  const canvasRef = useRef(null);
  const levelTemp = 3;

  useEffect(() => {
    const canvas: any = canvasRef.current;
    if (canvas === null) return;
    Paper.setup(canvas);
    const config = setConfig(props.puzzleImg, levelTemp);
    const puzzle = new Puzzle(Paper, config);
    console.log(puzzle);
  }, [props.puzzleImg]);

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
