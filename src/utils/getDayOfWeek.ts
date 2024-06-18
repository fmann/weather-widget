export default function getDayOfWeek(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleString("default", { weekday: "long" });
}
