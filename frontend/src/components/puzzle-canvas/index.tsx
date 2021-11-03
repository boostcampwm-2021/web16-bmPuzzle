import React, { useRef, useEffect, useState } from "react";
import Paper from "paper";
import Puzzle from "@components/puzzle-canvas/puzzle/index";
import { view, Raster, Point } from "paper/dist/paper-core";

const PuzzleCanvas = (props: any) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas === null) return;
    Paper.setup(canvas);
    const puzzle = new Puzzle();
  }, []);

  return <canvas ref={canvasRef} {...props} id="canvas" />;
};

export default PuzzleCanvas;
