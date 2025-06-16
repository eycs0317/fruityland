## Info for date-fns-tz

https://github.com/marnusw/date-fns-tz/releases/tag/v3.0.0

## Need to do

feed data to rsvp/comfirmtation with date to display. Now only have dumby data

create modifyReservation function @utils/
create cancelReservation function @utils/

Now when input a wrong coupon code on the first page. it redirect to the home page. create a client form that can check the coupon and display a error message on page. no redirect.

formfield not taking react props like onClick, onChange, etc

found bud on /rsvp/time ex: couponcode(2fd55fd01019) date 7/11 after select the time and go to confirmation page. the Time show 7/10

app/rsvp/time - form is calling action={funciton}. that is wrong. react use onSubmit instead of action. turn that function to route?? BUT everything is working??

found bug in db. Schedule->uid with group16 it show 2025-09-02. suppost to be aug 30-31

may be adding coupon# in DB like 1, 2, 3 ,4 ,5

## Live

https://main.d1t1uzsb475px0.amplifyapp.com/

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
# or
npx prisma studio
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
