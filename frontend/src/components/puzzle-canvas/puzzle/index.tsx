import { Point, Size } from "paper/dist/paper-core";

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
};

class Puzzle {
  project: any;
  puzzleImage: null | any;
  tiles: any[];
  groupTiles: any[];
  groupTileIndex = 0;
  config: Config;
  constructor(project: any, config: Config) {
    this.config = {
      ...config,
    };
    this.project = project;
    this.puzzleImage = new this.project.Raster({
      source: "puzzleImage",
      position: this.project.view.center,
    });
    this.groupTiles = [];

    this.tiles = [];
    this.createTiles();
  }

  createTiles() {
    const xTileCount = this.config.tilesPerRow;
    const yTileCount = this.config.tilesPerColumn;
    const tileRatio = this.config.tileWidth / 100.0;
    const shapeArray = this.getRandomShapes();
    const tileIndexes = [];
    for (let y = 0; y < yTileCount; y++) {
      for (let x = 0; x < xTileCount; x++) {
        const shape = shapeArray[y * xTileCount + x];

        const mask = this.getMask(
          tileRatio,
          shape.topTab,
          shape.rightTab,
          shape.bottomTab,
          shape.leftTab,
          this.config.tileWidth
        );
        mask.opacity = 0.25;
        mask.strokeColor = new this.project.Color(0, 0, 0);

        const cloneImg = this.puzzleImage.clone();
        const img = this.getTileRaster(
          cloneImg,
          new Size(this.config.tileWidth, this.config.tileWidth),
          new Point(this.config.tileWidth * x, this.config.tileWidth * y)
        );

        const border = mask.clone();
        border.strokeColor = new this.project.Color(255, 0, 0);
        border.strokeWidth = 5;

        const tile = new this.project.Group([mask, img, border]);
        tile.clipped = true;
        tile.opacity = 1;
        tile.position = new Point(100, 100);
        this.tiles.push(tile);
        this.groupTiles.push([tile, undefined]);
        tileIndexes.push(tileIndexes.length);
      }
    }

    for (let y = 0; y < yTileCount; y++) {
      for (let x = 0; x < xTileCount; x++) {
        const index1 = Math.floor(Math.random() * tileIndexes.length);
        const index2 = tileIndexes[index1];
        const tile = this.tiles[index2];
        tileIndexes.splice(index1, 1);

        const position = new Point(
          this.project.view.center.x -
            this.config.tileWidth +
            this.config.tileWidth * (x * 2 + (y % 2)) -
            this.config.imgWidth,
          this.project.view.center.y -
            this.config.tileWidth / 2 +
            this.config.tileWidth * y -
            this.config.imgHeight / 2
        );

        const cellPosition = new Point(
          Math.round(position.x / this.config.tileWidth) + 1,
          Math.round(position.y / this.config.tileWidth) + 1
        );

        tile.position = new Point(
          cellPosition.x * this.config.tileWidth + 50,
          cellPosition.y * this.config.tileWidth - 30
        );
      }
    }
    this.moveTile();
    this.findNearTile(shapeArray);
  }
  moveTile() {
    this.groupTiles.forEach((gtile) => {
      gtile[0].onMouseDrag = (event: any) => {
        if (gtile[1] === undefined) {
          gtile[0].position = new Point(
            gtile[0].position._x + event.delta.x,
            gtile[0].position._y + event.delta.y
          );
        } else {
          this.groupTiles.forEach((gtile_now) => {
            if (gtile[1] === gtile_now[1]) {
              gtile_now[0].position = new Point(
                gtile_now[0].position._x + event.delta.x,
                gtile_now[0].position._y + event.delta.y
              );
            }
          });
        }
      };
    });
  }
  findNearTile(shapes: any[]) {
    const xTileCount = this.config.tilesPerRow;
    const yTileCount = this.config.tilesPerColumn;

    this.tiles.forEach((tile) => {
      tile.onMouseUp = (event: any) => {
        let nowIndex = tile.index - (xTileCount * yTileCount + 1);
        let leftTile, rightTile, upTile, downTile;
        let leftShape, rightShape, upShape, downShape;
        const nowShape = shapes[nowIndex];
        if (nowIndex % xTileCount === 0) {
          leftTile = undefined;
        } else {
          leftTile = this.tiles[nowIndex - 1];
          leftShape = shapes[nowIndex - 1];
        }
        if (nowIndex % xTileCount === 2) {
          rightTile = undefined;
        } else {
          rightTile = this.tiles[nowIndex + 1];
          rightShape = shapes[nowIndex + 1];
        }
        if (nowIndex < xTileCount) {
          upTile = undefined;
        } else {
          upTile = this.tiles[nowIndex - xTileCount];
          upShape = shapes[nowIndex - xTileCount];
        }
        if (nowIndex >= xTileCount * (yTileCount - 1)) {
          downTile = undefined;
        } else {
          downTile = this.tiles[nowIndex + xTileCount];
          downShape = shapes[nowIndex + xTileCount];
        }
        if (upTile !== undefined) {
          this.fitTiles(tile, upTile, nowShape, upShape, 0);
        }
        if (downTile !== undefined) {
          this.fitTiles(tile, downTile, nowShape, downShape, 1);
        }
        if (leftTile !== undefined) {
          this.fitTiles(tile, leftTile, nowShape, leftShape, 2);
        }
        if (rightTile !== undefined) {
          this.fitTiles(tile, rightTile, nowShape, rightShape, 3);
        }
      };
    });
  }
  fitTiles(
    nowTile: any,
    preTile: any,
    _nowShape: any,
    _preShape: any,
    dir: number
  ) {
    const range = this.config.tileWidth;
    const yChange = this.findYChange(_nowShape, _preShape);
    const xChange = this.findXChange(_nowShape, _preShape);
    const xUp = this.findXUp(_nowShape, _preShape);
    switch (dir) {
      case 0: //상
        if (
          preTile.position._y - nowTile.position._y < range &&
          preTile.position._y - nowTile.position._y > -range &&
          Math.abs(nowTile.position._x - preTile.position._x) < 10
        ) {
          nowTile.position = new Point(
            preTile.position._x + xUp,
            preTile.position._y + this.config.tileWidth
          );
          this.uniteTiles(nowTile, preTile);
        }
        break;
      case 1: //하
        if (
          nowTile.position._y - preTile.position._y < range &&
          nowTile.position._y - preTile.position._y > -range &&
          Math.abs(nowTile.position._x - preTile.position._x) < 10
        ) {
          nowTile.position = new Point(
            preTile.position._x + xUp,
            preTile.position._y - (this.config.tileWidth + yChange)
          );
          this.uniteTiles(nowTile, preTile);
        }
        break;
      case 2: //좌
        if (
          nowTile.position._x - preTile.position._x < range &&
          nowTile.position._x - preTile.position._x > -range &&
          Math.abs(nowTile.position._y - preTile.position._y) < 10
        ) {
          nowTile.position = new Point(
            preTile.position._x + this.config.tileWidth + xChange,
            preTile.position._y + yChange
          );
          this.uniteTiles(nowTile, preTile);
        }
        break;
      case 3: //우
        if (
          preTile.position._x - nowTile.position._x < range &&
          preTile.position._x - nowTile.position._x > -range &&
          Math.abs(nowTile.position._y - preTile.position._y) < 10
        ) {
          nowTile.position = new Point(
            preTile.position._x - (this.config.tileWidth + xChange),
            preTile.position._y + yChange
          );
          this.uniteTiles(nowTile, preTile);
        }
        break;
    }
  }
  findXUp(_nowShape: any, _preShape: any) {
    let xUP = 0;
    const nL = _nowShape.leftTab;
    const nR = _nowShape.rightTab;
    const pL = _preShape.leftTab;
    const pR = _preShape.rightTab;
    if (nL !== pL || nR !== pR) {
      if (nR === 0) {
        if (nL === -1) {
          xUP = 5;
        } else {
          xUP = -5;
        }
      } else if (nR === 1 && pR === 1) {
        if (nL === -1) {
          xUP = 5;
        } else {
          xUP = -5;
        }
      } else if (nR === 1 && pR === -1) {
        if (nL === pL) {
          xUP = 5;
        } else {
          xUP = 10;
        }
      } else if (nR === -1 && pR === 1) {
        if (nL === pL) {
          xUP = -5;
        } else {
          xUP = -10;
        }
      } else {
        if (nL < pL) {
          xUP = 5;
        } else {
          xUP = -5;
        }
      }
    }
    return xUP;
  }
  findYChange(_nowShape: any, _preShape: any) {
    let yChange = 0;
    if (
      _nowShape.topTab !== _preShape.topTab ||
      _nowShape.bottomTab !== _preShape.bottomTab
    ) {
      if (_nowShape.topTab === 0 && _preShape.topTab === 0) {
        if (_nowShape.bottomTab > _preShape.bottomTab) {
          yChange = 5;
        } else {
          yChange = -5;
        }
      } else if (_nowShape.bottomTab === 0 && _preShape.bottomTab === 0) {
        if (_nowShape.topTab < _preShape.topTab) {
          yChange = 5;
        } else {
          yChange = -5;
        }
      } else if (_nowShape.bottomTab === 1 && _preShape.bottomTab === 1) {
        if (_nowShape.topTab < _preShape.topTab) {
          yChange = 5;
        } else {
          yChange = -5;
        }
      } else if (_nowShape.bottomTab === -1 && _preShape.bottomTab === -1) {
        if (_nowShape.topTab < _preShape.topTab) {
          yChange = 5;
        } else {
          yChange = -5;
        }
      } else if (_nowShape.bottomTab === -1 && _preShape.bottomTab === 1) {
        yChange = -5;
      } else if (_nowShape.bottomTab === 1 && _preShape.bottomTab === -1) {
        yChange = 5;
      }
    }
    return yChange;
  }
  findXChange(_nowShape: any, _preShape: any) {
    const sum =
      _nowShape.leftTab +
      _nowShape.rightTab +
      _preShape.leftTab +
      _preShape.rightTab;
    if (sum === -1) {
      return -10;
    } else if (sum === -2) {
      return -7;
    } else if (sum === 0) {
      return 0;
    } else if (sum === 2) {
      return 5;
    } else {
      return -5;
    }
  }
  uniteTiles(nowTile: any, preTile: any) {
    let nowIndex =
      nowTile.index -
      (this.config.tilesPerRow * this.config.tilesPerColumn + 1);
    let preIndex =
      preTile.index -
      (this.config.tilesPerRow * this.config.tilesPerColumn + 1);
    let nowGroup = this.groupTiles[nowIndex][1];
    let preGroup = this.groupTiles[preIndex][1];
    if (nowGroup !== undefined) {
      if (preGroup === undefined) {
        this.groupTiles[preIndex][1] = nowGroup;
      } else {
        this.groupTiles.forEach((gtile) => {
          if (gtile[1] === nowGroup) {
            gtile[1] = preGroup;
          }
        });
      }
    } else {
      if (preGroup !== undefined) {
        this.groupTiles[nowIndex][1] = preGroup;
      } else {
        this.groupTiles[nowIndex][1] = this.groupTileIndex;
        this.groupTiles[preIndex][1] = this.groupTileIndex;
        this.groupTileIndex++;
      }
    }
    if (this.checkComplete()) {
      console.log("퍼즐 완성");
    }
  }
  checkComplete() {
    let flag = true;
    this.groupTiles.forEach((gtile) => {
      if (gtile[1] === undefined) {
        flag = false;
      }
    });
    return flag;
  }
  getRandomShapes() {
    const width = this.config.tilesPerRow;
    const height = this.config.tilesPerColumn;
    const shapeArray = [];

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        let topTab: undefined | number;
        let rightTab: undefined | number;
        let bottomTab: undefined | number;
        let leftTab: undefined | number;

        if (y === 0) topTab = 0;
        if (y === height - 1) bottomTab = 0;
        if (x === 0) leftTab = 0;
        if (x === width - 1) rightTab = 0;

        shapeArray.push({
          topTab: topTab,
          rightTab: rightTab,
          bottomTab: bottomTab,
          leftTab: leftTab,
        });
      }
    }

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const shape = shapeArray[y * width + x];

        const shapeRight =
          x < width - 1 ? shapeArray[y * width + (x + 1)] : undefined;

        const shapeBottom =
          y < height - 1 ? shapeArray[(y + 1) * width + x] : undefined;

        shape.rightTab =
          x < width - 1 ? this.getRandomTabValue() : shape.rightTab;

        if (shapeRight && shape.rightTab !== undefined)
          shapeRight.leftTab = -shape.rightTab;

        shape.bottomTab =
          y < height - 1 ? this.getRandomTabValue() : shape.bottomTab;

        if (shapeBottom && shape.bottomTab !== undefined)
          shapeBottom.topTab = -shape.bottomTab;
      }
    }

    return shapeArray;
  }
  getRandomTabValue() {
    return Math.pow(-1, Math.floor(Math.random() * 2));
  }
  getMask(
    tileRatio: number,
    topTab: number | undefined,
    rightTab: number | undefined,
    bottomTab: number | undefined,
    leftTab: number | undefined,
    tileWidth: number
  ) {
    if (
      topTab === undefined ||
      rightTab === undefined ||
      bottomTab === undefined ||
      leftTab === undefined
    )
      return;

    const curvyCoords = [
      0, 0, 35, 15, 37, 5, 37, 5, 40, 0, 38, -5, 38, -5, 20, -20, 50, -20, 50,
      -20, 80, -20, 62, -5, 62, -5, 60, 0, 63, 5, 63, 5, 65, 15, 100, 0,
    ];

    const mask = new this.project.Path();
    //const tileCenter = this.project.view.center;
    const topLeftEdge = new Point(
      -this.config.imgWidth / 2,
      -this.config.imgHeight / 2
    );

    mask.moveTo(topLeftEdge);
    //Top
    for (let i = 0; i < curvyCoords.length / 6; i++) {
      const p1 = new Point(
        topLeftEdge.x + curvyCoords[i * 6 + 0] * tileRatio,
        topLeftEdge.y + topTab * curvyCoords[i * 6 + 1] * tileRatio
      );

      const p2 = new Point(
        topLeftEdge.x + curvyCoords[i * 6 + 2] * tileRatio,
        topLeftEdge.y + topTab * curvyCoords[i * 6 + 3] * tileRatio
      );

      const p3 = new Point(
        topLeftEdge.x + curvyCoords[i * 6 + 4] * tileRatio,
        topLeftEdge.y + topTab * curvyCoords[i * 6 + 5] * tileRatio
      );

      mask.cubicCurveTo(p1, p2, p3); // 곡선의 첫점, 중앙점, 끝점
    }

    //Right
    const topRightEdge = new Point(topLeftEdge.x + tileWidth, topLeftEdge.y);
    for (let i = 0; i < curvyCoords.length / 6; i++) {
      const p1 = new Point(
        topRightEdge.x - rightTab * curvyCoords[i * 6 + 1] * tileRatio,
        topRightEdge.y + curvyCoords[i * 6 + 0] * tileRatio
      );
      const p2 = new Point(
        topRightEdge.x - rightTab * curvyCoords[i * 6 + 3] * tileRatio,
        topRightEdge.y + curvyCoords[i * 6 + 2] * tileRatio
      );
      const p3 = new Point(
        topRightEdge.x - rightTab * curvyCoords[i * 6 + 5] * tileRatio,
        topRightEdge.y + curvyCoords[i * 6 + 4] * tileRatio
      );

      mask.cubicCurveTo(p1, p2, p3);
    }

    //Bottom
    const bottomRightEdge = new Point(
      topRightEdge.x,
      topRightEdge.y + tileWidth
    );
    for (let i = 0; i < curvyCoords.length / 6; i++) {
      const p1 = new Point(
        bottomRightEdge.x - curvyCoords[i * 6 + 0] * tileRatio,
        bottomRightEdge.y - bottomTab * curvyCoords[i * 6 + 1] * tileRatio
      );
      const p2 = new Point(
        bottomRightEdge.x - curvyCoords[i * 6 + 2] * tileRatio,
        bottomRightEdge.y - bottomTab * curvyCoords[i * 6 + 3] * tileRatio
      );
      const p3 = new Point(
        bottomRightEdge.x - curvyCoords[i * 6 + 4] * tileRatio,
        bottomRightEdge.y - bottomTab * curvyCoords[i * 6 + 5] * tileRatio
      );

      mask.cubicCurveTo(p1, p2, p3);
    }

    //Left
    const bottomLeftEdge = new Point(
      bottomRightEdge.x - tileWidth,
      bottomRightEdge.y
    );
    for (let i = 0; i < curvyCoords.length / 6; i++) {
      const p1 = new Point(
        bottomLeftEdge.x + leftTab * curvyCoords[i * 6 + 1] * tileRatio,
        bottomLeftEdge.y - curvyCoords[i * 6 + 0] * tileRatio
      );
      const p2 = new Point(
        bottomLeftEdge.x + leftTab * curvyCoords[i * 6 + 3] * tileRatio,
        bottomLeftEdge.y - curvyCoords[i * 6 + 2] * tileRatio
      );
      const p3 = new Point(
        bottomLeftEdge.x + leftTab * curvyCoords[i * 6 + 5] * tileRatio,
        bottomLeftEdge.y - curvyCoords[i * 6 + 4] * tileRatio
      );

      mask.cubicCurveTo(p1, p2, p3);
    }

    return mask;
  }
  getTileRaster(sourceRaster: paper.Raster, size: any, offset: any) {
    const targetRaster = new this.project.Raster("empty");
    targetRaster.scale(this.config.imgWidth / this.config.originWidth + 0.1);
    targetRaster.position = new Point(-offset.x, -offset.y);

    return targetRaster;
  }
}

export default Puzzle;
