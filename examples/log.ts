import { Logger } from '../src';

let log = new Logger({});
log.info('This is log message.');

log = new Logger({ timestamp: true });
log.info('This is log message with timestamp.');

log = new Logger({ timestamp: true, includeLevel: true });
log.debug('This is debug message with timestamp and log level.');

log = new Logger({ timestamp: true, includeLevel: true, colorize: true });
log.error('This is error message with timestamp and colorized log level.');

log = new Logger({ timestamp: true, includeLevel: true, colorize: true, align: true });
log.info('This is log message with timestamp and colorized log level as well.');
log.debug('And all lines are well aligned.');
