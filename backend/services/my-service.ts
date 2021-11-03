import searchService from '@services/db/puzzle-service';

const myService = async (req: any, res: any, next: any) => {
  const id = req.body.id;
  const puzzle = await searchService.myPuzzle(id);
  console.log(puzzle);
  res.status(200).json(puzzle);
};
export default myService;
