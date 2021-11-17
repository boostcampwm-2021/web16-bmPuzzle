import donePuzzleService from '@services/db/done-puzzle-service';
import userService from '@services/db/user-service';

const addUserComplete = async (req: any, res: any, next: any) => {
  const response = await userService.addComplete(req.body.userID);
  if (response.code == 500) res.status(response.code).json(response.code);
  next();
};

const postDonePuzzleData = async (req: any, res: any, next: any) => {
  const { userID, puzzleID, time } = req.body;
  const response = await donePuzzleService.getData(userID, puzzleID, time);

  let result;
  if (response.code == 200) {
    result =
      response.data.time > time
        ? await donePuzzleService.updateData(userID, puzzleID, time)
        : { code: 200, msg: 'not need update' };
  } else {
    result = await donePuzzleService.createData(userID, puzzleID, time);
  }

  res.status(result.code).json(result.msg);
};

export default { postDonePuzzleData, addUserComplete };
