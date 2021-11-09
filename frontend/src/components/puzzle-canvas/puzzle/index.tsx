import { Point, Rectangle, Size, Matrix } from "paper/dist/paper-core";

const config = {
  zoomScaleOnDrag: 1.125,
  imgName: "puzzleImage",
  tileWidth: 100,
  tilesPerRow: 2,
  tilesPerColumn: 2,
  imgWidth: 256,
  imgHeight: 256,
  updateConfig: function (
    imgName: string,
    tileWidth: number,
    tilesPerRow: number,
    tilesPerColumn: number,
    imgWidth: number,
    imgHeight: number
  ) {
    this.imgName = imgName;
    this.tileWidth = tileWidth;
    this.tilesPerRow = tilesPerRow;
    this.tilesPerColumn = tilesPerColumn;
    this.imgWidth = imgWidth;
    this.imgHeight = imgHeight;
  },
};

class Puzzle {
  currentZoom = 1;
  project: any;
  level: number;
  zoomScaleOnDrag = config.zoomScaleOnDrag;
  imgName = config.imgName;
  imgWidth: any;
  imgHeight: any;
  puzzleImage: null | any;
  tileWidth = 100;
  tilesPerRow = Math.ceil(config.imgWidth / config.tileWidth);
  tilesPerColumn = Math.ceil(config.imgHeight / config.tileWidth);
  tileMarginWidth = 100 * 0.203125;
  selectedTile = undefined;
  selectedTileIndex = undefined;
  selectionGroup = undefined;
  constructor(project: any, img: any, level: number) {
    this.project = project;
    this.level = level;
    const imgId = img.current.id;
    const imgHeight = img.current.height;
    const imgWidth = img.current.width;
    this.imgWidth = imgWidth;
    this.imgHeight = imgHeight;
    const tileWidth = 100;
    const tilesPerRow = Math.floor(imgWidth / tileWidth);
    const tilesPerColumn = Math.floor(imgHeight / tileWidth);
    console.log(imgWidth, imgHeight, tileWidth, tilesPerRow, tilesPerColumn);
    config.updateConfig(
      imgId,
      tileWidth,
      tilesPerRow,
      tilesPerColumn,
      imgWidth,
      imgHeight
    );
    console.log(config);
    this.puzzleImage = new this.project.Raster({
      source: config.imgName,
      position: this.project.view.center,
    });
    this.puzzleImage.size = this.project.view.size;
    this.puzzleImage.scale(1);
    this.createTiles(config.tilesPerRow, config.tilesPerColumn);
  }

  createTiles(xTileCount: number, yTileCount: number) {
    const tiles = [];
    const tileRatio = config.tileWidth / 100.0;

    const shapeArray = this.getRandomShapes(xTileCount, yTileCount);
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
          config.tileWidth
        ); //path return
        mask.opacity = 0.25;
        mask.strokeColor = new this.project.Color(0, 0, 0);

        const cloneImg = this.puzzleImage.clone();
        const img = this.getTileRaster(
          cloneImg,
          new Size(config.tileWidth, config.tileWidth),
          new Point(config.tileWidth * x, config.tileWidth * y)
        ); //Raster 반환

        const border = mask.clone();
        border.strokeColor = new this.project.Color(255, 0, 0);
        border.strokeWidth = 5;

        const tile = new this.project.Group([mask, border, img, border]);
        tile.clipped = true;
        tile.opacity = 1;
        //tile.shape = shape;
        tile.position = new Point(100, 100);
        /*
        tile.onMouseEnter = (event: any) => {
          tile.scale(this.zoomScaleOnDrag);
        };
        tile.onMouseLeave = (event: any) => {
          tile.scale(1 / this.zoomScaleOnDrag);
        };*/
        tile.onMouseDrag = (event: any) => {
          tile.position = new Point(
            tile.position._x + event.delta.x,
            tile.position._y + event.delta.y
          );
        };

        tiles.push(tile);
        tileIndexes.push(tileIndexes.length);
      }
    }

    for (let y = 0; y < yTileCount; y++) {
      for (let x = 0; x < xTileCount; x++) {
        const index1 = Math.floor(Math.random() * tileIndexes.length);
        const index2 = tileIndexes[index1];
        const tile = tiles[index2];
        tileIndexes.splice(index1, 1);

        const position = new Point(
          this.project.view.center.x -
            (config.tileWidth +
              config.tileWidth *
                (x * 2 + (y % 2) + this.puzzleImage.size.width)),
          this.project.view.center.y -
            (config.tileWidth / 2 +
              config.tileWidth * y +
              this.puzzleImage.size.height / 2)
        );

        const cellPosition = new Point(
          Math.round(position.x / config.tileWidth) + 1,
          Math.round(position.y / config.tileWidth) + 1
        );

        tile.position = new Point(100, 100);
        //tile.cellPosition = cellPosition;
      }
    }

    return tiles;
  }

  getRandomShapes(width: number, height: number) {
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
    /*
    shape는 현재 퍼즐 조각, shapeRight는 오른쪽에 위치한 퍼즐조각
    shape가 맨 오른쪽이라면, shapeRight = undefined
    shape가 맨 오른쪽이 아니면, random으로 모양 생성 / 맨 오른쪽이면, 원래 가지고 있는 모양 (0) 적용
    shape가 맨 오른쪽이 아니면, shapeRight의 왼쪽면을 shape의 오른쪽면과 맞게 *(-1) 해줌
    이하 아래쪽도 마찬가지로 생성
    */

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
    const topLeftEdge = new Point(-config.imgWidth / 2, -config.imgHeight / 2);

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
    const topRightEdge = new Point(
      topLeftEdge.x + config.tileWidth,
      topLeftEdge.y
    );
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
      topRightEdge.y + config.tileWidth
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
      bottomRightEdge.x - config.tileWidth,
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
    targetRaster.position = new Point(-offset.x, -offset.y);
    return targetRaster;
  }
}

export default Puzzle;
