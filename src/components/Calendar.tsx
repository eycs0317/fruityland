// src/components/Calendar.tsx
'use client';

import { useState, useEffect } from 'react';
import ReactCalendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './calendar.css'; // Custom styles for the calendar

// Import functions and the timezone constant from your utility file
import {
  APP_DISPLAY_TIMEZONE,
  convertLocalToUTCForDB, // Used for converting TO UTC for API
  convertUTCToLocal,     // Used for converting FROM UTC for display
  // No need for formatUTCToLocalString here, as we use date-fns-tz's format directly
} from '@/utils/timezoneUtils';

// Import format from date-fns-tz as it supports the timeZone option
import { format } from 'date-fns-tz';


type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

interface CalendarProps {
  initialDate?: string;
}

export default function Calendar({ initialDate }: CalendarProps) {
  const displayTimeZone = APP_DISPLAY_TIMEZONE;

  const initialLocalDate = initialDate
    ? convertUTCToLocal(new Date(initialDate), displayTimeZone)
    : convertUTCToLocal(new Date(), displayTimeZone);

  const [value, onChange] = useState<Value>(initialLocalDate);

  // FIX 1: Format the initialLocalDate (which is already interpreted in HKT)
  // directly to get the HKT date string.
  const [userClickedDay, setUserClickedDay] = useState<string>(() =>
    format(initialLocalDate, 'yyyy-MM-dd', { timeZone: displayTimeZone })
  );

  const minAllowedDate = convertUTCToLocal(new Date(Date.UTC(2025, 6, 10)), displayTimeZone);
  const maxAllowedDate = convertUTCToLocal(new Date(Date.UTC(2025, 8, 3)), displayTimeZone);


  const handleDayClick = (clickedValue: ValuePiece) => {
    if (clickedValue instanceof Date) {
      // For the hidden input (userClickedDay) that goes into the URL:
      // FIX 2: Format the clickedValue (which represents the user's selected HKT date)
      // directly to get the HKT date string.
      const formattedLocalDay = format(clickedValue, 'yyyy-MM-dd', { timeZone: displayTimeZone });
      setUserClickedDay(formattedLocalDay);

      onChange(clickedValue); // Keep calendar showing local HK date
    } else {
      setUserClickedDay('');
    }
  };

  useEffect(() => {
    if (initialDate) {
      const hkDate = convertUTCToLocal(new Date(initialDate), displayTimeZone);
      // FIX 3: Format the hkDate (which is interpreted in HKT)
      // directly to get the HKT date string for comparison.
      const formattedInitialDate = format(hkDate, 'yyyy-MM-dd', { timeZone: displayTimeZone });

      // Check if current calendar value needs updating based on initialDate
      if (!(value instanceof Date) || format(value, 'yyyy-MM-dd', { timeZone: displayTimeZone }) !== formattedInitialDate) {
        onChange(hkDate);
      }

      if (userClickedDay !== formattedInitialDate) {
        setUserClickedDay(formattedInitialDate);
      }
    }
  }, [initialDate, value, userClickedDay]);


  return (
    <div className='w-full max-w-md mx-auto p-4'>
      <ReactCalendar
        onChange={onChange}
        value={value}
        onClickDay={handleDayClick}
        minDate={minAllowedDate}
        maxDate={maxAllowedDate}
        defaultActiveStartDate={minAllowedDate}
        calendarType='gregory'
      />
      <input
        type="hidden"
        name="selectedDate"
        value={userClickedDay || ''}
      />
    </div>
  );
}