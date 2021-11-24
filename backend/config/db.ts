import path from 'path';
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const dotenv = require('dotenv').config({
  path: path.resolve(
    process.cwd(),
    process.env.NODE_ENV == 'production' ? '.env' : '.env.dev',
  ),
});

type configType = {
  [index: string]: any;
  development: any;
  production: any;
};

const config: configType = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
    host: process.env.DB_HOST,
    dialect: 'mysql',
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
    host: process.env.DB_HOST,
    dialect: 'mysql',
  },
};

export default config;
