export declare enum LOGLEVEL {
    ALL = "all",
    INFO = "info",
    DEBUG = "debug",
    WARN = "warn",
    ERROR = "error",
    OFF = "off"
}
declare enum LOGTYPE {
    LOG = "log",
    INFO = "info",
    ASSERT = "asset",
    TRACE = "trace",
    TABLE = "table",
    GROUP = "group",
    GROUPCOLLAPSED = "groupCollapsed",
    GROUPEND = "groupEnd",
    COUNT = "count",
    TIME = "time",
    TIMEEND = "timeEnd",
    CLEAR = "clear",
    DEBUG = "debug",
    WARN = "warn",
    ERROR = "error"
}
export declare class Logger {
    readonly logLevel: LOGLEVEL;
    readonly logType: LOGTYPE;
    label?: any;
    constructor(label?: any, logLevel?: LOGLEVEL);
    private compare;
    [LOGTYPE.ASSERT](value: any, message?: any): void;
    [LOGTYPE.CLEAR](): void;
    [LOGTYPE.COUNT](label?: any): void;
    [LOGTYPE.DEBUG](message?: any, label?: string): void;
    [LOGTYPE.ERROR](message?: any, label?: string): void;
    [LOGTYPE.GROUP](message?: any, label?: string): void;
    [LOGTYPE.GROUPCOLLAPSED](message?: any, label?: string): void;
    [LOGTYPE.GROUPEND](): void;
    [LOGTYPE.INFO](message?: any): void;
    [LOGTYPE.LOG](message?: any, label?: string): void;
    [LOGTYPE.TABLE](data?: any, columns?: string[]): void;
    [LOGTYPE.TIME](label?: string): void;
    [LOGTYPE.TIMEEND](label?: string): void;
    [LOGTYPE.TRACE](label?: any): void;
    [LOGTYPE.WARN](message?: any, label?: string): void;
}
export {};
