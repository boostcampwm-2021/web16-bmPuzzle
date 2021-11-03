import React, { useRef, useEffect } from "react";
import Paper from "paper";

const PuzzleCanvas = (props: any) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas === null) return;
    Paper.setup(canvas);
  }, []);

  return <canvas ref={canvasRef} {...props} id="canvas" />;
};

export default PuzzleCanvas;
