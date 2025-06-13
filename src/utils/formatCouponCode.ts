export function formatCouponCode(couponCode: string) {
  const formattedCouponCode = couponCode.replace(/[^a-fA-F0-9]/g, '');
  return formattedCouponCode.padStart(8, '0').slice(0, 8).toLowerCase();
}
