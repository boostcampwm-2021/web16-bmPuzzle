const getImgfile = (imgurl: any, imgInfo: any) => {
  const img = imgurl.map(
    (ele: any) => `${process.env.REACT_APP_STATIC_URL}/${ele}`
  );

  imgInfo.map((ele: any, idx: number) => {
    ele.image = img[idx];
  });

  return imgInfo;
};

export default getImgfile;
