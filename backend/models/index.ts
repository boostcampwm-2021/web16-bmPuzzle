import { Sequelize } from 'sequelize';

import config from '@config/index';
import User from '@models/user';
import Puzzle from '@models/puzzle';
import DonePuzzle from '@models/done-puzzle';

const db:any = {};

const sequelize = new Sequelize(config.sequelize.database,
	config.sequelize.username,
	config.sequelize.password,
	{
		host: config.sequelize.host,
		dialect: config.sequelize.dialect,
		dialectOptions: {
			charset: 'utf8',
			collate: 'utf8_general_ci',
		}
	},
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = User(sequelize, Sequelize);
db.Puzzle = Puzzle(sequelize, Sequelize);
db.DonePuzzle = DonePuzzle(sequelize, Sequelize);

export default db;
