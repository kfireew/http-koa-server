import nconf from 'nconf';
import path from 'path';

export const conf = nconf
  .argv()
  .env()
  .file('default', path.resolve(process.cwd(), 'config/default.json'));
const env = nconf.get('NODE_ENV') || 'development';
nconf.file('env', path.join(__dirname, `${env}.json`));
