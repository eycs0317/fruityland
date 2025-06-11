'use client';

// react
import {useEffect, useState} from 'react';

// nextjs
import {useSearchParams, useRouter } from 'next/navigation';

// ui
import FormField from '@/ui/foundations/formField';


export default function ClientPage() {
  const searchParams = useSearchParams();

  const couponCodeFromURL = searchParams.get('cc');

  const router = useRouter();

  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [clickedAction, setClickedAction] = useState<string | null>(null);

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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    //if not action return
    if (!clickedAction) return;

    //if user click modify
    if(clickedAction === 'modify') {
        //do something
      }
      //else if user click cancel
    else if (clickedAction === 'cancel') {

        const userCancelConfirmation = window.confirm('Are you sure you want to cancel the reservation?');
        //if userCancelConfirmation is true
        if(userCancelConfirmation) {
          console.log('user confrim to cancel', couponCodeFromURL);
          try {
            const response = await fetch('/api/rsvp/cancel', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ couponCode: couponCodeFromURL }),
            });
            const result = await response.json();
            console.log('result from pageClientReservationAction', result);
            if (result.success) {
              console.log('im inside the result.success');
              router.push('/rsvp/cancel/confirmation');
            } else {
              console.error('Cancel failed:', result.message);
              alert('Something went wrong: ' + result.message);
            }
          } catch (error) {
            console.error('Cancel request failed:', error);
            alert('Something went wrong. Try again later.');
          }

        }


    }


  }

  if (isLoading) {
    return null;
  }

  return (
    <>
      {!isCheckedIn ?
        <section className="w-full p-8">
          <form className="flex flex-col gap-8 w-full" action="/">
            <FormField type='hidden' fieldData={{id: 'couponCode', value: couponCodeFromURL || ''}} />
            <div className="flex flex-col gap-4">
              <FormField type='button' fieldData={{type: 'submit', id: 'btModify', className: 'secondary', value:'Modify'}} />
              <FormField type='button' fieldData={{type: 'submit', id: 'btCancel', className: 'secondary', value:'Cancel Reservation'}} />
            </div>
          </form>
        </section> : ''
      }
      <section className="w-full p-8">
        <form className="flex flex-col gap-8 w-full" onSubmit={handleSubmit}>
          <FormField type='hidden' fieldData={{id: 'couponCode', value: couponCodeFromURL || ''}} />
          <div className="flex flex-col gap-4">
            <button
              type='submit'
              className='button secondary'
              onClick={() => setClickedAction('modify')}
              >Modify
            </button>
            <button
              type='submit'
              className='button secondary'
              onClick={() => setClickedAction('cancel')}
              >Cancel Reservation
            </button>


            {/* <FormField type='button' fieldData={{type: 'submit', id: 'btModify', className: 'secondary', value:'Modify'}} />
            <FormField type='button' fieldData={{type: 'submit', id: 'btCancel', className: 'secondary', value:'Cancel Reservation'}} /> */}
          </div>
        </form>
      </section>
    </>
  );
}
