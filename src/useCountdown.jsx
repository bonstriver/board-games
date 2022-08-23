import { useEffect, useState } from 'react';

const useCountdown = (targetTime) => {
  const countdownTime = new Date(targetTime).getTime();

  const [countdown, setCountDown] = useState(
    countdownTime - new Date().getTime()
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown(countdownTime - new Date().getTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [countdownTime]);

  return getReturnValues(countdown);
};

const getReturnValues = (countdown) => {
  // calculate time left
  const minutes = Math.floor((countdown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countdown % (1000 * 60)) / 1000);

  return [minutes, seconds];
};

export { useCountdown };