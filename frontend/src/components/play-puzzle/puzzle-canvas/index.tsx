import React, { useRef, useEffect, useContext, useState } from "react";
import Paper from "paper";
import styled from "styled-components";
import { SocketContext } from "@context/socket";
import Puzzle from "@components/play-puzzle/puzzle-canvas/puzzle/index";
import { createTiles } from "@components/play-puzzle/puzzle-canvas/puzzle/create-puzzle";
import { puzzleCompleteAudio } from "@components/play-puzzle/puzzle-canvas/puzzle/audio-effect";
import { completeAnimation } from "@components/play-puzzle/puzzle-canvas/puzzle/complete-animation";

type LevelSizeType = { 1: number; 2: number; 3: number };
type Levels = 1 | 2 | 3;
const levelSize: LevelSizeType = { 1: 400, 2: 500, 3: 600 };
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
  groupTileIndex: number | null;
  project: typeof Paper;
  puzzleImage: typeof Paper.Raster;
  tileIndexes: any[];
  groupArr: any[];
  selectIndex: number;
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
    selectIndex: -1,
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
    const res = new config.project.Group([p1, r1, p2]);
    return res;
  });
  config.shapes = data.shapes;

  config.tiles = tiles;
  config.groupTiles = tiles.map((x, i) => [x, config.groupTiles[i][1]]);

  return config;
};

const PuzzleCanvas = (props: any) => {
  const canvasRef = useRef(null);
  const { puzzleImg, level, isFirstClient, roomID, puzzleID } = props;
  const [showCanvas, setShowCanvas] = useState(true);
  let time = props.time;
  const socket = useContext(SocketContext);
  useEffect(() => {
    const canvas: any = canvasRef.current;
    if (canvas === null) return;
    Paper.setup(canvas);
    let config: Config;

    if (isFirstClient) {
      setConfig(puzzleImg, level, Paper);
      createTiles();
      config = Puzzle.exportConfig();
      Puzzle.move(isFirstClient, socket, roomID);
      socket.emit("setPuzzleConfig", { roomID: roomID, config: config });
    } else {
      socket.emit("groupIndex", { roomID: roomID, groupTileIndex: 200 });

      socket.on("groupIndex", ({ groupIndex }: { groupIndex: number }) => {
        if (!isNaN(groupIndex)) {
          Puzzle.groupFirstUpdate(groupIndex);
        }
      });
      socket.on("getPuzzleConfig", (res: Config) => {
        Puzzle.setting(getConfig(res, Paper));
        Puzzle.move(isFirstClient, socket, roomID);
      });
      socket.emit("getPuzzleConfig", { roomID: roomID });
    }
    socket.on("groupIndex", ({ groupIndex }: { groupIndex: number }) => {
      if (!isNaN(groupIndex)) {
        Puzzle.groupUpdate(groupIndex);
      }
    });
    socket.on("tilePosition", ({ tileIndex, tilePosition, tileGroup }) => {
      Puzzle.renderMove(tileIndex, tilePosition, tileGroup);
    });
  }, []);

  const postDonePuzzle = async () => {
    const timeToNum = Math.floor(time.startTime - Date.now() / 1000);
    const response = await fetch(`${process.env.REACT_APP_API_URL}/complete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userID: window.sessionStorage.getItem("id"),
        puzzleID: Number(puzzleID),
        time: timeToNum,
      }),
    });

    if (!response.ok) {
      throw Error;
    }
  };

  useEffect(() => {
    const complete = Puzzle.completePuzzle();
    if (complete) {
      completeAnimation(Puzzle.exportConfig().project);
      puzzleCompleteAudio();
      postDonePuzzle();
      setTimeout(() => setShowCanvas(false), 4000);
      socket.emit("deleteRoom", { roomID: roomID });
      time = undefined;
    }
  }, [time]);
  return (
    <Wrapper>
      {showCanvas ? (
        <Canvas ref={canvasRef} id="canvas" />
      ) : (
        <ComponentImg src={puzzleImg.current.src} alt="puzzleImage" />
      )}
    </Wrapper>
  );
};

const Canvas = styled.canvas`
  position: absolute;
  width: 1280px;
  height: 765px;
  top: ${(window.innerHeight + 35) / 2}px;
  left: 50%;
  transform: translate(-50%, -50%);
  box-sizing: border-box;
  border: 2px solid #000000;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;
const ComponentImg = styled.img`
  z-index: 1;
  object-fit: scale-down;
  width: 80%;
  height: 80%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;
export default PuzzleCanvas;
