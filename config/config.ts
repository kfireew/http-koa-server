import nconf from 'nconf';
import path from 'path';

nconf.argv().env().file('default', path.join(__dirname, '../config/default.json'));
const env = nconf.get('NODE_ENV') || 'development';
nconf.file('env', path.join(__dirname, `${env}.json`));

export const nConf = nconf;
