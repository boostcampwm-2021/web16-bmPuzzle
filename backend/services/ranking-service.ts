import userService from '@services/db/user-service';

const rankingService = async (req: any, res: any, next: any) => {
  const rank = await userService.getCompleteData();

  res.status(200).json({ rank: rank });
};
export default rankingService;
