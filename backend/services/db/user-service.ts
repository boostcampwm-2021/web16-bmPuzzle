import db from '@models/index';

const postData = async (id: string) => {
  const [userInfo, created] = await db.User.findOrCreate({
    where: { id: id },
    defaults: { complete: 0, upload: 0 },
  });

  if (userInfo == null) return { code: 500, msg: 'user find error' };

  return { code: 200, msg: 'findorcreate user' };
};

const updateUploadData = async (id: string) => {
  const userInfo = await db.User.increment('upload', {
    by: 1,
    where: { id: id },
  });

  if (userInfo == null) return { code: 500, msg: 'user not find' };
};

const getCompleteData = async () => {
  const userInfo = await db.User.findAll({ order: [['complete', 'DESC']] });

  if (userInfo == null) return { code: 500, msg: 'user not find' };

  return userInfo;
};

export default { postData, updateUploadData, getCompleteData };
