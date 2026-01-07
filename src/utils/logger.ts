import log4js from 'log4js';
import { conf } from './config';

log4js.configure({
  appenders: {
    console: { type: 'console' },
    file: { type: 'file', filename: conf.get('logFile') }
  },
  categories: {
    default: { appenders: ['console', 'file'], level: conf.get('logLevel') }
  }
});

export const logger = log4js.getLogger();
