import {toZonedTime, format} from 'date-fns-tz';

export function formatInUserTimezone(date: Date | string, timezone: string, pattern = 'h:mmaaa') {
  const utcDate = typeof date === 'string' ? new Date(date) : date;
  const zonedDate = toZonedTime(utcDate, timezone);
  return format(zonedDate, pattern);
}
