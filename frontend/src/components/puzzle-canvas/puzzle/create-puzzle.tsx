createTiles() {
    const xTileCount = this.config.tilesPerRow;
    const yTileCount = this.config.tilesPerColumn;
    const tileRatio = this.config.tileWidth / 100.0;
    const tileIndexes = [];
    this.getRandomShapes();
    for (let y = 0; y < yTileCount; y++) {
      for (let x = 0; x < xTileCount; x++) {
        const shape = this.shapes[y * xTileCount + x];

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

  }