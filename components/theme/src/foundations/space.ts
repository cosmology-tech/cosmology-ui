const smallSpaces = {
  '0': '0rem', // 0px
  '1': '0.125rem', // 2px
  '2': '0.25rem', // 4px
  '3': '0.375rem', // 6px
  '4': '0.5rem', // 8px
  '5': '0.625rem', // 10px
  '6': '0.75rem', // 12px
  '7': '0.875rem', // 14px
  '8': '1rem', // 16px
  '9': '1.125rem', // 18px
  '10': '1.25rem', // 20px
  '11': '1.375rem', // 22px
  '12': '1.5rem', // 24px
  '13': '1.625rem', // 26px
  '14': '1.75rem', // 28px
  '15': '1.875rem', // 30px
  '16': '2rem', // 32px
  '17': '2.125rem', // 34px
  '18': '2.25rem', // 36px
  '19': '2.375rem', // 38px
  '20': '2.5rem', // 40px
  '21': '2.625rem', // 42px
  '22': '2.75rem', // 44px
  '23': '2.875rem', // 46px
  '24': '3rem', // 48px
  '25': '3.125rem', // 50px
  '26': '3.25rem', // 52px
  '27': '3.375rem', // 54px
  '28': '3.5rem', // 56px
  '29': '3.625rem', // 58px
  '30': '3.75rem', // 60px
  '31': '3.875rem', // 62px
  '32': '4rem', // 64px
  '33': '4.125rem', // 66px
  '34': '4.25rem', // 68px
  '35': '4.375rem', // 70px
  '36': '4.5rem', // 72px
  '37': '4.625rem', // 74px
  '38': '4.75rem', // 76px
  '39': '4.875rem', // 78px
  '40': '5rem', // 80px
  '41': '5.125rem', // 82px
  '42': '5.25rem', // 84px
  '43': '5.375rem', // 86px
  '44': '5.5rem', // 88px
  '45': '5.625rem', // 90px
  '46': '5.75rem', // 92px
  '47': '5.875rem', // 94px
  '48': '6rem', // 96px
  '49': '6.125rem', // 98px
  '50': '6.25rem' // 100px
};

// const defaultSize = {
//   0.5: '0.125rem',
//   1: '0.25rem',
//   1.5: '0.375rem',
//   2: '0.5rem',
//   2.5: '0.625rem',
//   3: '0.75rem',
//   3.5: '0.875rem',
//   4: '1rem',
//   4.5: '1.125rem',
//   5: '1.25rem',
//   5.5: '1.375rem',
//   6: '1.5rem',
//   6.5: '1.625rem',
//   7: '1.75rem',
//   7.5: '1.875rem',
//   8: '2rem',
//   8.5: '2.125rem',
//   9: '2.25rem',
//   9.5: '2.375rem',
//   10: '2.5rem',
//   10.5: '2.625rem',
//   11: '2.75rem',
//   11.5: '2.875rem',
//   12: '3rem',
//   12.5: '3.125rem',
//   13: '3.25rem',
//   13.5: '3.375rem',
//   14: '3.5rem',
//   14.5: '3.625rem',
//   15: '3.75rem',
//   15.5: '3.875rem',
//   16: '4rem',
//   16.5: '4.125rem',
//   17: '4.25rem',
//   17.5: '4.375rem',
//   18: '4.5rem',
//   18.5: '4.625rem',
//   19: '4.75rem',
//   19.5: '4.875rem',
//   20: '5rem',
//   20.5: '5.25rem',
//   21: '5.5rem',
//   21.5: '5.75rem',
//   22: '6rem',
//   22.5: '6.25rem',
//   23: '6.5rem',
//   23.5: '6.75rem',
//   24: '7rem',
//   24.5: '7.25rem',
//   25: '7.5rem',
//   25.5: '7.75rem',
//   26: '8rem',
//   26.5: '8.25rem',
//   27: '8.5rem',
//   27.5: '8.75rem',
//   28: '9rem',
//   28.5: '9.25rem',
//   29: '9.5rem',
//   29.5: '9.75rem',
//   30: '10rem',
//   30.5: '10.25rem',
//   31: '10.5rem',
//   31.5: '10.75rem',
//   32: '11rem',
//   32.5: '11.25rem',
//   33: '11.5rem',
//   33.5: '11.75rem',
//   34: '12rem',
//   34.5: '12.25rem',
//   35: '12.5rem',
//   35.5: '12.75rem',
//   36: '13rem',
//   36.5: '13.25rem',
//   37: '13.5rem',
//   37.5: '13.75rem',
//   38: '14rem',
//   38.5: '14.25rem',
//   39: '14.5rem',
//   39.5: '14.75rem',
//   40: '15rem',
//   40.5: '15.25rem',
//   41: '15.5rem',
//   41.5: '15.75rem',
//   42: '16rem',
//   42.5: '16.25rem',
//   43: '16.5rem',
//   43.5: '16.75rem',
//   44: '17rem',
//   44.5: '17.25rem',
//   45: '17.5rem',
//   45.5: '17.75rem',
//   46: '18rem',
//   46.5: '18.25rem',
//   47: '18.5rem',
//   47.5: '18.75rem',
//   48: '19rem',
//   48.5: '19.25rem',
//   49: '19.5rem',
//   49.5: '19.75rem',
//   50: '20rem',
//   50.5: '20.25rem',
//   51: '20.5rem',
//   51.5: '20.75rem',
//   52: '21rem',
//   52.5: '21.25rem',
//   53: '21.5rem',
//   53.5: '21.75rem',
//   54: '22rem',
//   54.5: '22.25rem',
//   55: '22.5rem',
//   55.5: '22.75rem',
//   56: '23rem',
//   56.5: '23.25rem',
//   57: '23.5rem',
//   57.5: '23.75rem',
//   58: '24rem',
//   58.5: '24.25rem',
//   59: '24.5rem',
//   59.5: '24.75rem',
//   60: '25rem'
// };

export const space = smallSpaces;