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
