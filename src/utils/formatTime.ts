const formatTime = (ms: number, isShort: boolean = false) => {
  const seconds = Math.floor(ms / 1000);

  const h = Math.floor(seconds / 3600)
    .toString()
    .padStart(2, "0");
  const m = Math.floor((seconds % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");

  if (isShort) {
    // 00h 00m 형태
    return `${h}h ${m}m`;
  } else {
    // 00:00:00 형태
    return `${h}:${m}:${s}`;
  }
};

export default formatTime;
