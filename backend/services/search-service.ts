import puzzle from '@models/puzzle';
import searchService from '@services/db/search-service';
import path from 'path';
import fs from 'fs';

const search =(req:any, res:any, next:any) => {
    const files = fs.readdirSync(path.join(path.resolve(), 'public'));
    Object.assign(req, {files : files});
    next();
}

const sendImgUrl =  async (req:any, res:any) => {
    const puzzles = await searchService();
    let return_data: any[] = [];
    req.files.map((file: any)=>{
        const now_puzzle=puzzles.info.filter((puzzle: any) =>puzzle.image==file);
        return_data.push(now_puzzle);
    })
    res.status(200).json({
        code: 1000, message: 'Welldone.', data: return_data, file_name:req.files
    });
}
export default {search,sendImgUrl};