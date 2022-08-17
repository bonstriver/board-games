import { useCountdown } from './useCountdown'
import TimeDisplay from './TimeDisplay';

export function ExpiredNotice() {
    return (
      <div className="expired-notice">
        <span>Expired!</span>
      </div>
    );
  };

  const ShowCounter = ({ minutes, seconds }) => {
    return (
      <div className="show-counter">
        <a className="countdown-link">
          <TimeDisplay value={minutes} type={'Mins'} isDanger={minutes <= 0} />
          <p>:</p>
          <TimeDisplay value={seconds} type={'Seconds'} isDanger={minutes <= 0} />
        </a>
      </div>
    );
  };

export function Timer ({ targetTime }) {
    const [minutes, seconds] = useCountdown(targetTime);
  
    if (minutes + seconds <= 0) {
      return <ExpiredNotice />;
    } else {
      return (
        <ShowCounter
          minutes={minutes}
          seconds={seconds}
        />
      );
    }
  };