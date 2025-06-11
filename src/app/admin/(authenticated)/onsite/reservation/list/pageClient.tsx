'use client';

// react
import {useEffect, useState} from 'react';

// nextjs
import Image from 'next/image';
import Link from 'next/link';
import {useSearchParams} from 'next/navigation';

// ui
import Heading from '@/ui/foundations/heading';

// type EventDetails = {
//   group: string;
// };

export default function ClientPage() {
  const searchParams = useSearchParams();

  const eventDate = searchParams.get('eventDate');
  // const eventDateISO = new Date(eventDate);

  // const [eventData, setEventData] = useState<EventDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!eventDate) {
      setError('Event date not found in URL.');
      setIsLoading(false);
      return;
    }

    const fetchEventData = async () => {
      try {
        // const eventResults = await prisma.schedule.findMany({
        //   where: {
        //     sessionDateTime: {
        //       gte: startOfDay(eventDateISO),
        //       lte: endOfDay(eventDateISO),
        //     },
        //   },
        // });


        // if (eventResults.length > 0) {
        //   setConfirmationData({...eventResults});
        // } else {
        //   setError(result.message || 'Failed to load event details.');
        // }
      } catch {
        setError('An unexpected error occurred while fetching details.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchEventData();
  }, [eventDate]);

  // Display loading state
  if (isLoading) {
    return (
      <>
        <section className="w-full p-8 text-center">
          <Heading level={1} content="Loading Your Events..." className="text-2xl pb-8" />
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
          <Heading level={1} content="Error Loading Events" className="text-2xl pb-8 text-red-600" />
          <p className="text-lg text-gray-700 mb-8">{error}</p>
          <p className="text-lg text-gray-700"><Link href="/">Go back to homepage.</Link></p>
        </section>
      </>
    );
  }

  // Display data once loaded
  return (
    <>
      <section className="w-full p-8">
        <Heading level={1} content="Reservation List" className="text-4xl pb-8" />
      </section>
      <section className="w-full p-8">
        <table className="w-full">
          <thead>
            <tr>
              <th className="p-2 text-left">Time</th>
              <th className="p-2 text-left">Coupon Code</th>
              <th className="p-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2">11:00am</td>
              <td className="p-2">1F4A-671B-43AE</td>
              <td className="p-2">Confirmed</td>
            </tr>
            <tr>
              <td className="p-2">11:00am</td>
              <td className="p-2">1F4A-671B-44AE</td>
              <td className="p-2">Confirmed</td>
            </tr>
            <tr>
              <td className="p-2">12:00pm</td>
              <td className="p-2">1F4A-671B-45AE</td>
              <td className="p-2">Confirmed</td>
            </tr>
            <tr>
              <td className="p-2">12:00pm</td>
              <td className="p-2">1F4A-671B-46AE</td>
              <td className="p-2">Confirmed</td>
            </tr>
            <tr>
              <td className="p-2">1:00pm</td>
              <td className="p-2">1F4A-671B-47AE</td>
              <td className="p-2">Confirmed</td>
            </tr>
            <tr>
              <td className="p-2">1:00pm</td>
              <td className="p-2">1F4A-671B-48AE</td>
              <td className="p-2">Confirmed</td>
            </tr>
          </tbody>
        </table>
      </section>
    </>
  );
}