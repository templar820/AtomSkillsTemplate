import fs from 'fs';
import SequelizeErd from 'sequelize-erd';
import sequelize from './src/db.js';
import {User} from './src/models/User.js';

const svg = await SequelizeErd({source: sequelize});
fs.writeFileSync('./erd.svg', svg);