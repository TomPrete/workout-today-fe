// create count down timer component
const CountDownTimer = ({ time, setTime }) => {
  const [seconds, setSeconds] = useState(time);
  const [isActive, setIsActive] = useState(false);

  function toggle() {
    setIsActive(!isActive);
  }

  function reset() {
    setSeconds(time);
    setIsActive(false);
  }

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds - 1);
      }, 1000);
    }
    if (seconds === 0) {
      clearInterval(interval);
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const secondsToMinutes = (seconds) => {
    let minutes = Math.floor(seconds / 60);
    let secondsLeft = seconds % 60;
    return [minutes, secondsLeft];
  };

  return (
    <div>
      {
        isActive
        ?
        <div>
          <p>{seconds}</p>
          <button onClick={() => setIsActive(false)}>Pause</button>
        </div>
        :
        <div>
          <p>{seconds}</p>
          <button onClick={() => setIsActive(true)}>Start</button>
        </div>
      }
    </div>
  )
}
