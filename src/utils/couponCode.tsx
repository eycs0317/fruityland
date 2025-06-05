export function formatCouponCodeRaw(couponCode: string) {
  const numberOnly = couponCode.replace(/\D/g, '');
  const match = numberOnly.match(/^(\d{10})/);
  if (match) {
    return match[1];
  }
  return couponCode;
}

export function formatCouponCode(couponCode: string) {
  const numberOnly = couponCode.replace(/\D/g, '');
  const match = numberOnly.match(/^(\d{4})(\d{4})(\d{4})/);
  if (match) {
    return match[1] + '-' + match[2] + '-' + match[3];
  }
  return couponCode;
}