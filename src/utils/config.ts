import nconf from 'nconf';
import path from 'path';

export const conf = nconf
  .argv()
  .env()
  .file('default', path.resolve(process.cwd(), 'config/default.json'));
