import { toZonedTime, format} from 'date-fns-tz'
import { startOfDay, endOfDay } from 'date-fns';

function getStartOfDayHongKong(dateToFormat: string) {
  const  date  = new Date(dateToFormat);
  const hkTimeZone = 'Asia/Hong_Kong';

  const hkDate = toZonedTime(date, hkTimeZone);
  console.log(hkDate)

  const startOfHKDay = startOfDay(hkDate);
  const formattedHKT = format(startOfHKDay, 'yyyy-MM-dd HH:mm:ss', { timeZone: hkTimeZone });
  console.log('Formatted Hong Kong Time:', formattedHKT);

  return formattedHKT;
}

function getEndOfDayHongKong(dateToFormat: string) {
  const  date  = new Date(dateToFormat);
  const hkTimeZone = 'Asia/Hong_Kong';

  const hkDate = toZonedTime(date, hkTimeZone);
  console.log(hkDate)

  const startOfHKDay = endOfDay(hkDate);
  const formattedHKT = format(startOfHKDay, 'yyyy-MM-dd HH:mm:ss', { timeZone: hkTimeZone });
  console.log('Formatted Hong Kong Time:', formattedHKT);

  return formattedHKT;
}

export { getStartOfDayHongKong, getEndOfDayHongKong}