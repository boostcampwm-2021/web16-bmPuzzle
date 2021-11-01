import expressLoader from './express';
const setting = async (expressApp: any) => {
  await expressLoader(expressApp);
};

export default setting;
