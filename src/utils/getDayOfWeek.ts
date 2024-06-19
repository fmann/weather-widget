export default function getDayOfWeek(dateString: string): string {
  const today = new Date();
  today.setUTCHours(10);
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const todayAsISO8601Date = `${year}-${month}-${day}`;

  if (dateString === todayAsISO8601Date) {
    return "Today";
  }

  const date = new Date(dateString);
  date.setUTCHours(10);
  return date.toLocaleString("default", { weekday: "long" });
}
