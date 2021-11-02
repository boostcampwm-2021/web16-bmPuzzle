import puzzle from '@models/puzzle';
import searchService from '@services/db/searchService';
import path from 'path';
import fs from 'fs';

const search = async (req:any, res:any, next:any) => {
    /*
    const puzzles = await searchService();
    puzzles.info.map((e: { image: any; })=>console.log(e.image));
    res.sendFile(path.join(__dirname,'../public','puzzle-icon.png')); 
    */
    const files = fs.readdirSync(path.join(path.resolve(), 'public'));
    Object.assign(req, {files : files});
    next();
}

const sendImgUrl = (req:any, res:any) => {
    res.status(200).json({
        code: 1000, message: 'Welldone.', data: req.files
    });
}
export default {search,sendImgUrl};