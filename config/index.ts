import configProd from './config.prod';
import configDev from './config.dev';

let isProEnv = process.env.NODE_ENV === 'production';
let config = isProEnv ? configProd : configDev;
module.exports = config;
