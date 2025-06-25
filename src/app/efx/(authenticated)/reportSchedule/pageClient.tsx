'use client';

// react
import {useEffect, useState} from 'react';

// nextjs
import Image from 'next/image';
import Link from 'next/link';

// ui
import Heading from '@/ui/foundations/heading';

// utils
import {formatInUserTimezone} from '@/utils/formatInUserTimezone';

// Define types for the data fetched from your API route
type ReportDetails = {
  sessionDateTime: string;
  group: string;
  isBooked: string;
};

type APIResponse = {
  success: boolean;
  message?: string;
  data?: ReportDetails[];
};

export default function ClientPage() {
  const [reportData, setReportData] = useState<ReportDetails[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReportData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/efx/reportSchedule`);
        const result: APIResponse = await response.json();

        if (result.success && result.data) {
          setReportData(result.data);
        }
      } catch {
        setError('An unexpected error occurred while fetching report.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchReportData();
  }, []);

  // Display loading state
  if (isLoading) {
    return (
      <>
        <section className="w-full p-8 text-center">
          <Heading level={1} content="Loading Report" className="text-2xl pb-8 text-neutral-000" />
        </section>
        <section className="relative w-1/3 pb-8 px-8">
          <Image src="/assets/i/icons/spinner.gif" alt="Loading Report" width="100" height="100" />
        </section>
      </>
    );
  }

  // Display error state
  if (error) {
    return (
      <>
        <section className="w-full p-8 text-center">
          <Heading level={1} content="Error Loading Report" className="text-2xl pb-8 text-red-600" />
          <p className="text-lg text-neutral-000 mb-8">{error}</p>
          <p className="text-lg text-neutral-000"><Link href="/efx/dashboard">Go back to EFX Dashboard.</Link></p>
        </section>
      </>
    );
  }

  // Display data once loaded
  if (reportData) {
    return (
      <div className="w-full m-0 bg-neutral-000 border border-primary-300 mb-4 text-neutral-000 border-4 rounded-2xl">
        <section className="w-full p-8 pb-4 text-center">
          <Heading level={1} content="Schedule List" className="text-4xl text-primary-700 text-neutral-000" />
        </section>

        <section className="w-full p-4 pt-0 bg-white shadow-md rounded-lg">
          <table>
            <thead className="text-neutral-900">
              <tr>
                <th className="pr-6 text-left">Date</th>
                <th className="pr-6 text-left">Time</th>
                <th className="pr-6 text-left">Group</th>
                <th className="pr-6 text-left">Booked</th>
              </tr>
            </thead>
            <tbody className="text-neutral-900">
              {reportData.map((reportData, index) => (
                <tr key={index}>
                  <td className="pr-6">{formatInUserTimezone(reportData.sessionDateTime, 'Asia/Hong_Kong', 'MMMM d')}</td>
                  <td className="pr-6">{formatInUserTimezone(reportData.sessionDateTime, 'Asia/Hong_Kong', 'HH:mm')}</td>
                  <td className="pr-6">{reportData.group}</td>
                  <td className="pr-6">{(reportData.isBooked) ? 'Yes' : 'No'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    );
  }
}
