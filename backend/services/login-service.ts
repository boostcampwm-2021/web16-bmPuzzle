import userService from '@services/db/user-service';

const loginService = async (req:any, res:any, next:any) => {
    const id = req.body.id;
    const statusCode = await userService(id);

    res.status(statusCode.code).json(statusCode.msg);
}
export default loginService;