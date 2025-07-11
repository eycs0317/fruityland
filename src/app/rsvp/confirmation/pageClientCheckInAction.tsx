'use client';

// react
import {useEffect, useState} from 'react';

// nextjs
import {useSearchParams} from 'next/navigation';

// ui
import FormField from '@/ui/foundations/formField';

// utils
import {l10n} from '@/utils/l10n';

export default function ClientPage({ lang }: { lang: string }) {
  const searchParams = useSearchParams();

  const couponCodeFromURL = searchParams.get('cc');

  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCheckInStatus = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/rsvp/getCheckInStatus?cc=${couponCodeFromURL}`);
      const result = await response.json();

      if (result.data.status) {
        setIsCheckedIn(true);
      } else {
        setIsLoading(false);
      }
    };
    fetchCheckInStatus();
  }, [couponCodeFromURL]);

  if (isLoading) {
    return null;
  }

  return (
    <>
      {!isCheckedIn ? 
        <section className="w-full p-8 pt-0 pb-0">
          <form className="flex flex-col gap-8 w-full" action="/api/rsvp/checkIn" method="post">
            <FormField type='hidden' fieldData={{id: 'couponCode', value: couponCodeFromURL || ''}} />
            <div className="flex flex-col gap-4">
              <FormField type='button' fieldData={{type: 'submit', id: 'btCheckIn', className: 'primary', value:l10n('rsvp', 'button-006', lang)}} />
            </div>
          </form>
        </section> : ''
      }
    </>
  );
}
