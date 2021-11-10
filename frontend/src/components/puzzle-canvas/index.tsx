import React, { useRef, useEffect } from "react";
import Paper from "paper";
import Puzzle from "@components/puzzle-canvas/puzzle/index";
import styled from "styled-components";

type LevelSizeType = { 1: number; 2: number; 3: number };
type Levels = 1 | 2 | 3;
const levelSize: LevelSizeType = { 1: 300, 2: 500, 3: 800 };

const setConfig = (img: any, level: Levels) => {
  const originHeight = img.current.height;
  const originWidth = img.current.width;
  const imgWidth =
    originHeight > originWidth
      ? Math.round((levelSize[level] * originWidth) / originHeight / 100) * 100
      : levelSize[level];
  const imgHeight =
    originHeight > originWidth
      ? levelSize[level]
      : Math.round((levelSize[level] * originHeight) / originWidth / 100) * 100;
  const tileWidth = 100;
  return {
    originHeight: originHeight,
    originWidth: originWidth,
    imgWidth: imgWidth,
    imgHeight: imgHeight,
    tilesPerRow: Math.floor(imgWidth / tileWidth),
    tilesPerColumn: Math.floor(imgHeight / tileWidth),
    tileWidth: tileWidth,
    tileMarginWidth: tileWidth * 0.203125,
    level: level,
    imgName: "puzzleImage",
  };
};

const PuzzleCanvas = (props: any) => {
  const canvasRef = useRef(null);
  const level = props.level;

  useEffect(() => {
    const canvas: any = canvasRef.current;
    if (canvas === null) return;
    Paper.setup(canvas);
    const config = setConfig(props.puzzleImg, level);
    const puzzle = new Puzzle(Paper, config);
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
