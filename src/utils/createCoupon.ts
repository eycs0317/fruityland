
import { randomBytes } from 'crypto';
import { getStartOfDayHongKong, getEndOfDayHongKong } from './hkTimeStartOfTheDay';




const weeks = [
  { start: '2025-07-06', end: '2025-07-12' },
  { start: '2025-07-13', end: '2025-07-19' },
  { start: '2025-07-20', end: '2025-07-26' },
  { start: '2025-07-27', end: '2025-08-02' },
  { start: '2025-08-03', end: '2025-08-09' },
  { start: '2025-08-10', end: '2025-08-16' },
  { start: '2025-08-17', end: '2025-08-23' },
  { start: '2025-08-24', end: '2025-08-30' }
];


interface Coupon {
  code: string;
  week: number;
  startDate: string; // string for now, might need to chagne to Date when insert to database
  endDate: string; // string for now, might need to chagne to Date when insert to database
  used: boolean;
}

const couponsData: Coupon[] = [];

function generateCouponCode(length: number = 10) {
  return randomBytes(length).toString('hex').slice(0, length).toUpperCase();
}

function seedCoupons() {
  for(let weekIndex = 0; weekIndex < 7; weekIndex++) {
    const { start, end } = weeks[weekIndex];
    for (let i = 0; i < 3; i++) {
      const obj = {
        code:  generateCouponCode(10),
        week:  weekIndex + 1,
        startDate: getStartOfDayHongKong(start),
        endDate: getEndOfDayHongKong(end),
        used: false
      }
      couponsData.push(obj)

    }
  }
  return couponsData
}



// model Coupon {
//   id        String   @id @default(cuid())
//   code      String   @unique
//   week      Int
//   startDate DateTime
//   endDate   DateTime
//   createdAt DateTime @default(now())
//   used      Boolean  @default(false)
// }
  export {  generateCouponCode, seedCoupons, couponsData }