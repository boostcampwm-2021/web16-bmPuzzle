import React, { useRef, useEffect } from "react";
import Paper from "paper";
import Puzzle from "@components/puzzle-canvas/puzzle/index";

const PuzzleCanvas = (props: any) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas: any = canvasRef.current;
    if (canvas === null) return;
    canvas.width = `1000`;
    canvas.height = 1000;
    Paper.setup(canvas);
    const puzzle = new Puzzle(Paper);
    console.log(puzzle);
  }, []);

  return <canvas ref={canvasRef} {...props} id="canvas" resize />;
};

export default PuzzleCanvas;
