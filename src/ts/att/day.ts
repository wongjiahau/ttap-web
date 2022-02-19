export function ParseDay(input: string) {
  const days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
  return days.indexOf(input.toLowerCase()) + 1;
}
