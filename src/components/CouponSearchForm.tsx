// src/components/CouponSearchForm.tsx
'use client'; // <-- Essential: This makes this file a Client Component

import React, { useState, useRef } from 'react';
import FormField from '@/ui/foundations/formField'; // Your existing FormField component

export default function CouponSearchForm() {
  const [validationMessage, setValidationMessage] = useState<string | null>(null);
  const [isMessageError, setIsMessageError] = useState<boolean>(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSearchClick = async () => {
    setValidationMessage(null); // Clear previous messages
    setIsMessageError(false);

    // Get the coupon code value from the input field
    // Note: ensure your FormField renders an input with name="couponCode"
    const couponCodeInput = formRef.current?.elements.namedItem('couponCode') as HTMLInputElement;
    const couponCode = couponCodeInput?.value;

    if (!couponCode) {
      setValidationMessage('Please enter a coupon code.');
      setIsMessageError(true);
      return;
    }

    try {
      // Step 1: Call your API route to validate the coupon code
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/validateCoupon`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ couponCode }),
      });

      const result = await response.json();

      if (response.ok && result.isValid) {
        // Step 2: If validation is good, programmatically submit the original form
        // This will send the data to the 'action' URL specified on the form (/api/findCoupon)
        console.log('Coupon code valid, proceeding with form submission.');
        if (formRef.current) {
          formRef.current.submit(); // Submits the form to /api/findCoupon
        }
      } else {
        // Step 3: If validation is bad, render a message on screen
        setValidationMessage(result.message || 'Invalid or expired coupon code.');
        setIsMessageError(true);
      }
    } catch (error) {
      console.error('Error during coupon validation:', error);
      setValidationMessage('An error occurred. Please try again later.');
      setIsMessageError(true);
    }
  };

  return (
    <form ref={formRef} className="flex flex-col gap-8 w-full" action="/api/findCoupon" method="post">
      <div className="flex flex-col gap-4">
        <FormField
          type="input"
          fieldData={{
            type: 'text',
            id: 'couponCode',
            name: 'couponCode', // <--- IMPORTANT: Ensure 'name' attribute is set
            label: 'Coupon Code',
            wrapperClassName: 'w-full',
            isRequired: true,
            placeholder: '1111-2222-3333',
          }}
        />
      </div>
      {/* Display validation message */}
      {validationMessage && (
        <p style={{ color: isMessageError ? 'red' : 'green', marginTop: '-16px' }}>
          {validationMessage}
        </p>
      )}
      <div className="flex flex-col gap-4">
        <FormField
          type='button'
          fieldData={{
            type: 'button', // <--- IMPORTANT: Change type to 'button' to prevent default HTML form submission on click
            id: 'btSearch',
            className: 'primary',
            value: 'Search',
            onClick: handleSearchClick, // <--- Attach the onClick handler here
          }}
        />
      </div>
    </form>
  );
}
