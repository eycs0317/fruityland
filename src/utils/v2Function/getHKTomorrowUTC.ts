// import { toZonedTime } from 'date-fns-tz'
// import {  addDays, startOfDay, addHours, } from 'date-fns';

// const HONG_KONG_TIMEZONE = 'Asia/Hong_Kong';
export function getHKTomorrowUTC(): Date {
  const today = new Date();
  const nowUTC = new Date(today.getTime());
  // console.log(nowUTC);

  const nowHKT = new Date(nowUTC.getTime() + 8 * 60 * 60 * 1000);
  // console.log(nowHKT);

  const y = nowHKT.getUTCFullYear();
  const m = nowHKT.getUTCMonth();
  const d = nowHKT.getUTCDate() + 1;
  const HKTomorrowUTC = new Date(Date.UTC(y, m, d, 0, 0, 0) - 8 * 60 * 60 * 1000);
  // console.log(HKTomorrowUTC);

  return HKTomorrowUTC;


  
  // //currently
  //   const currentUtcDate = new Date();
  //   console.log('----currentUtcDate---->', currentUtcDate);
  // // add 8 hrs
  //   const plus8Hrs = addHours(currentUtcDate, 8);
  //   console.log('----plus8Hrs---->', plus8Hrs);
  // //currentyl plus 1 day
  //   const nextDayUtcDate = addDays(plus8Hrs, 1);
  //   console.log('----nextDayUtcDate---->', nextDayUtcDate);
  // console.log('using startOfDay(nextDayUtcDate)',startOfDay(nextDayUtcDate))
  //   const y = plus8Hrs.getUTCFullYear();
  //   // console.log('y', y)
  //   const m = plus8Hrs.getUTCMonth();
  //   // console.log( 'm', m)
  //   const d = plus8Hrs.getUTCDate() + 1;
  //   // console.log('d',d)
  //   const tomorrowMidnightUTC = new Date(y, m, d, 0, 0, 0);
  // console.log('------tomorrowMidnightUTC', tomorrowMidnightUTC)
  //   const HKTomorrowUTC = new Date(tomorrowMidnightUTC.getTime() - 8 * 60 * 60 * 1000);

  //   console.log('----HKTomorrowUTC---->', HKTomorrowUTC);
  // return HKTomorrowUTC;



  //   return HKTomorrowUTC


}

