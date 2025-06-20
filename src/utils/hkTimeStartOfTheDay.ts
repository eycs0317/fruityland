import { toZonedTime, format} from 'date-fns-tz'
import { startOfDay, endOfDay } from 'date-fns';

function getStartOfDayHongKong(dateToFormat: string) {
  const  date  = new Date(dateToFormat);
  const hkTimeZone = 'Asia/Hong_Kong';

  const hkDate = toZonedTime(date, hkTimeZone);


  const startOfHKDay = startOfDay(hkDate);
  const formattedHKT = format(startOfHKDay, 'yyyy-MM-dd HH:mm:ss', { timeZone: hkTimeZone });


  return formattedHKT;
}

function getEndOfDayHongKong(dateToFormat: string) {
  const  date  = new Date(dateToFormat);
  const hkTimeZone = 'Asia/Hong_Kong';

  const hkDate = toZonedTime(date, hkTimeZone);


  const startOfHKDay = endOfDay(hkDate);
  const formattedHKT = format(startOfHKDay, 'yyyy-MM-dd HH:mm:ss', { timeZone: hkTimeZone });


  return formattedHKT;
}

export { getStartOfDayHongKong, getEndOfDayHongKong}