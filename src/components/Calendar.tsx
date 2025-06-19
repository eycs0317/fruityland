'use client';

import { useState, useRef, useEffect } from 'react';
import ReactCalendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './calendar.css'; // Custom styles for the calendar
import { parseISO } from 'date-fns';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

interface CalendarProps {
  initialDate?: string; // ISO string
  allowedMinDate?: string; // Expecting ISO string, not Date
  allowedMaxDate?: string;
}

function formatAsLocalYYYYMMDD(date: Date): string {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export default function Calendar({ initialDate, allowedMinDate, allowedMaxDate }: CalendarProps) {
  const nowUTC = new Date();

  // --- Initial State Calculation ---
  const calculateInitialDateStates = () => {
    let initialCalDate: Date;
    let initialClickedIsoDate: string | undefined;

    if (initialDate) {
      const parsedDate = parseISO(initialDate);
      initialCalDate = parsedDate;
      initialClickedIsoDate = parsedDate.toISOString().split('T')[0];
    } else {
      initialCalDate = nowUTC;
      initialClickedIsoDate = nowUTC.toISOString().split('T')[0];
    }

    return {
      calendarValue: initialCalDate,
      clickedDayString: initialClickedIsoDate,
    };
  };

  const { calendarValue: initialCalValue, clickedDayString: initialClickedDayString } = calculateInitialDateStates();

  const [value, onChange] = useState<Value>(initialCalValue);
  const [userClickedDay, setUserClickedDay] = useState<string | undefined>(initialClickedDayString);

  const [localMinDate, setLocalMinDate] = useState<Date>();
  const [localMaxDate, setLocalMaxDate] = useState<Date>();
  const [isClient, setIsClient] = useState(false);

  const calendarRef = useRef<HTMLDivElement>(null);

  const handleDayClick = (clickedValue: ValuePiece) => {
    if (clickedValue instanceof Date) {
      const isoDateString = formatAsLocalYYYYMMDD(clickedValue);
      setUserClickedDay(isoDateString);
      onChange(clickedValue);
    } else {
      setUserClickedDay(undefined);
      onChange(null);
    }
  };

  useEffect(() => {
    // This runs only on the client after hydration
    setIsClient(true);

    if (allowedMinDate) {
      const d = new Date(allowedMinDate);
      d.setHours(0, 0, 0, 0); // Force to local midnight
      setLocalMinDate(d);
    }

    if (allowedMaxDate) {
      const d = new Date(allowedMaxDate);
      d.setHours(0, 0, 0, 0); // Force to local midnight
      setLocalMaxDate(d);
    }
  }, [allowedMinDate, allowedMaxDate]);

  return (
    <div ref={calendarRef} className="w-full max-w-md mx-auto">
      {isClient && (
        <ReactCalendar
          onChange={onChange}
          value={value}
          onClickDay={handleDayClick}
          minDate={localMinDate}
          maxDate={localMaxDate}
          defaultActiveStartDate={localMinDate || (value instanceof Date ? value : nowUTC)}
          calendarType="gregory"
        />
      )}
      <input
        type="hidden"
        name="selectedDate"
        value={userClickedDay || ''}
      />
    </div>
  );
}
