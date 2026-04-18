export function computeDigitSum(value: string): number {
  return value.split("").reduce((sum, ch) => {
    const n = Number.parseInt(ch, 10);
    return Number.isFinite(n) ? sum + n : sum;
  }, 0);
}
