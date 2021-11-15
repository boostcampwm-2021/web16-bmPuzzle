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
  findNearTile() {
    const xTileCount = this.config.tilesPerRow;
    const yTileCount = this.config.tilesPerColumn;
    this.tiles.forEach((tile) => {
      tile.onMouseUp = (event: any) => {
        const nowIndex = tile.index - (xTileCount * yTileCount + 1);
        let leftTile, rightTile, upTile, downTile;
        let leftShape, rightShape, upShape, downShape;
        const nowShape = this.shapes[nowIndex];
        if (nowIndex % xTileCount === 0) {
          if (
            this.groupTiles[nowIndex - 1] !== undefined &&
            this.groupTiles[nowIndex] !== undefined
          ) {
            if (
              this.groupTiles[nowIndex][1] !== undefined &&
              this.groupTiles[nowIndex - 1][1] === this.groupTiles[nowIndex][1]
            ) {
              leftTile = undefined;
            }
          }
          leftTile = undefined;
        } else {
          leftTile = this.tiles[nowIndex - 1];
          leftShape = this.shapes[nowIndex - 1];
        }
        if (nowIndex % xTileCount === 2) {
          if (
            this.groupTiles[nowIndex + 1] !== undefined &&
            this.groupTiles[nowIndex] !== undefined
          ) {
            if (
              this.groupTiles[nowIndex][1] !== undefined &&
              this.groupTiles[nowIndex + 1][1] === this.groupTiles[nowIndex][1]
            ) {
              rightTile = undefined;
            }
          }
          rightTile = undefined;
        } else {
          rightTile = this.tiles[nowIndex + 1];
          rightShape = this.shapes[nowIndex + 1];
        }
        if (nowIndex < xTileCount) {
          if (
            this.groupTiles[nowIndex - xTileCount] !== undefined &&
            this.groupTiles[nowIndex] !== undefined
          ) {
            if (
              this.groupTiles[nowIndex][1] !== undefined &&
              this.groupTiles[nowIndex - xTileCount][1] ===
                this.groupTiles[nowIndex][1]
            ) {
              upTile = undefined;
            }
          }
          upTile = undefined;
        } else {
          upTile = this.tiles[nowIndex - xTileCount];
          upShape = this.shapes[nowIndex - xTileCount];
        }
        if (nowIndex >= xTileCount * (yTileCount - 1)) {
          if (
            this.groupTiles[nowIndex + xTileCount] !== undefined &&
            this.groupTiles[nowIndex] !== undefined
          ) {
            if (
              this.groupTiles[nowIndex][1] !== undefined &&
              this.groupTiles[nowIndex + xTileCount][1] ===
                this.groupTiles[nowIndex][1]
            ) {
              downTile = undefined;
            }
          }
          downTile = undefined;
        } else {
          downTile = this.tiles[nowIndex + xTileCount];
          downShape = this.shapes[nowIndex + xTileCount];
        }
        if (upTile !== undefined) {
          this.fitTiles(tile, upTile, nowShape, upShape, 0, true);
        }
        if (downTile !== undefined) {
          this.fitTiles(tile, downTile, nowShape, downShape, 1, true);
        }
        if (leftTile !== undefined) {
          this.fitTiles(tile, leftTile, nowShape, leftShape, 2, true);
        }
        if (rightTile !== undefined) {
          this.fitTiles(tile, rightTile, nowShape, rightShape, 3, true);
        }
      };
    });
  }
  fitTiles(
    nowTile: any,
    preTile: any,
    _nowShape: any,
    _preShape: any,
    dir: number,
    flag: boolean
  ) {
    const range = this.config.tileWidth;
    const yChange = this.findYChange(_nowShape, _preShape);
    const xChange = this.findXChange(_nowShape, _preShape);
    const xUp = this.findXUp(_nowShape, _preShape);
    const yUp = this.findYUp(_nowShape, _preShape);
    switch (dir) {
      case 0: //상
        if (
          (preTile.position._y - nowTile.position._y < range &&
            preTile.position._y - nowTile.position._y > -range &&
            Math.abs(nowTile.position._x - preTile.position._x) < 10) ||
          flag === false
        ) {
          nowTile.position = new Point(
            preTile.position._x + xUp,
            preTile.position._y + this.config.tileWidth + yUp
          );
          if (flag === true) {
            this.uniteTiles(nowTile, preTile);
          }
        }
        break;
      case 1: //하
        if (
          (nowTile.position._y - preTile.position._y < range &&
            nowTile.position._y - preTile.position._y > -range &&
            Math.abs(nowTile.position._x - preTile.position._x) < 10) ||
          flag === false
        ) {
          nowTile.position = new Point(
            preTile.position._x + xUp,
            preTile.position._y - (this.config.tileWidth + yUp)
          );
          if (flag === true) {
            this.uniteTiles(nowTile, preTile);
          }
        }
        break;
      case 2: //좌
        if (
          (nowTile.position._x - preTile.position._x < range &&
            nowTile.position._x - preTile.position._x > -range &&
            Math.abs(nowTile.position._y - preTile.position._y) < 10) ||
          flag === false
        ) {
          nowTile.position = new Point(
            preTile.position._x + this.config.tileWidth + xChange,
            preTile.position._y + yChange
          );
          if (flag === true) {
            this.uniteTiles(nowTile, preTile);
          }
        }
        break;
      case 3: //우
        if (
          (preTile.position._x - nowTile.position._x < range &&
            preTile.position._x - nowTile.position._x > -range &&
            Math.abs(nowTile.position._y - preTile.position._y) < 10) ||
          flag === false
        ) {
          nowTile.position = new Point(
            preTile.position._x - (this.config.tileWidth + xChange),
            preTile.position._y + yChange
          );
          if (flag === true) {
            this.uniteTiles(nowTile, preTile);
          }
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
    if (nL === pL && nR === pR) {
      xUP = 0;
    } else if (nL === nR && pL === pR) {
      xUP = 0;
    } else {
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
  findYUp(_nowShape: any, _preShape: any) {
    let yUp = 0;
    const sum =
      _nowShape.topTab +
      _nowShape.bottomTab +
      _preShape.topTab +
      _preShape.bottomTab;

    if (sum === 1 || sum === -2) yUp = -5;
    else if (sum === 2) yUp = 5;
    else if (sum === -1) yUp = -10;

    return yUp;
  }

  findYChange(_nowShape: any, _preShape: any) {
    let yChange = 0;
    const nT = _nowShape.topTab;
    const nB = _nowShape.bottomTab;
    const pT = _preShape.topTab;
    const pB = _preShape.bottomTab;
    if (nT === pT && nB === pB) {
      yChange = 0;
    } else if (nT === nB && pT === pB) {
      yChange = 0;
    } else {
      if (nT === 0) {
        if (nB > pB) {
          yChange = 5;
        } else {
          yChange = -5;
        }
      } else if (nB === 0) {
        if (nT < pT) {
          yChange = 5;
        } else {
          yChange = -5;
        }
      } else if (pT === 1 && nB === 1) {
        yChange = 5;
      } else if (pT === -1 && nB === -1) {
        yChange = -5;
      } else {
        const sum = nT + nB + pT + pB;
        if (sum === -1) {
          yChange = 5;
        } else {
          yChange = -5;
        }
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
    this.groupFit(this.groupTiles[preIndex][1]);
    if (this.checkComplete() && !this.complete) {
      window.alert("퍼즐 완성");
      this.complete = true;
    }
    this.groupFit(this.groupTiles[preIndex][1]);
  }
  groupFit(nowGroup: number) {
    const xTileCount = this.config.tilesPerRow;
    const yTileCount = this.config.tilesPerColumn;
    let groupArr: any = [];
    let groupObj: any = {};
    this.groupTiles.forEach((tile: any) => {
      if (tile[1] === nowGroup) {
        const nowIndex = tile[0].index - (xTileCount * yTileCount + 1);
        groupArr.push(tile[0]);
        groupObj[nowIndex] = tile[0];
      }
    });

    groupArr.forEach((tile: any) => {
      const nowIndex = tile.index - (xTileCount * yTileCount + 1);
      const up: number | undefined =
        nowIndex - xTileCount < 0 ? undefined : nowIndex - xTileCount;
      const left: number | undefined =
        nowIndex % xTileCount === 0 ? undefined : nowIndex - 1;
      const right: number | undefined =
        nowIndex % xTileCount === xTileCount - 1 ? undefined : nowIndex + 1;
      const down: number | undefined =
        nowIndex >= xTileCount * (yTileCount - 1)
          ? undefined
          : nowIndex + xTileCount;

      if (up !== undefined || left !== undefined || right !== undefined) {
        if (up !== undefined && groupObj[up] !== undefined) {
          this.fitTiles(
            tile,
            groupObj[up],
            this.shapes[nowIndex],
            this.shapes[up],
            0,
            false
          );
        } else if (left !== undefined && groupObj[left] !== undefined) {
          this.fitTiles(
            tile,
            groupObj[left],
            this.shapes[nowIndex],
            this.shapes[left],
            2,
            false
          );
        } else if (right !== undefined && groupObj[right] !== undefined) {
          this.fitTiles(
            tile,
            groupObj[right],
            this.shapes[nowIndex],
            this.shapes[right],
            3,
            false
          );
        } else if (down !== undefined && groupObj[down] !== undefined) {
          this.fitTiles(
            tile,
            groupObj[down],
            this.shapes[nowIndex],
            this.shapes[down],
            1,
            false
          );
        }
      }
    });
  }
  checkComplete() {
    let flag = true;
    if (this.groupTiles[0][1] !== undefined) {
      this.groupTiles.forEach((gtile) => {
        if (gtile[1] !== this.groupTiles[0][1]) {
          flag = false;
        }
      });
    } else {
      flag = false;
    }
    return flag;
  }