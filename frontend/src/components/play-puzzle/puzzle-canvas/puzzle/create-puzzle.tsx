import { Point } from "paper/dist/paper-core";
import Puzzle from "@src/components/play-puzzle/puzzle-canvas/puzzle/index";

export const createTiles = () => {
  console.log(Puzzle.exportConfig());
  //const xTileCount=
  /*const tileRatio = tileWidth / 100.0;
    const tileIndexes = [];
    const shape=getRandomShapes(xTileCount,yTileCount);
    for (let y = 0; y < yTileCount; y++) {
      for (let x = 0; x < xTileCount; x++) {
        const mask = getMask(
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

  }

const getRandomShapes=(width: number, height: number)=> {

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

        this.shapes.push({
          topTab: topTab,
          rightTab: rightTab,
          bottomTab: bottomTab,
          leftTab: leftTab,
        });
      }
    }

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const shape = this.shapes[y * width + x];

        const shapeRight =
          x < width - 1 ? this.shapes[y * width + (x + 1)] : undefined;

        const shapeBottom =
          y < height - 1 ? this.shapes[(y + 1) * width + x] : undefined;

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
  }
  getRandomTabValue() {
    return Math.pow(-1, Math.floor(Math.random() * 2));
  }
  const getMask=(
    tileRatio: number,
    topTab: number | undefined,
    rightTab: number | undefined,
    bottomTab: number | undefined,
    leftTab: number | undefined,
    tileWidth: number
  )=> {
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
  */
};
