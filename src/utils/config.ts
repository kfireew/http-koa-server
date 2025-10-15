import nconf from 'nconf';
import path from 'path';

export const conf = nconf
  .argv()
  .env()
  .file('default', path.join(__dirname, '../config/config.json'));
const env = nconf.get('NODE_ENV') || 'development';
nconf.file('env', path.join(__dirname, `${env}.json`));
