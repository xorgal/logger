# Logger

Logger is a simple and flexible, customizable logging utility for JavaScript applications.

## Features

- Severity Levels: Log messages at different severity levels such as debug, info, warn and error.
- Timestamps: Each log message can optionally be prefixed with a timestamp.
- Log Levels: You can specify a log level to filter out log messages below a certain severity.
- Customizable Formatting: Use the 'align' parameter to format log messages. Add colors to the log level label with the 'colorize' option.
- Easy to Use: Simply import the `Logger` class and create a new logger with your desired settings.

## Installation

To install Logger, you can use npm, yarn or pnpm:

```shell
npm install @xorgal/logger
```

with yarn

```shell
yarn add @xorgal/logger
```

with pnpm

```shell
pnpm add @xorgal/logger
```

## Usage

Creating a logger and logging a message:

```javascript
import { Logger, LogLevel } from '@xorgal/logger';
```

Set minimum log level:

```javascript
const log = new Logger({ level: LogLevel.info });
log.info('Hello, Logger!');
```

Add timestamps:

```javascript
const log = new Logger({ level: LogLevel.debug, timestamp: true, includeLevel: true });
log.debug('This is debug message with timestamp and log level.');

// Output:
// 2023-09-29T10:57:24.803Z [debug] This is debug message with timestamp and log level.
```

Log levels:

```javascript
enum LogLevel {
    debug = 0,
    info = 1,
    warn = 2,
    error = 3
}
```

Optional settings:

```typescript
interface ILoggerSettingsParams {
  level?: LogLevel; // Set minimum log level
  timestamp?: boolean; // Prefix log messages with timestamp
  includeLevel?: boolean; // Print log level
  align?: boolean; // Align all messages
  colorize?: boolean; // Use colors
}
```

## License

Logger is licensed under the MIT license. See the [LICENSE](https://github.com/xorgal/logger/blob/main/LICENSE) file for more info.
