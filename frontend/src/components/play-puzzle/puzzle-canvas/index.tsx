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
  groupArr: any[];
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
    groupArr: [],
  };
  Puzzle.setting(config);
};

const getConfig = (data: Config, Paper: any) => {
  let config = data;
  config.project = Paper;
  config.puzzleImage = new Paper.Raster({
    source: "puzzleImage",
    position: Paper.view.center,
  });
  const tiles = config.tiles.map((tile) => {
    const p1 = new config.project.Path(tile[1].children[0][1]);
    const r1 = new config.project.Raster(tile[1].children[1][1]);
    const p2 = new config.project.Path(tile[1].children[2][1]);
    const res = new config.project.Group(p1, r1, p2);
    return res;
  });
  console.log(data.shapes);
  config.shapes = data.shapes;
  console.log(config.shapes);
  config.tiles = tiles;
  config.groupTiles = tiles.map((x, i) => [x, config.groupTiles[i][1]]);

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
      setConfig(puzzleImg, level, Paper);
      createTiles();
      config = Puzzle.exportConfig();
      Puzzle.move(isFirstClient);
      socket.emit("setPuzzleConfig", { roomID: roomID, config: config });
    } else {
      socket.on("getPuzzleConfig", (res: Config) => {
        Puzzle.setting(getConfig(res, Paper));
        Puzzle.move(isFirstClient);
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
