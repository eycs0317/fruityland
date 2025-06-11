'use client';

// react
import {useEffect, useState} from 'react';
import {parseISO, format} from 'date-fns';
import QRCode from 'react-qr-code';

// nextjs
import Image from 'next/image';
import Link from 'next/link';
import {useSearchParams} from 'next/navigation';
// import { useRouter } from 'next/navigation';

// ui
import Heading from '@/ui/foundations/heading';

// Define types for the data fetched from your API route
type ConfirmationDetails = {
  couponCode: string;
  date: string;
  time: string;
  group: string;
  uid: string;
};

type APIResponse = {
  success: boolean;
  message?: string;
  data?: ConfirmationDetails;
};

export default function ClientPage() {
  const searchParams = useSearchParams();

  const couponCodeFromURL = searchParams.get('cc');
  const couponStatus = searchParams.get('status');

  const [confirmationData, setConfirmationData] = useState<ConfirmationDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const domain = typeof window !== 'undefined' ? window.location.origin : '';

  useEffect(() => {
    if (!couponCodeFromURL) {
      setError('Coupon code not found in URL.');
      setIsLoading(false);
      return;
    }

    const fetchConfirmationData = async () => {
      try {
        const response = await fetch(`/api/coupon-details?cc=${couponCodeFromURL}`);
        const result: APIResponse = await response.json();

        const parseISODate = parseISO(result.data?.date || '');
        const formattedDate = format(parseISODate, 'MMMM d, yyyy');

        const parseISOTime = parseISO(result.data?.time || '');
        const formattedTime = format(parseISOTime, 'p');

        if (result.success && result.data) {
          setConfirmationData({...result.data, date: formattedDate,time: formattedTime});
        } else {
          setError(result.message || 'Failed to load confirmation details.');
        }
      } catch {
        setError('An unexpected error occurred while fetching details.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchConfirmationData();
  }, [couponCodeFromURL]);

  // Display loading state
  if (isLoading) {
    return (
      <>
        <section className="w-full p-8 text-center">
          <Heading level={1} content="Loading Your Reservation Details..." className="text-2xl pb-8" />
        </section>
        <section className="relative w-1/3 pb-8 px-8">
          <Image src="/assets/i/icons/spinner.gif" alt="Loading" width="100" height="100" />
        </section>
      </>
    );
  }

  // Display error state
  if (error) {
    return (
      <>
        <section className="w-full p-8 text-center">
          <Heading level={1} content="Error Loading Reservation" className="text-2xl pb-8 text-red-600" />
          <p className="text-lg text-gray-700 mb-8">{error}</p>
          <p className="text-lg text-gray-700"><Link href="/">Go back to homepage.</Link></p>
        </section>
      </>
    );
  }


  // Display data once loaded
  return (
    <>
      <section className="w-full p-8 text-center">
        <Heading level={1} content="Your reservation is confirmed for FruityLand." className="text-2xl pb-8" />
        {(() => {
          if (couponStatus === 'checkedIn') {
            return (
              <p className="text-success-800">This reservation is successfully checked in!</p>
            );
          } else {
            return (
              <p className="text-lg text-gray-700">Present this confirmation at the entrance for event admission.</p>
            );
          }
        })()}
      </section>
      <section className="relative w-1/2 pb-8 px-8">
        <div style={{ height: "auto", margin: "0 auto", maxWidth: "100%", width: "100%" }}>
          {(() => {
            if (couponStatus != 'checkedIn') {
              return (
                <QRCode
                  size={500}
                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                  viewBox={`0 0 500 500`}
                  value={`${domain}/rsvp/confirmation?cc=${confirmationData?.couponCode}`}
                />
              );
            }
          })()}
        </div>
      </section>

      <section className="w-full p-8 bg-white shadow-md rounded-lg mt-4">
        <Heading level={1} content="Booking Details" className="text-xl pb-8" />
        <dl className="space-y-2 text-gray-700">
          <div className="flex justify-between border-b pb-2">
            <dt className="font-bold">Coupon Code:</dt>
            <dd className="text-right">{confirmationData?.couponCode ? confirmationData.couponCode.match(/.{1,4}/g)?.join('-').toUpperCase() : 'N/A'}</dd>
          </div>
          <div className="flex justify-between border-b pb-2">
            <dt className="font-bold">Date:</dt>
            <dd className="text-right">{confirmationData?.date}</dd>
          </div>
          <div className="flex justify-between border-b pb-2">
            <dt className="font-bold">Time:</dt>
            <dd className="text-right">{confirmationData?.time || 'N/A'}</dd>
          </div>
           <div className="flex justify-between border-b pb-2">
            <dt className="font-bold">Participants:</dt>
            <dd className="text-right">2</dd>
          </div>
        </dl>
      </section>
    </>
  );
}