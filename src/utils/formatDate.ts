import { convertTime } from "./convertTime";

export function formatDate(date: Date | null) {
  if (!date) {
    return { formattedDate: "", weekday: "" };
  }

  const formattedDate = new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
    .format(date)
    .replace(/\. /g, " . ")
    .replace(/\.$/, "");

  const weekday = new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(
    date,
  );

  return { formattedDate, weekday };
}

export function formatDateTime(date: string | null) {
  if (!date) {
    return "";
  }

  date = convertTime(date);

  const [fullDate, time] = date.split("T");
  const [y, m, d] = fullDate.split("-");

  // eslint-disable-next-line prefer-const
  let [hour, min] = time.split(":");
  hour = hour.padStart(2, "0");

  const ampm = parseInt(hour, 10) >= 12 ? "PM" : "AM";

  return `${y.slice(2)}.${m}.${d} - ${hour}:${min} ${ampm}`;
}
