import React, { useRef, useEffect, useContext, useState } from "react";
import Paper from "paper";
import styled from "styled-components";

import { SocketContext } from "@context/socket";
import Puzzle from "@components/play-puzzle/puzzle-canvas/puzzle/index";
import { createTiles } from "@components/play-puzzle/puzzle-canvas/puzzle/create-puzzle";

type LevelSizeType = { 1: number; 2: number; 3: number };
type Levels = 1 | 2 | 3;
const levelSize: LevelSizeType = { 1: 300, 2: 500, 3: 800 };
type Config = {
  originHeight: number;
  originWidth: number;
  imgWidth: number;
  imgHeight: number;
  tilesPerRow: number;
  tilesPerColumn: number;
  tileWidth: number;
  tileMarginWidth: number;
  level: number;
  imgName: String;
  groupTiles: any[];
  shapes: any[];
  tiles: any[];
  complete: boolean;
  groupTileIndex: number;
  project: any;
  puzzleImage: any;
  tileIndexes: any[];
};

const setConfig = (img: any, level: Levels, Paper: any) => {
  const originHeight = img.current.height;
  const originWidth = img.current.width;
  const imgWidth =
    originHeight >= originWidth
      ? Math.round((levelSize[level] * originWidth) / originHeight / 100) * 100
      : levelSize[level];
  const imgHeight =
    originHeight >= originWidth
      ? levelSize[level]
      : Math.round((levelSize[level] * originHeight) / originWidth / 100) * 100;
  const tileWidth = 100;
  const config: Config = {
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
    groupTiles: [],
    shapes: [],
    tiles: [],
    complete: false,
    groupTileIndex: 0,
    project: Paper,
    puzzleImage: new Paper.Raster({
      source: "puzzleImage",
      position: Paper.view.center,
    }),
    tileIndexes: [],
  };
  return config;
};

const getConfig = (data: Config, Paper: any) => {
  const config = data;
  config.project = Paper;
  config.puzzleImage = new Paper.Raster({
    source: "puzzleImage",
    position: Paper.view.center,
  });
  return config;
};

const PuzzleCanvas = (props: any) => {
  const canvasRef = useRef(null);
  const { puzzleImg, level, isFirstClient, roomID } = props;
  const socket = useContext(SocketContext);
  console.log(`isFirstClient? ${isFirstClient}`);

  useEffect(() => {
    const canvas: any = canvasRef.current;
    if (canvas === null) return;
    Paper.setup(canvas);
    let config: Config;
    if (isFirstClient) {
      config = setConfig(puzzleImg, level, Paper);
      Puzzle.setting(config);
      createTiles();
      config = Puzzle.exportConfig();
      console.log(config);
      socket.emit("setPuzzleConfig", { roomID: roomID, config: config });
      Puzzle.move();
    } else {
      socket.on("getPuzzleConfig", (res: Config) => {
        Puzzle.setting(getConfig(res, Paper));
        console.log("hi", res);
        Puzzle.move();
      });
      socket.emit("getPuzzleConfig", { roomID: roomID });
    }
  }, [puzzleImg]);

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
