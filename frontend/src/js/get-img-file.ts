const getImgfile = async (imgurl: any, imgInfo: any) => {
  const img = imgurl.map(async (ele: any) => {
    return fetch(`${process.env.REACT_APP_STATIC_URL}/${ele}`)
      .then((res) => res.blob())
      .then((imgBlob) => URL.createObjectURL(imgBlob));
  });

  const imgBlob = await Promise.all(img.map((ele: any) => ele));
  imgInfo.forEach((ele: any, idx: number) => {
    ele.image = imgBlob[idx];
  });
  return imgInfo;
};

export default getImgfile;
