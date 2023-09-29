export enum LogLevel {
  debug = 0,
  info = 1,
  warn = 2,
  error = 3,
}

export interface ILoggerSettingsParams {
  level?: LogLevel;
  timestamp?: boolean;
  includeLevel?: boolean;
  align?: boolean;
  colorize?: boolean;
}

export class Logger {
  level: LogLevel;
  timestamp: boolean;
  includeLevel: boolean;
  align: boolean;
  colorize: boolean;

  constructor(settings?: ILoggerSettingsParams) {
    this.level = settings?.level ?? LogLevel.debug;
    this.timestamp = settings?.timestamp ?? false;
    this.includeLevel = settings?.includeLevel ?? false;
    this.align = settings?.align ?? false;
    this.colorize = settings?.colorize ?? false;
  }

  private getLevelStr(level: LogLevel): string {
    switch (level) {
      case LogLevel.debug:
        return 'debug';
      case LogLevel.info:
        return 'info';
      case LogLevel.warn:
        return 'warn';
      case LogLevel.error:
        return 'error';
    }
  }

  private getColorCode(level: LogLevel): string {
    switch (level) {
      case LogLevel.debug:
        return '\x1b[1m\x1b[34m'; // bold blue
      case LogLevel.info:
        return '\x1b[1m\x1b[32m'; // bold green
      case LogLevel.warn:
        return '\x1b[1m\x1b[33m'; // bold yellow
      case LogLevel.error:
        return '\x1b[1m\x1b[31m'; // bold red
    }
  }

  private getLogFunction(level: LogLevel): (message?: any, ...optionalParams: any[]) => void {
    switch (level) {
      case LogLevel.debug:
        return console.debug;
      case LogLevel.info:
        return console.info;
      case LogLevel.warn:
        return console.warn;
      case LogLevel.error:
        return console.error;
    }
  }

  private getTimestampPrefix(): string {
    return new Date().toISOString();
  }

  private log(level: LogLevel, message?: any, ...optionalParams: any[]) {
    if (this.level > level) return;

    const levelStr = this.getLevelStr(level);
    const colorCode = this.getColorCode(level);
    const logf = this.getLogFunction(level);

    let prefix = '';
    const resetCode = '\x1b[0m';

    if (this.timestamp) {
      prefix += this.getTimestampPrefix() + ' ';
    }

    if (this.includeLevel) {
      let formattedLevel = `[${levelStr}]`;

      if (this.align) {
        formattedLevel = formattedLevel.padEnd(7);
      }

      if (this.colorize) {
        formattedLevel = formattedLevel.replace(levelStr, `${colorCode}${levelStr}${resetCode}`);
      }

      prefix += `${formattedLevel} `;
    }

    if (typeof message === 'string') {
      message = prefix + message;
    } else {
      optionalParams.unshift(message);
      message = prefix;
    }

    logf(message, ...optionalParams);
  }

  debug(message?: any, ...optionalParams: any[]) {
    this.log(LogLevel.debug, message, ...optionalParams);
  }
  info(message?: any, ...optionalParams: any[]) {
    this.log(LogLevel.info, message, ...optionalParams);
  }
  warn(message?: any, ...optionalParams: any[]) {
    this.log(LogLevel.warn, message, ...optionalParams);
  }
  error(message?: any, ...optionalParams: any[]) {
    this.log(LogLevel.error, message, ...optionalParams);
  }
}
