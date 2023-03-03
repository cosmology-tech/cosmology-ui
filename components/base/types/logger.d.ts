import { LOGLEVEL, LOGTYPE } from './type';
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
    [LOGTYPE.INFO](message?: any, label?: string): void;
    [LOGTYPE.LOG](message?: any, label?: string): void;
    [LOGTYPE.TABLE](data?: any, columns?: string[]): void;
    [LOGTYPE.TIME](label?: string): void;
    [LOGTYPE.TIMEEND](label?: string): void;
    [LOGTYPE.TRACE](label?: any): void;
    [LOGTYPE.WARN](message?: any, label?: string): void;
}
