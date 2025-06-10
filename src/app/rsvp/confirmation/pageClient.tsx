'use client';

// react
import {useEffect, useState} from 'react';

// next
import Image from 'next/image';
import {useSearchParams} from 'next/navigation';

// ui
import Heading from '@/ui/foundations/heading';
import FormField from '@/ui/foundations/formField';

import { parseISO, format } from 'date-fns';

import QRCode from 'react-qr-code';
// Define types for the data fetched from your API route
type ConfirmationDetails = {
  couponCode: string;
  date: string;
  time: string; // Add time to the type
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
  console.log('------searchParams at confirmation:------', searchParams);
  const couponCodeFromURL = searchParams.get('cc'); // Get couponCode from URL
  // const apptDate = searchParams.get('date'); // Get date from URL, if needed
  const [confirmationData, setConfirmationData] = useState<ConfirmationDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


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
        console.log('hello result--------', result)

        const parseISODate = parseISO(result.data?.date || '');
        const formattedDate = format(parseISODate, 'MMMM-dd-yy');
        console.log('Formatted -----Date:', formattedDate);

        const parseISOTime = parseISO(result.data?.time || '');
        const formattedTime = format(parseISOTime, 'p')
        if (result.success && result.data) {
          setConfirmationData({...result.data, date: formattedDate,time: formattedTime});

        } else {
          setError(result.message || 'Failed to load confirmation details.');
        }
      } catch (err: Error | unknown) {
        console.error('Error fetching confirmation data:', err);
        setError('An unexpected error occurred while fetching details.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchConfirmationData();
  }, [couponCodeFromURL]); // Re-run effect if couponCodeFromURL changes

  // Display loading state
  if (isLoading) {
    return (
      <main role="main" className="grid justify-self-center justify-items-center w-full md:w-120 p-4">
        <section className="w-full p-8 text-center">
          <Heading level={1} content="Loading Your Reservation Details..." className="text-2xl pb-8" />
        </section>
        <section className="relative w-1/3 pb-8 px-8">
          <Image src="/assets/i/icons/loading.svg" alt="Loading" layout="responsive" width="100" height="100" />
        </section>
      </main>
    );
  }

  // Display error state
  if (error) {
    return (
      <main role="main" className="grid justify-self-center justify-items-center w-full md:w-120 p-4">
        <section className="w-full p-8 text-center">
          <Heading level={1} content="Error Loading Reservation" className="text-2xl pb-8 text-red-600" />
          <p className="text-lg text-gray-700">{error}</p>
        </section>
      </main>
    );
  }

  // Display data once loaded
  return (
    <main role="main" className="grid justify-self-center justify-items-center w-full md:w-120 p-4">
      <section className="w-full p-8 text-center">
        <Heading level={1} content="Your reservation is confirmed for FruityLand." className="text-2xl pb-8" />
        <p className="text-lg text-gray-700">Present this confirmation at the entrance for event admission.</p>
      </section>

      <section className="relative w-1/3 pb-8 px-8">
      <div style={{ height: "auto", margin: "0 auto", maxWidth: "100%", width: "100%" }}>
            <QRCode
              size={256} // Adjust the size as needed. This is the pixel size for the SVG.
              style={{ height: "auto", maxWidth: "100%", width: "100%" }} // Make it responsive
              value={`${confirmationData?.couponCode}:${confirmationData?.date}:${confirmationData?.time}`} // The data to encode
              viewBox={`0 0 256 256`} // Important for SVG scaling
              //Note - need the domain to be added here.
              // value={`${domain}/verify-reservation?cc=${confirmationData?.couponCode}&uid=${confirmationData?.uid}&date=${confirmationData?.date}&time=${confirmationData?.time}`}
            />
          </div>
        {/* <Image src="/assets/i/placeholder/qrCode.svg" alt="QR Code" layout="responsive" width="300" height="300" /> */}
      </section>

      <section className="w-full p-8 bg-white shadow-md rounded-lg mt-4">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Booking Details:</h2>
        <dl className="space-y-2 text-gray-700">
          <div className="flex justify-between border-b pb-2">
            <dt className="font-bold">Coupon Code:</dt>
            <dd className="text-right">{confirmationData?.couponCode || 'N/A'}</dd>
          </div>
          <div className="flex justify-between border-b pb-2">
            <dt className="font-bold">Date:</dt>
            <dd className="text-right">{confirmationData?.date}</dd>
          </div>
          <div className="flex justify-between border-b pb-2">
            <dt className="font-bold">Time:</dt>
            <dd className="text-right">{confirmationData?.time || 'N/A'}</dd>
          </div>
          {/* Add more details if your API returns them, e.g., Participants */}
          {/* Example if your API also sends participantCount: */}
          {/* <div className="flex justify-between border-b pb-2">
            <dt className="font-bold">Participants:</dt>
            <dd className="text-right">{confirmationData?.participantCount || 'N/A'}</dd>
          </div> */}
        </dl>
      </section>

      <section className="w-full p-8">
        <form className="flex flex-col gap-8 w-full" action="/">
          <FormField type='hidden' fieldData={{id: 'couponCode', value: confirmationData?.couponCode || ''}} />
          <div className="flex flex-col gap-4">
            <FormField type='button' fieldData={{type: 'submit', id: 'btModify', className: 'secondary', value:'Modify'}} />
            <FormField type='button' fieldData={{type: 'submit', id: 'btCancel', className: 'secondary', value:'Cancel Reservation'}} />
          </div>
        </form>
      </section>
    </main>
  );
}