'use client';

// react
import {useEffect, useState} from 'react';
import {parseISO, format, addMinutes} from 'date-fns';
import QRCode from 'react-qr-code';

// nextjs
import Image from 'next/image';
import Link from 'next/link';
import {useSearchParams} from 'next/navigation';

// ui
import Heading from '@/ui/foundations/heading';

// utils
import {l10n} from '@/utils/l10n';

// Define types for the data fetched from your API route
type ConfirmationDetails = {
  couponCode: string;
  date: string;
  time: string;
  timeFinal: string;
  group: string;
  uid: string;
};
type ConfirmationWalkInDetails = {
  couponCode: string;
};

type APIResponse = {
  success: boolean;
  message?: string;
  data?: ConfirmationDetails;
};

export default function ClientPage({ lang }: { lang: string }) {

  const searchParams = useSearchParams();

  const couponCodeFromURL = searchParams.get('cc');
  const checkInStatus = searchParams.get('status');

  const [confirmationData, setConfirmationData] = useState<ConfirmationDetails | null>(null);
  const [confirmationWalkInData, setConfirmationWalkInData] = useState<ConfirmationWalkInDetails | null>(null);
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
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/coupon-details?cc=${couponCodeFromURL}`);
        const result: APIResponse = await response.json();

        if (result.success && result.data) {
          const parseISODate = parseISO(result.data?.date || '');
          const formattedDate = format(parseISODate, 'MMMM d, yyyy');

          const parseISOTime = parseISO(result.data?.time || '');
          const formattedTime = format(parseISOTime, 'HH:mm');

          const finalTime = addMinutes(parseISOTime, 20);
          const formattedFinalTime = format(finalTime, 'HH:mm');
          setConfirmationData({...result.data, date: formattedDate, time: formattedTime, timeFinal: formattedFinalTime});
        } else {
          setConfirmationWalkInData({couponCode:couponCodeFromURL});
        }
      } catch {
        setError('An unexpected error occurred while fetching details.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchConfirmationData();
  }, [couponCodeFromURL]);

  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const fetchCheckInStatus = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/rsvp/getCheckInStatus?cc=${couponCodeFromURL}`);
    const result = await response.json();

    if (result.data.status) {
      setIsCheckedIn(true);
    } else {
      setIsCheckedIn(false);
    }
  };
  fetchCheckInStatus();

  // Display loading state
  if (isLoading) {
    return (
      <>
        <section className="w-full p-8 text-center">
          <Heading level={1} content={l10n('rsvp', 'content-loading', lang)} className="text-2xl pb-8 text-neutral-000" />
        </section>
        <section className="relative w-1/3 pb-8 px-8">
          <Image src="/assets/i/icons/spinner.gif" alt={l10n('rsvp', 'content-loading', lang)} width="100" height="100" />
        </section>
      </>
    );
  }

  // Display error state
  if (error) {
    return (
      <>
        <section className="w-full p-8 text-center">
          <Heading level={1} content={l10n('rsvp', 'error-001', lang)} className="text-2xl pb-8 text-red-600" />
          <p className="text-lg text-neutral-000 mb-8">{error}</p>
          <p className="text-lg text-neutral-000"><Link href="/">{l10n('rsvp', 'error-002', lang)}</Link></p>
        </section>
      </>
    );
  }

  if (confirmationWalkInData) {
    return (
      <>
        <section className="w-full p-8 text-center">
          <Heading level={1} content={(isCheckedIn) ? 'Walk-in session is checked in.' : 'Coupon details for FruityLand.'} className="text-2xl pb-8" />
          {(() => {
            if (isCheckedIn) {
              return (
                <p className="text-success-800">Check in completed with this coupon.</p>
              );
            }
          })()}
        </section>

        <section className="w-full p-8 bg-white shadow-md rounded-lg mt-4">
          <Heading level={1} content="Booking Details" className="text-xl pb-8" />
          <dl className="space-y-2 text-gray-700">
            <div className="flex justify-between border-b pb-2">
              <dt className="font-bold">{l10n('rsvp', 'content-confirmation-003', lang)}:</dt>
              <dd className="text-right">{confirmationWalkInData.couponCode ? confirmationWalkInData.couponCode.toUpperCase() : 'N/A'}</dd>
            </div>
             <div className="flex justify-between border-b pb-2">
              <dt className="font-bold">{l10n('rsvp', 'content-confirmation-006', lang)}:</dt>
              <dd className="text-right">2</dd>
            </div>
          </dl>
        </section>
      </>
    );
  }

  // Display data once loaded
  if (confirmationData) {
    return (
      <div className="m-4 bg-neutral-000 border border-primary-300 mb-4 text-neutral-000 border-4 rounded-2xl">
        <section className="w-full p-8 pb-4 text-center">
          <Heading level={1} content={(isCheckedIn) ? l10n('rsvp', 'title-checked-in', lang) : l10n('rsvp', 'title-confirmation', lang)} className="text-4xl text-primary-700" />
        </section>

        {(() => {
          if (checkInStatus && checkInStatus === 'rsvp') {
            return (
              <section className="w-full pb-4 px-4">
                <div className="flex flex-col justify-items-center px-8">
                  <Heading level={2} content={l10n('rsvp', 'content-confirmation-009', lang)} className="text-2xl text-primary-900 text-center" />
                </div>
              </section>
            );
          }
        })()}

        <section className="w-full pb-4 px-8">
          <div className="flex justify-center px-8">
            {(() => {
              if (!isCheckedIn) {
                return (
                  <QRCode
                    size={500}
                    style={{ height: "auto", maxWidth: "100%", width: "50%" }}
                    viewBox={`0 0 500 500`}
                    value={`${domain}/rsvp/confirmation?cc=${confirmationData?.couponCode}`}
                  />
                );
              }
            })()}
          </div>
        </section>

        <section className="w-full p-4 pt-0 bg-white shadow-md rounded-lg">
          {/*<Heading level={1} content={l10n('rsvp', 'content-confirmation-002', lang)} className="text-xl pb-8" />*/}
          <dl className="space-y-2 text-gray-700">
            <div className="flex justify-between pb-2 text-primary-700 px-5">
              <dt className="font-bold">{l10n('rsvp', 'content-confirmation-003', lang)}</dt>
              <dd className="text-right">{confirmationData?.couponCode ? confirmationData.couponCode.toUpperCase() : 'N/A'}</dd>
            </div>
             <div className="rsvpDetailsConfirmed flex border-b pb-2 items-center">
              <dt className="font-bold pl-4"><Image src="/assets/i/icons/participants-dark.svg" alt={l10n('rsvp', 'content-confirmation-006', lang)} width="30" height="30" /></dt>
              <dd className="font-bold pl-4">{l10n('rsvp', 'content-confirmation-007', lang)}</dd>
            </div>
            <div className="rsvpDetailsConfirmed flex border-b pb-2 items-center">
              <dt className="font-bold pl-4"><Image src="/assets/i/icons/date-dark.svg" alt={l10n('rsvp', 'content-confirmation-004', lang)} width="30" height="30" /></dt>
              <dd className="font-bold pl-4">{confirmationData?.date}</dd>
            </div>
            <div className="rsvpDetailsConfirmed flex border-b pb-2 items-center">
              <dt className="font-bold pl-4"><Image src="/assets/i/icons/time-dark.svg" alt={l10n('rsvp', 'content-confirmation-005', lang)} width="30" height="30" /></dt>
              <dd className="font-bold pl-4">{confirmationData?.time} - {confirmationData?.timeFinal}</dd>
            </div>
          </dl>
          {(() => {
            if (isCheckedIn) {
              return (
                <p className="text-success-800 pt-4">{l10n('rsvp', 'content-checked-in-001', lang)}</p>
              );
            } else {
              return (
                <p className="text-lg text-primary-700 mt-4">{l10n('rsvp', 'content-confirmation-001', lang)}</p>
              );
            }
          })()}
          {(() => {
            if (!isCheckedIn) {
              return (
                <p className="text-lg text-primary-700">{l10n('rsvp', 'content-confirmation-008', lang)}</p>
              );
            }
          })()}
        </section>
      </div>
    );
  }
}
