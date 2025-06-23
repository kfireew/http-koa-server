import nconf from 'nconf';
import path from 'path';

nconf
  .argv()
  .env(['PORT', 'MONGO_URI', 'LOG_FILE', 'LOG_LEVEL'])
  .file('default', path.join(__dirname, '../config/default.json'))
  .defaults({
    PORT: 3000,
    MONGO_URI: 'mongodb://localhost:27017/hafifa',
    LOG_FILE: './logs/app.log',
    LOG_LEVEL: 'debug',
  });
const env = nconf.get('NODE_ENV') || 'development';
nconf.file('env', path.join(__dirname, `${env}.json`));

export const get = (key: string) => {
  return nconf.get(key);
};
