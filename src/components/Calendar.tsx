// src/components/Calendar.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import ReactCalendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './calendar.css'; // Custom styles for the calendar

// Import functions and the timezone constant from your utility file
import {
  APP_DISPLAY_TIMEZONE,
  // convertLocalToUTCForDB, // Used for converting TO UTC for API
  convertUTCToLocal,     // Used for converting FROM UTC for display
  // No need for formatUTCToLocalString here, as we use date-fns-tz's format directly
} from '@/utils/timezoneUtils';



// Import format from date-fns-tz as it supports the timeZone option
import { format,  } from 'date-fns-tz';


type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

interface CalendarProps {
  initialDate?: string;
  allowedMinDate?: Date
  allowedMaxDate?: Date;
}

export default function Calendar({ initialDate, allowedMinDate, allowedMaxDate }: CalendarProps) {
  const displayTimeZone = APP_DISPLAY_TIMEZONE;



  const initialLocalDate = initialDate
    ? convertUTCToLocal(new Date(initialDate), displayTimeZone)
    : convertUTCToLocal(new Date(), displayTimeZone);

  const [value, onChange] = useState<Value>(initialLocalDate);



  const [userClickedDay, setUserClickedDay] = useState<string>(() =>
    format(initialLocalDate, 'yyyy-MM-dd', { timeZone: displayTimeZone })
  );


  // const allowedMinDateConverted = allowedMinDate ? convertUTCToLocal(new Date(allowedMinDate), displayTimeZone) : undefined;
  // const allowedMaxDateConverted = allowedMaxDate ? convertUTCToLocal(new Date(allowedMaxDate), displayTimeZone) : undefined;
  // console.log('original allowedMinDate:', allowedMinDate);
  // console.log('original allowedMaxDate:', allowedMaxDate);



  // console.log('localMinDate:', localMinDate); //localMinDate: 2025-08-10T07:00:00.000Z
//   const convertedAllowedMinDate = convertUTCToLocal(allowedMinDate, displayTimeZone);
//   const convertedAllowedMaxDate = convertUTCToLocal(new Date(allowedMaxDate), displayTimeZone);
// console.log('convert to HK UTC timeminAllowedDate:', convertedAllowedMinDate);
//   console.log('convert to HK UTC time maxAllowedDate:', convertedAllowedMaxDate);

  const calendarRef = useRef<HTMLDivElement>(null);


  const handleDayClick = (clickedValue: ValuePiece) => {

    if (clickedValue instanceof Date) {
      // For the hidden input (userClickedDay) that goes into the URL:
      // FIX 2: Format the clickedValue (which represents the user's selected HKT date)
      // directly to get the HKT date string.

      const formattedLocalDay = format(clickedValue, 'yyyy-MM-dd', { timeZone: displayTimeZone });
      setUserClickedDay(formattedLocalDay);
      onChange(clickedValue)

      onChange(clickedValue); // Keep calendar showing local HK date

    } else {
      setUserClickedDay('');
      onChange(null); // Reset the calendar value if clickedValue is null

    }
  };

  useEffect(() => {
    // Existing logic for initialDate handling
    if (initialDate) {
      const hkDate = convertUTCToLocal(new Date(initialDate), displayTimeZone);
      const formattedInitialDate = format(hkDate, 'yyyy-MM-dd', { timeZone: displayTimeZone });

      if (!(value instanceof Date) || format(value, 'yyyy-MM-dd', { timeZone: displayTimeZone }) !== formattedInitialDate) {
        onChange(hkDate);
      }
      if (userClickedDay !== formattedInitialDate) {
        setUserClickedDay(formattedInitialDate);
      }
    }

    // 2. Add event listener to the document for clicks outside the calendar
    // const handleClickOutside = (event: MouseEvent) => {
    //   // Check if the click target is NOT within the calendar component
    //   if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
    //     // If there's a selected date and the click was outside, clear the selection
    //     if (value instanceof Date) { // Only clear if something is currently selected
    //       onChange(null); // Set value to null to deselect the date visually
    //       setUserClickedDay(''); // Clear the hidden input value too
    //       console.log('CLIENT (Calendar.tsx): Clicked outside. Selection cleared.');
    //     }
    //   }
    // };

    // document.addEventListener('mousedown', handleClickOutside);

    // // 3. Clean up the event listener when the component unmounts
    // return () => {
    //   document.removeEventListener('mousedown', handleClickOutside);
    // };
  }, [initialDate, value, userClickedDay, displayTimeZone]); // Include `value` in dependencies to re-run effect when `value` changes




  return (
    <div ref={calendarRef} className='w-full max-w-md mx-auto p-4'>
      <ReactCalendar
        onChange={onChange}
        value={value}
        onClickDay={handleDayClick}
        minDate={allowedMinDate}


        maxDate={allowedMaxDate}
        defaultActiveStartDate={allowedMinDate}
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