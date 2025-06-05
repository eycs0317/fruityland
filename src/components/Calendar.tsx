'use client';

import { useState, useEffect } from 'react';
import ReactCalendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './calendar.css'; // Custom styles for the calendar
type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

interface CalendarProps {
  initialDate?: string;
}

export default function Calendar({ initialDate }: CalendarProps) {

  const [value, onChange] = useState<Value>(initialDate ? new Date(initialDate) : new Date());

  const [userClickedDay, setUserClickedDay] = useState<string | null>(() => {
    if (initialDate) {
      return new Date(initialDate).toISOString().split('T')[0];
    }
    return new Date().toISOString().split('T')[0];
  });

  const minAllowedDate = new Date(2025, 6, 10);
  const maxAllowedDate = new Date(2025, 8, 3);

  const handleDayClick = (clickedValue: ValuePiece) => {
    if (clickedValue instanceof Date) {
      const formattedDate = clickedValue.toISOString().split('T')[0]; // YYYY-MM-DD
      setUserClickedDay(formattedDate);
    } else {
      setUserClickedDay(null);
    }
  };

  useEffect(() => {
    if (initialDate) {
      const dateFromInitialProp = new Date(initialDate);

      if (!(value instanceof Date) || value.toISOString().split('T')[0] !== dateFromInitialProp.toISOString().split('T')[0]) {
         onChange(dateFromInitialProp);
      }
      const formattedInitialDate = dateFromInitialProp.toISOString().split('T')[0];
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
        defaultActiveStartDate={new Date(2025, 6, 10)}
        calendarType='gregory' // first day of the week start Sunday.
      />
      {/* This hidden input will pass the selected date to the server action */}
      <input
        type="hidden"
        name="selectedDate" // This name must match data.selectedDate in handleSubmit
        value={userClickedDay || ''} // Ensure it's always a string
      />
    </div>
  );
}