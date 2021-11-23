type rawPuzzleInfo = {
  id: number;
  image: string;
  keyword: string;
  public: boolean;
  title: string;
  user_id: string;
  visit_time: number;
};
const getImgfile = (imgurl: string[], imgInfo: rawPuzzleInfo[]) => {
  const img = imgurl.map(
    (ele: string) => `${process.env.REACT_APP_STATIC_URL}/${ele}`
  );
  // eslint-disable-next-line array-callback-return
  imgInfo.map((ele: any, idx: number) => {
    ele.image = img[idx];
  });

  return imgInfo;
};

export default getImgfile;
