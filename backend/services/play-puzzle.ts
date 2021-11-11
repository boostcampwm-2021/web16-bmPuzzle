import puzzleService from '@services/db/puzzle-service';

const roomURL = new Set<string>();

const getPuzzleInfo = async (req: any, res: any, next: any) => {
  const puzzleID = Number(req.params.puzzleID);
  const puzzleInfo = await puzzleService.getPuzzleByID(puzzleID);
  if (puzzleInfo.code === 500) res.status(500);
  else {
    const updatedVisitTime = await puzzleService.updateVisitTime(puzzleID);
    if (updatedVisitTime.code === 500) console.log('조회수 증가 실패');
    res.status(200).json({
      img: puzzleInfo.image,
      level: puzzleInfo.level,
    });
  }
};

const checkURL = (req: any, res: any) => {
  let findValidURL = true;
  let randomAddress = '';
  // while (findValidURL) {
  //   randomAddress = Math.random().toString(36).substr(2, 11);
  //   findValidURL = roomURL.has(randomAddress);
  // }
  randomAddress = Math.random().toString(36).substr(2, 11);
  roomURL.add(randomAddress);
  res.status(200).json({ validURL: randomAddress });
};

export { getPuzzleInfo, checkURL };
