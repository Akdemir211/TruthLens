export enum LogLevel {
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
  DEBUG = 'DEBUG'
}

class Logger {
  private log(level: LogLevel, message: string, data?: any) {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] [${level}] ${message}`;
    
    switch (level) {
      case LogLevel.ERROR:
        console.error(logMessage, data || '');
        break;
      case LogLevel.WARN:
        console.warn(logMessage, data || '');
        break;
      case LogLevel.DEBUG:
        if (process.env.NODE_ENV === 'development') {
          console.debug(logMessage, data || '');
        }
        break;
      default:
        console.log(logMessage, data || '');
    }
  }

  info(message: string, data?: any) {
    this.log(LogLevel.INFO, message, data);
  }

  warn(message: string, data?: any) {
    this.log(LogLevel.WARN, message, data);
  }

  error(message: string, data?: any) {
    this.log(LogLevel.ERROR, message, data);
  }

  debug(message: string, data?: any) {
    this.log(LogLevel.DEBUG, message, data);
  }
}

export const logger = new Logger();
export default logger;
