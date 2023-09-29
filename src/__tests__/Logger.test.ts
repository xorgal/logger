import { Logger, LogLevel } from '../Logger';

describe('Logger', () => {
  let mockConsoleDebug: jest.SpyInstance;
  let mockConsoleInfo: jest.SpyInstance;
  let mockConsoleWarn: jest.SpyInstance;
  let mockConsoleError: jest.SpyInstance;

  // Set up spies on console logging functions
  beforeEach(() => {
    // Set up spies on console logging functions
    mockConsoleDebug = jest.spyOn(console, 'debug').mockImplementation(() => undefined);
    mockConsoleInfo = jest.spyOn(console, 'info').mockImplementation(() => undefined);
    mockConsoleWarn = jest.spyOn(console, 'warn').mockImplementation(() => undefined);
    mockConsoleError = jest.spyOn(console, 'error').mockImplementation(() => undefined);
  });

  afterEach(() => {
    // Clean up mocks after each test
    mockConsoleDebug.mockRestore();
    mockConsoleInfo.mockRestore();
    mockConsoleWarn.mockRestore();
    mockConsoleError.mockRestore();
  });

  it('logs info messages when level is info', () => {
    const logger = new Logger({ level: LogLevel.info });
    logger.info('Test info message');
    expect(mockConsoleInfo).toHaveBeenCalled();
  });

  it('logs warning messages when level is warning', () => {
    const logger = new Logger({ level: LogLevel.warn });
    logger.warn('Test warning message');
    expect(mockConsoleWarn).toHaveBeenCalled();
  });

  it('logs error messages when level is error', () => {
    const logger = new Logger({ level: LogLevel.error });
    logger.error('Test error message');
    expect(mockConsoleError).toHaveBeenCalled();
  });

  it('logs debug messages when level is debug', () => {
    const logger = new Logger({ level: LogLevel.debug });
    logger.debug('Test debug message');
    expect(mockConsoleDebug).toHaveBeenCalled();
  });

  it('does not log lower level messages when level is higher', () => {
    const logger = new Logger({ level: LogLevel.warn });
    logger.debug('Test debug message');
    logger.info('Test info message');
    expect(mockConsoleDebug).not.toHaveBeenCalled();
    expect(mockConsoleInfo).not.toHaveBeenCalled();
  });

  describe('Timestamped log messages', () => {
    it('should include a timestamp when timestamp is set to true', () => {
      const logger = new Logger({ timestamp: true });
      const testMessage = 'foobar';
      logger.debug(testMessage);
      const consoleOutput = mockConsoleDebug.mock.calls[0][0];
      expect(consoleOutput).toMatch(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z\sfoobar/);
    });
  });
});
