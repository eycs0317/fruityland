

// src/components/Calendar.tsx
'use client';

import { useState, useRef } from 'react';
import ReactCalendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './calendar.css'; // Custom styles for the calendar

// Import format and parseISO from date-fns
import {  parseISO } from 'date-fns';


type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

interface CalendarProps {
  initialDate?: string; // Expecting ISO string (e.g., "2025-07-10T00:00:00.000Z")
  allowedMinDate?: Date | undefined // These are Date objects passed as props
  allowedMaxDate?: Date | undefined; // These are Date objects passed as props
}

export default function Calendar({ initialDate, allowedMinDate, allowedMaxDate }: CalendarProps) {
  // `nowUTC` is a Date object representing the current moment.
  // When formatted/displayed by ReactCalendar, it will implicitly use the browser's local timezone.
  const nowUTC = new Date();
  // console.log('nowUTC (Date object):', nowUTC); // Console logs are okay in client components

  // --- REVISED INITIAL STATE CALCULATIONS ---
  // This logic runs only ONCE when the component initially renders.
  // It ensures the state is set correctly from props or a default.
  const calculateInitialDateStates = () => {
    let initialCalDate: Date;
    let initialClickedIsoDate: string | undefined;

    if (initialDate) {
      // If initialDate prop is provided, parse it to a Date object
      const parsedDate = parseISO(initialDate);
      initialCalDate = parsedDate;
      // Store the YYYY-MM-DD UTC string for userClickedDay
      initialClickedIsoDate = parsedDate.toISOString().split('T')[0];
    } else {
      // If no initialDate prop, default to today's date in local time for display
      initialCalDate = nowUTC; // Represents today's date in local time
      // And default userClickedDay to today's YYYY-MM-DD UTC string
      initialClickedIsoDate = nowUTC.toISOString().split('T')[0];
    }
    return {
      calendarValue: initialCalDate,
      clickedDayString: initialClickedIsoDate,
    };
  };

  const { calendarValue: initialCalValue, clickedDayString: initialClickedDayString } = calculateInitialDateStates();

  // State to control the displayed date in the calendar component
  // Initialized directly with the calculated value.
  const [value, onChange] = useState<Value>(initialCalValue);

  // userClickedDay now stores a string (YYYY-MM-DD) or undefined, derived from UTC.
  // Initialized directly with the calculated value.
  const [userClickedDay, setUserClickedDay] = useState<string | undefined>(initialClickedDayString);
  // --- END REVISED INITIAL STATE CALCULATIONS ---
console.log('userclickday in <Calendar', userClickedDay);
  const calendarRef = useRef<HTMLDivElement>(null);

  // Handler for when a day is clicked on the calendar
  const handleDayClick = (clickedValue: ValuePiece) => {
    // console.log('Clicked Value (Date object from ReactCalendar):', clickedValue);
    if (clickedValue instanceof Date) {
      // Convert Date object to YYYY-MM-DD string (UTC date part) immediately
      const isoDateString = clickedValue.toISOString().split('T')[0];
      setUserClickedDay(isoDateString);
      // onChange still uses the Date object for ReactCalendar's display.
      // This is crucial for ReactCalendar to visually update its selection.
      onChange(clickedValue);
    } else {
      // If clickedValue is null (e.g., clearing selection), reset states.
      setUserClickedDay(undefined);
      onChange(null);
    }
  };

  // --- REMOVED useEffect FOR INITIAL SYNC ---
  // The previous useEffect hook that was causing the conflict has been removed.
  // Initial state synchronization is now handled entirely by the `useState` initializers.
  // This ensures that the component's state will not be reset by the `initialDate` prop
  // after a user has interacted with the calendar, thus preventing the "revert" issue.
  // --- END REMOVED useEffect ---

  return (
    <div ref={calendarRef} className='w-full max-w-md mx-auto p-4'>
      <ReactCalendar
        onChange={onChange} // Updates the 'value' state for calendar display
        value={value} // The current date(s) displayed/selected in the calendar
        onClickDay={handleDayClick} // Custom handler for day clicks
        minDate={allowedMinDate} // Minimum selectable date (Date object)
        maxDate={allowedMaxDate} // Maximum selectable date (Date object)
        defaultActiveStartDate={allowedMinDate || (value instanceof Date ? value : nowUTC)}
        calendarType='gregory' // Use Gregorian calendar type
      />
      {/* Hidden input to pass the selected date to the form. */}
      {/* `userClickedDay` is already a YYYY-MM-DD string or undefined. */}
      <input
        type="hidden"
        name="selectedDate" // Name attribute for form submission
        value={userClickedDay || ''} // Direct use, as it's already a string
      />
    </div>
  );
}