'use client';

// react
import {useEffect, useState} from 'react';

// next
import Image from 'next/image';
import {useSearchParams} from 'next/navigation';

// ui
import Heading from '@/ui/foundations/heading';
import FormField from '@/ui/foundations/formField';

export type CouponCodeType = {
  couponCode: string;
  participantCount: number;
  isRSVP: boolean;
  status: number;
  updatedAt: Date;
  createdAt: Date;
};

type RSVPResponse = {
  message: string;
  data: CouponCodeType | null;
};

export default function ClientPage() {  
  const searchParams = useSearchParams();
  const couponCode = searchParams.get('cc');
  const [rsvp, setRSVP] = useState<RSVPResponse | null>(null);

  useEffect(() => {
    if (couponCode) {
      fetch('/api/rsvp/confirmation?couponCode=' + couponCode)
        .then(res => res.json())
        .then(json => {
          setRSVP(json);
        })
    }
  }, [couponCode]);

  if (!rsvp) {
    return <p>Loading reservation</p>;
  }
  if (!rsvp.data) {
    return <p>Reservation not found</p>;
  }

  return (
    <>
      <section className="w-full p-8">
        <Heading level={1} content="Your reservation is confirmed for FruityLand." className="text-2xl pb-8" />
        <dl className="flex flex-row">
          <dt className="font-bold pr-2">Date:</dt>
          <dd>July 27, 2025</dd>
        </dl>
        <dl className="flex flex-row">
          <dt className="font-bold pr-2">Time:</dt>
          <dd>1:00pm</dd>
        </dl>
        <dl className="flex flex-row pb-4">
          <dt className="font-bold pr-2">Participants:</dt>
          <dd>{rsvp.data.participantCount}</dd>
        </dl>
        <div className="flex flex-row pb-4">
          <dl className="flex flex-col flex-2">
            <dt className="font-bold flex-1">Coupon Code:</dt>
            <dd className="flex-5">{couponCode}</dd>
          </dl>
          <div className="flex flex-row flex-1">
            <Image src="/assets/i/placeholder/qrCode.svg" alt="QR Code" width="300" height="300" />
          </div>
        </div>
        <p>Present this confirmation at the entrance for event admission.</p>
      </section>
      <section className="w-full p-8">
        <form className="flex flex-col gap-8 w-full" action="/">
          <FormField type='hidden' fieldData={{id: 'couponCode', value: couponCode}} />
          <div className="flex flex-col gap-4">
            <FormField type='button' fieldData={{type: 'submit', id: 'btModify', className: 'secondary', value:'Modify'}} />
            <FormField type='button' fieldData={{type: 'submit', id: 'btCancel', className: 'secondary', value:'Cancel Reservation'}} />
          </div>
        </form>
      </section>
    </>
  );
}
