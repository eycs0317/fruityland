'use client';

// react
import {useState} from 'react';

// nextjs
import {useSearchParams} from 'next/navigation';

// ui
import FormField from '@/ui/foundations/formField';

export default function ClientPage() {
  const searchParams = useSearchParams();

  const couponCodeFromURL = searchParams.get('cc');
  const couponStatus = searchParams.get('status');

  const [isCheckedIn, setIsCheckedIn] = useState(false);

  const fetchCheckInStatus = async () => {
    const response = await fetch(`/api/rsvp/getCheckInStatus?cc=${couponCodeFromURL}`);
    const result = await response.json();

    if (result.data.status) {
      setIsCheckedIn(true);
    } else {
      setIsCheckedIn(false);
    }
  };
  fetchCheckInStatus();

  if (couponStatus === 'checkedIn') {
    return null;
  }

  if (!isCheckedIn) {
    return (
      <>
        <section className="w-full p-8">
          <form className="flex flex-col gap-8 w-full" action="/api/rsvp/checkIn" method="post">
            <FormField type='hidden' fieldData={{id: 'couponCode', value: couponCodeFromURL || ''}} />
            <div className="flex flex-col gap-4">
              <FormField type='button' fieldData={{type: 'submit', id: 'btCheckIn', className: 'primary', value:'Check In'}} />
            </div>
          </form>
        </section>
      </>
    );
  }
}