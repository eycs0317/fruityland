'use client';

// react
import {useEffect, useState} from 'react';

// nextjs
import {useSearchParams} from 'next/navigation';

// ui
import FormField from '@/ui/foundations/formField';


export default function ClientPage() {
  const searchParams = useSearchParams();

  const couponCodeFromURL = searchParams.get('cc');

  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    const fetchCheckInStatus = async () => {
        const response = await fetch(`/api/rsvp/getCheckInStatus?cc=${couponCodeFromURL}`);
        const result = await response.json();

        if (result.data.status) {
          setIsCheckedIn(true);
        } else {
          setIsLoading(false);
        }
      };
      fetchCheckInStatus();
  },[couponCodeFromURL])

  if (isLoading) {
    return null;
  }

  return (
    <>
      {!isCheckedIn ?
        <section className="w-full p-8">
          <form className="flex flex-col gap-8 w-full" action="/api/rsvp/action" method="post">
            <FormField type='hidden' fieldData={{id: 'couponCode', value: couponCodeFromURL || ''}} />
            <div className="flex flex-col gap-4">
              <FormField type='button' fieldData={{type: 'submit', id: 'btModify', className: 'secondary', value:'Modify'}} />
              <FormField type='button' fieldData={{type: 'submit', id: 'btCancel', className: 'secondary', value:'Cancel Reservation'}} />
            </div>
          </form>
        </section> : ''
      }
    </>
  );
}
