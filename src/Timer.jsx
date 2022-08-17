import { useCountdown } from './useCountdown'
import TimeDisplay from './TimeDisplay';

const ExpiredNotice = () => {
    return (
      <div className="expired-notice">
        <span>Expired!!!</span>
        <p>Please select a future date and time.</p>
      </div>
    );
  };

  const ShowCounter = ({ minutes, seconds }) => {
    return (
      <div className="show-counter">
        <a
          className="countdown-link"
        >
          <TimeDisplay value={minutes} type={'Mins'} isDanger={minutes <= 0} />
          <p>:</p>
          <TimeDisplay value={seconds} type={'Seconds'} isDanger={minutes <= 0} />
        </a>
      </div>
    );
  };

const Timer = ({ targetDate }) => {
    const [minutes, seconds] = useCountdown(targetDate);
  
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

export default Timer;