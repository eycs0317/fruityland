'use client';

// nextjs
import {useSearchParams} from 'next/navigation';

// ui
import FormField from '@/ui/foundations/formField';

export default function ClientPage() {
  const searchParams = useSearchParams();

  const couponCodeFromURL = searchParams.get('cc');

  // Display data once loaded
  return (
    <>
      <section className="w-full p-8">
        <form className="flex flex-col gap-8 w-full" action="/">
          <FormField type='hidden' fieldData={{id: 'couponCode', value: couponCodeFromURL || ''}} />
          <div className="flex flex-col gap-4">
            <FormField type='button' fieldData={{type: 'submit', id: 'btModify', className: 'secondary', value:'Modify'}} />
            <FormField type='button' fieldData={{type: 'submit', id: 'btCancel', className: 'secondary', value:'Cancel Reservation'}} />
          </div>
        </form>
      </section>
    </>
  );
}