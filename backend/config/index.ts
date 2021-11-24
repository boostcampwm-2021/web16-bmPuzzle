import dotenv from 'dotenv';
import path from 'path';

import dbConfig from '@config/db';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const env = dotenv.config({
    path: path.resolve(
        process.cwd(),
        process.env.NODE_ENV == 'production' ? '.env' : '.env.dev'
    )
});

if(env.error){
    throw new Error("Coundln't find .env file");
}

export default {
    port: process.env.PORT,
    sequelize: dbConfig[process.env.NODE_ENV],
}