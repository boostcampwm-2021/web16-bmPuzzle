import userService from '@services/db/userService';

const loginService = async (req:any, res:any, next:any) => {
    const id = req.body.id;
    const statusCode = await userService(id);

    res.json(statusCode);
}
export default loginService;