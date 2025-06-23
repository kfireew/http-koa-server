import log4js from 'log4js';
import { get } from '../../config/config';

log4js.configure({
  appenders: {
    console: { type: 'console' },
    file: { type: 'file', filename: get('LOG_FILE') },
  },
  categories: {
    default: { appenders: ['console', 'file'], level: get('LOG_LEVEL') },
  },
});

export const logger = log4js.getLogger();
