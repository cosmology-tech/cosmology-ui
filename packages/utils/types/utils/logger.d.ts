declare type INFOTYPE = 'Table' | 'InfoGroup' | 'InfoGroupCollapsed' | 'InfoDebug' | 'WithCount';
export declare const logger: {
    ASSERT: (message: string, conditional: any, objects: any) => void;
    TRACE: (message: string, objects: any) => void;
    INFO: (message: string, objects: any, type?: INFOTYPE) => void;
    DEBUG: (message: string, objects: any) => void;
    WARN: (message: string, objects: any) => void;
    ERROR: (message: string, objects: any) => void;
};
export {};
