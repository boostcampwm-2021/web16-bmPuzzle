import puzzle from '@models/puzzle';
import searchService from '@services/db/searchService';

const loginService = async (req:any, res:any, next:any) => {
    const puzzles = await searchService();
    console.log(puzzles.info)
    res.json(puzzles.info);
}
export default loginService;