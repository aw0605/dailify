export function calcRankChange(previousRank?: number, currentRank?: number) {
  if (!previousRank || !currentRank) {
    return { msg: null, status: null };
  }

  const diff = previousRank - currentRank;

  if (diff > 0) {
    return { msg: `${diff}위 up!`, status: "up" };
  } else if (diff < 0) {
    return { msg: `${Math.abs(diff)}위 down!`, status: "down" };
  } else {
    return { msg: "변동 없음", status: "same" };
  }
}
