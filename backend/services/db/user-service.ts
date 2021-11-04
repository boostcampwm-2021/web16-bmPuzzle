import db from '@models/index';

const postData = async (id: string) => {
  const [userInfo, created] = await db.User.findOrCreate({
    where: { id: id },
    defaults: { complete: 0, upload: 0 },
  });

  if(userInfo == null) return {code: 500, msg: 'user find error'};

  return {code: 200, msg: 'findorcreate user'};
};

export default postData;
