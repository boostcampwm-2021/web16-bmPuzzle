import React, { useRef, useEffect } from "react";
import styled from "styled-components";

import Paper from "paper";

import puzzlePieceImg from "@images/puzzle-piece.png";

const LogoCanvas = () => {
  const logoCanvasRef = useRef(null);
  const namesInfo = [
    { name: "김하정", x: 50, y: 50 },
    { name: "유진", x: window.innerWidth - 50, y: 50 },
    { name: "이재영", x: 50, y: window.innerHeight - 50 },
    { name: "장진희", x: window.innerWidth - 50, y: window.innerHeight - 50 },
  ];

  const init = () => {
    const canvas: any = logoCanvasRef.current;
    if (canvas === null) return;
    Paper.setup(canvas);
    const project = Paper.projects[0];
    mainLogoShow(project);
    puzzlePiecesShow(project);
    nameShow();
  };

  useEffect(() => init(), []);

  const mainLogoShow = (project: any) => {
    const logoTextPosY = Math.round(window.innerHeight * 0.15);
    const logoText = new Paper.PointText({
      point: project.view.center,
      justification: "center",
      content: "BM PUZZLE",
      fontFamily: "Roboto slap",
      fontWeight: 900,
      fillColor: "#ffffff00",
      fontSize: 60,
    });
    logoText.onFrame = () => {
      if (logoText.fillColor !== null && logoText.fillColor.alpha < 1) {
        logoText.fillColor.alpha += 0.01;
      }
      if (logoText.position.y >= logoTextPosY) {
        logoText.position = new Paper.Point(
          logoText.position.x,
          logoText.position.y - 4
        );
      }
    };
  };

  const puzzlePiecesShow = (project: any) => {
    const center = {
      x: Math.round(project.view.center._x),
      y: Math.round(project.view.center._y),
    };

    const puzzlePieceRaster = new Paper.Raster({
      source: puzzlePieceImg,
      position: project.view.center,
    });

    const animationFlag = {
      rightTop: true,
      leftBottom: false,
      movable: false,
      reset: function () {
        this.rightTop = true;
        this.leftBottom = false;
        this.movable = false;
      },
      allStop: function () {
        this.rightTop = false;
        this.leftBottom = false;
        this.movable = false;
      },
    };

    const initialPosition = {
      movable: {
        x: center.x - 60,
        y: center.y - 60,
      },
      rightTop: {
        x: center.x + 60,
        y: center.y - 60,
      },
      rightBottom: {
        x: center.x + 60,
        y: center.y + 60,
      },
      leftBottom: {
        x: center.x - 60,
        y: center.y + 60,
      },
    };

    const initialRotation = {
      movable: 225,
      rightTop: 0,
      leftBottom: 180,
      rightBottom: 90,
    };

    const animationControl = {
      rightTop: {
        x: Number(initialPosition.rightTop.x),
        y: center.y - 15,
      },
      leftBottom: {
        x: center.x - 15,
        y: Number(initialPosition.leftBottom.y),
      },
    };

    const puzzlePiece = new Paper.SymbolDefinition(puzzlePieceRaster);

    const makePiece = (
      positionX: number,
      positionY: number,
      rotation: number
    ) => {
      const piece: any = new Paper.SymbolItem(puzzlePiece);
      piece.position = new Paper.Point(positionX, positionY);
      piece.rotation = rotation;
      piece.reset = () => {
        piece.position = new Paper.Point(positionX, positionY);
        piece.rotation = rotation;
      };
      return piece;
    };
    const movablePiece = makePiece(
      initialPosition.movable.x,
      initialPosition.movable.y,
      initialRotation.movable
    );
    const rightTopPiece = makePiece(
      initialPosition.rightTop.x,
      initialPosition.rightTop.y,
      initialRotation.rightTop
    );
    const leftBottomPiece = makePiece(
      initialPosition.leftBottom.x,
      initialPosition.leftBottom.y,
      initialRotation.leftBottom
    );
    const rightBottomPiece = makePiece(
      initialPosition.rightBottom.x,
      initialPosition.rightBottom.y,
      initialRotation.rightBottom
    );

    const pieces = [
      movablePiece,
      rightTopPiece,
      leftBottomPiece,
      rightBottomPiece,
    ];

    let startFlag = false;
    let selectFlag = false;
    movablePiece.reset = () => {
      movablePiece.rotation = initialRotation.movable;
    };
    movablePiece.onFrame = (event: any) => {
      if (!selectFlag) {
        const nowX = movablePiece.position._x;
        const nowY = movablePiece.position._y;
        const xChange = initialPosition.movable.x - nowX;
        const yChange = initialPosition.movable.y - nowY;
        if (
          Math.floor(nowX) !== initialPosition.movable.x ||
          Math.floor(nowY) !== initialPosition.movable.y
        ) {
          let xSign, ySign;

          if (xChange < 0) {
            xSign = -1;
          } else if (xChange === 0) {
            xSign = 0;
          } else {
            xSign = 1;
          }
          if (yChange < 0) {
            ySign = -1;
          } else if (yChange === 0) {
            ySign = 0;
          } else {
            ySign = 1;
          }

          movablePiece.position = new Paper.Point(
            Math.round(nowX + xSign),
            Math.round(nowY + ySign)
          );
        }
      }
      if (animationFlag.movable) {
        if (!startFlag) {
          startFlag = true;
          setTimeout(() => {
            animationFlag.allStop();
            startFlag = false;
            setTimeout(() => {
              pieces.forEach((piece) => {
                piece.reset();
              });
              animationFlag.reset();
            }, 5000);
          }, 1200);
        }
        if (Math.floor(event.count / 10) % 2 === 0) {
          movablePiece.rotation += 3;
        } else {
          movablePiece.rotation -= 3;
        }
      }
    };

    movablePiece.onMouseDrag = (event: any) => {
      selectFlag = true;
      movablePiece.position = new Paper.Point(
        movablePiece.position._x + event.delta.x,
        movablePiece.position._y + event.delta.y
      );
    };
    movablePiece.onMouseUp = (event: any) => {
      selectFlag = false;
    };

    rightTopPiece.onFrame = () => {
      if (animationFlag.rightTop) {
        if (
          Math.round(rightTopPiece.position.y) !== animationControl.rightTop.y
        ) {
          rightTopPiece.position = new Paper.Point(
            rightTopPiece.position.x,
            rightTopPiece.position.y + 1
          );
        } else {
          setTimeout(() => {
            animationFlag.rightTop = false;
            animationFlag.leftBottom = true;
          }, 500);
        }
      }
    };
    leftBottomPiece.onFrame = () => {
      if (animationFlag.leftBottom) {
        if (
          Math.round(leftBottomPiece.position.x) !==
          animationControl.leftBottom.x
        ) {
          leftBottomPiece.position = new Paper.Point(
            leftBottomPiece.position.x + 1,
            leftBottomPiece.position.y
          );
        } else {
          setTimeout(() => {
            animationFlag.leftBottom = false;
            animationFlag.movable = true;
          }, 500);
        }
      }
    };
  };

  const nameShow = () => {
    const nameWrite = ({ name, x, y }: any) => {
      return new Paper.PointText({
        point: new Paper.Point(x, y),
        justification: "center",
        content: name,
        fontFamily: "Roboto slap",
        fontWeight: 900,
        fillColor: "#000000",
        fontSize: 20,
      });
    };

    namesInfo.map((data) => nameWrite(data));
  };

  return <IconCanvas ref={logoCanvasRef} id="logo_canvas" />;
};

const IconCanvas = styled.canvas`
  z-index: 1;
  position: absolute;
  left: 0%;
  top: 0%;
  width: 100%;
  height: 100%;
`;

export default LogoCanvas;
