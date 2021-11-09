import React, { useRef, useEffect } from "react";
import Paper from "paper";
import Puzzle from "@components/puzzle-canvas/puzzle/index";
import { preProcessFile } from "typescript";

const PuzzleCanvas = (props: any) => {
  const canvasRef = useRef(null);
  const levelTemp = 3;

  useEffect(() => {
    const canvas: any = canvasRef.current;
    if (canvas === null) return;
    canvas.width = 1000;
    canvas.height = 1000;
    Paper.setup(canvas);
    const puzzle = new Puzzle(Paper, props.puzzleImg, levelTemp);
    console.log(puzzle);
  }, []);

  return <canvas ref={canvasRef} id="canvas" />;
};

export default PuzzleCanvas;
