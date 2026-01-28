export function formatNumber(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
export function diffYears(dt2, dt1) {
  let diff = (dt2.getTime() - dt1.getTime()) / 1000;
  diff /= 60 * 60 * 24;
  return Math.abs(Math.round(diff / 365.25));
}
export function withdrawAmountWithFees(amount) {
  const fees = withdrawFee(amount);
  return amount - fees;
}
export function withdrawFee(amount) {
  const transFee = 0.75;
  return (amount * 0.01 <= 3 ? 3 : amount * 0.01) + transFee;
}
