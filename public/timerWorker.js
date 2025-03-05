let timerId;
let remainingTime = 0;
let endTime = 0;

function intervalTimer(timeout) {
  const start = Date.now();
  endTime = start + remainingTime;

  timerId = setInterval(() => {
    const now = Date.now();
    const timeLeft = endTime - now;
    if (timeLeft <= 0) {
      postMessage({ type: "timer-end" });
      clearInterval(timerId);
      return;
    }
    remainingTime = timeLeft;
    postMessage({ type: "timer", timeLeft });
  }, timeout);
}

onmessage = function (e) {
  const { type, target } = e.data;
  switch (type) {
    case "start-timer":
      remainingTime = target;
      intervalTimer(1000);
      break;
    case "pause-timer":
      clearInterval(timerId);
      break;
    case "resume-timer":
      intervalTimer(1000);
      break;
  }
};
