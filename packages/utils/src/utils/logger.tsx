/* eslint-disable no-console */
export enum LOGLEVEL {
  ALL = 'all',
  INFO = 'info',
  DEBUG = 'debug',
  WARN = 'warn',
  ERROR = 'error',
  OFF = 'off'
}
enum LOGTYPE {
  LOG = 'log',
  INFO = 'info',
  ASSERT = 'asset',
  TRACE = 'trace',
  TABLE = 'table',
  GROUP = 'group',
  GROUPCOLLAPSED = 'groupCollapsed',
  GROUPEND = 'groupEnd',
  COUNT = 'count',
  TIME = 'time',
  TIMEEND = 'timeEnd',
  CLEAR = 'clear',
  DEBUG = 'debug',
  WARN = 'warn',
  ERROR = 'error'
}

function wrap(logLevel: LOGLEVEL, name?: string, message?: any) {
  switch (logLevel) {
    case 'all':
      return [
        `%c ${name ? name : logLevel} %c ${message}`,
        'background: AliceBlue; border-radius: 0.25em; color: DimGrey; font-weight: 500; padding: 0.25em 0.1em;',
        'background: none; border-radius: none; color: auto; font-weight: normal; padding: none;'
      ];
    case 'info':
      return [
        `%c ${name ? name : logLevel} %c ${message}`,
        'background: DodgerBlue; border-radius: 0.25em; color: white; font-weight: 500; padding: 0.25em 0.1em;',
        'background: none; border-radius: none; color: auto; font-weight: normal; padding: none;'
      ];
    case 'debug':
      return [
        `%c ${name ? name : logLevel} %c ${message}`,
        'background: DarkViolet; border-radius: 0.25em; color: white; font-weight: 500; padding: 0.25em 0.1em;',
        'background: none; border-radius: none; color: auto; font-weight: normal; padding: none;'
      ];
    case 'warn':
      return [
        `%c ${name ? name : logLevel} %c ${message}`,
        'background: DarkOrange; border-radius: 0.25em; color: white; font-weight: 500; padding: 0.25em 0.1em;',
        'background: none; border-radius: none; color: auto; font-weight: normal; padding: none;'
      ];
    case 'error':
      return [
        `%c ${name ? name : logLevel} %c ${message}`,
        'background: Crimson; border-radius: 0.25em; color: white; font-weight: 500; padding: 0.25em 0.1em;',
        'background: none; border-radius: none; color: auto; font-weight: normal; padding: none;'
      ];
  }
}

export class Logger {
  readonly logLevel: LOGLEVEL;
  readonly logType: LOGTYPE;
  label?: any;

  constructor(label?: any, logLevel: LOGLEVEL = LOGLEVEL.INFO) {
    this.logLevel = logLevel;
    this.label = label;
  }

  private compare(constructorLevel: LOGLEVEL, initialLevel: LOGLEVEL) {
    const order = Object.values(LOGLEVEL);

    const constructorLevelIndex = order.indexOf(constructorLevel);
    const initialLevelIndex = order.indexOf(initialLevel);

    if (constructorLevelIndex < initialLevelIndex) {
      return 1;
    } else if (constructorLevelIndex > initialLevelIndex) {
      return -1;
    } else {
      return 0;
    }
  }

  public [LOGTYPE.ASSERT](value: any, message?: any): void {
    if (this.compare(this.logLevel, LOGLEVEL.ALL) >= 0) {
      return console.assert(value, message);
    }
  }

  public [LOGTYPE.CLEAR](): void {
    if (this.compare(this.logLevel, LOGLEVEL.OFF) >= 0) {
      return console.clear();
    }
  }

  public [LOGTYPE.COUNT](label?: any): void {
    if (this.compare(this.logLevel, LOGLEVEL.ALL) >= 0) {
      return console.count(label);
    }
  }

  public [LOGTYPE.DEBUG](message?: any, label?: string): void {
    if (this.compare(this.logLevel, LOGLEVEL.DEBUG) >= 0) {
      return console.debug(
        ...wrap(LOGLEVEL.DEBUG, label ? label : this.label, message)
      );
    }
  }

  public [LOGTYPE.ERROR](message?: any, label?: string): void {
    if (this.compare(this.logLevel, LOGLEVEL.ERROR) >= 0) {
      return console.error(
        ...wrap(LOGLEVEL.ERROR, label ? label : this.label, message)
      );
    }
  }

  public [LOGTYPE.GROUP](message?: any, label?: string): void {
    if (this.compare(this.logLevel, LOGLEVEL.ALL) >= 0) {
      return console.group(
        ...wrap(LOGLEVEL.ALL, label ? label : this.label, message)
      );
    }
  }

  public [LOGTYPE.GROUPCOLLAPSED](message?: any, label?: string): void {
    if (this.compare(this.logLevel, LOGLEVEL.ALL) >= 0) {
      return console.groupCollapsed(
        ...wrap(LOGLEVEL.ALL, label ? label : this.label, message)
      );
    }
  }

  public [LOGTYPE.GROUPEND](): void {
    if (this.compare(this.logLevel, LOGLEVEL.ALL) >= 0) {
      return console.groupEnd();
    }
  }

  public [LOGTYPE.INFO](message?: any): void {
    if (this.compare(this.logLevel, LOGLEVEL.INFO) >= 0) {
      return console.info(...wrap(LOGLEVEL.INFO, this.label, message));
    }
  }

  public [LOGTYPE.LOG](message?: any, label?: string): void {
    if (this.compare(this.logLevel, LOGLEVEL.ALL) >= 0) {
      return console.log(
        ...wrap(LOGLEVEL.ALL, label ? label : this.label, message)
      );
    }
  }

  public [LOGTYPE.TABLE](data?: any, columns?: string[]): void {
    if (this.compare(this.logLevel, LOGLEVEL.ALL) >= 0) {
      return console.table(data, columns);
    }
  }

  public [LOGTYPE.TIME](label?: string): void {
    if (this.compare(this.logLevel, LOGLEVEL.ALL) >= 0) {
      return console.time(label);
    }
  }

  public [LOGTYPE.TIMEEND](label?: string): void {
    if (this.compare(this.logLevel, LOGLEVEL.ALL) >= 0) {
      return console.timeEnd(label);
    }
  }

  public [LOGTYPE.TRACE](label?: any): void {
    if (this.compare(this.logLevel, LOGLEVEL.ALL) >= 0) {
      return console.trace(...wrap(LOGLEVEL.ALL, this.label, label));
    }
  }

  public [LOGTYPE.WARN](message?: any, label?: string): void {
    if (this.compare(this.logLevel, LOGLEVEL.WARN) >= 0) {
      return console.warn(
        ...wrap(LOGLEVEL.WARN, label ? label : this.label, message)
      );
    }
  }
}
