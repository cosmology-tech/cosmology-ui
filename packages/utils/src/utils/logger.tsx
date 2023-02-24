/* eslint-disable no-console */
enum LEVEL {
  ASSERT = 'ASSERT',
  TRACE = 'TRACE',
  INFO = 'INFO',
  DEBUG = 'DEBUG',
  WARN = 'WARN',
  ERROR = 'ERROR'
}
type INFOTYPE =
  | 'Table'
  | 'InfoGroup'
  | 'InfoGroupCollapsed'
  | 'InfoDebug'
  | 'WithCount';

export const logger = {
  [LEVEL.ASSERT]: function (message: string, conditional: any, objects: any) {
    console.assert(conditional, `[ASSERT] ${message}`, objects);
  },
  [LEVEL.TRACE]: function (message: string, objects: any) {
    console.trace(`[TRACE] ${message}`, objects);
  },
  [LEVEL.INFO]: function (message: string, objects: any, type?: INFOTYPE) {
    switch (type) {
      case 'Table':
        console.groupCollapsed(`%c[INFOTABLE] ${message}`, 'color: LightBlue');
        console.table(objects);
        console.groupEnd();
        break;
      case 'InfoGroupCollapsed':
        console.groupCollapsed(`%c[INFOGROUP] ${message}`, 'color: SteelBlue');
        console.info(objects);
        console.groupEnd();
        break;
      case 'InfoGroup':
        console.group(`%c[INFOGROUP] ${message}`, 'color: SteelBlue');
        console.info(objects);
        console.groupEnd();
        break;
      case 'InfoDebug':
        console.groupCollapsed(`%c[INFODEBUG] ${message}`, 'color: RoyalBlue');
        console.log(objects);
        console.groupEnd();
        break;
      case 'WithCount':
        console.group(`%c[INFOWITHCOUNT] ${message}`, 'color: CornflowerBlue');
        console.info(objects);
        console.count(objects);
        console.groupEnd();
        break;

      default:
        console.info(`%c[INFO] ${message}`, 'color: DodgerBlue', objects);
        break;
    }
  },
  [LEVEL.DEBUG]: function (message: string, objects: any) {
    console.debug(`[DEBUG] ${message}`, objects);
  },
  [LEVEL.WARN]: function (message: string, objects: any) {
    console.warn(`[WARN] ${message}`, objects);
  },
  [LEVEL.ERROR]: function (message: string, objects: any) {
    console.error(`[ERROR] ${message}`, objects);
  }
};
