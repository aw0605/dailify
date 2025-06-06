let timerId;
let elapsedTime = 0;
let startTime = 0;
let isRunning = false;
const MAX_TIME = 86400000;

function intervalStopwatch(initialElapsedTime = 0) {
  if (isRunning) return;
  isRunning = true;
  elapsedTime = initialElapsedTime;
  startTime = Date.now() - elapsedTime;

  timerId = setInterval(() => {
    elapsedTime = Date.now() - startTime;
    if (elapsedTime > MAX_TIME) elapsedTime = MAX_TIME;
    postMessage({ type: "stopwatch", elapsedTime });
  }, 1000);
}

onmessage = function (e) {
  const { type, elapsedTime: initialElapsedTime } = e.data;
  switch (type) {
    case "start-stopwatch":
      intervalStopwatch(initialElapsedTime || elapsedTime);
      break;
    case "pause-stopwatch":
      clearInterval(timerId);
      isRunning = false;
      if (elapsedTime > MAX_TIME) elapsedTime = MAX_TIME;
      postMessage({ type: "stopwatch", elapsedTime });
      break;
  }
};
