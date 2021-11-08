import React, { useRef, useEffect } from "react";
import Paper from "paper";
import Puzzle from "@components/puzzle-canvas/puzzle/index";

const Canvas = (callback: any) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas: any = canvasRef.current;
    Paper.setup(canvas);
    callback(Paper);
  }, []);

  return canvasRef;
};

const PuzzleCanvas = (props: any) => {
  const levelTemp = 3;
  const canvasRef = Canvas(async (Paper: any) => {
    const puzzle = await new Puzzle(Paper, props.puzzleImg, levelTemp);
  });
  return <canvas ref={canvasRef} height={1000} width={1000} id="canvas" />;
};
export default PuzzleCanvas;
