import searchService from '@services/db/puzzle-service';

const roomURL = new Set<string>();

const getPuzzleInfo = async (req: any, res: any, next: any) => {
  const puzzleInfo = await searchService.getPuzzleByID(req.params.puzzleID);
  if (puzzleInfo.code === 500) res.status(500);
  else {
    res.status(200).json({
      img: puzzleInfo.image,
      level: puzzleInfo.level,
    });
  }
};

const checkURL = (req: any, res: any) => {
  let findValidURL = true;
  let randomAddress = '';
  while (findValidURL) {
    randomAddress = Math.random().toString(36).substr(2, 11);
    findValidURL = roomURL.has(randomAddress);
  }
  roomURL.add(randomAddress);
  res.status(200).json({ validURL: randomAddress });
};

export { getPuzzleInfo, checkURL };
