const formatTime = (ms: number) => {
  const seconds = Math.floor(ms / 1000);

  const h = Math.floor(seconds / 3600)
    .toString()
    .padStart(2, "0");
  const m = Math.floor((seconds % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");

  return `${h}:${m}:${s}`;
};

export default formatTime;
