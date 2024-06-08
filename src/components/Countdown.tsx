import { useEffect, useState, useRef, useContext } from 'react';
import { Text, StyleSheet } from 'react-native';
import { colors } from '../utils/styleVariables';
import { fontSizes, spacing } from '../utils/styleVariables';
import { GlobalContext } from '../context/GlobalContext';
import { CountdownProps } from '../utils/types';

const minutesToMillis = (min: number) => min * 1000 * 60;
const formatTime = (time: number) => (time < 10 ? `0${time}` : time);

export function Countdown({
  minutes = 0.1,
  isPaused,
  onStart = () => {},
  onPause = () => {},
  onEnd = () => {},
}: CountdownProps) {
  const [_, setProgress] = useContext(GlobalContext);
  const [millis, setMillis] = useState(minutesToMillis(minutes));
  const interval = useRef(null);

  function reset() {
    setMillis(minutesToMillis(minutes));
  }

  function countDown() {
    setMillis((time) => {
      if (time === 0) {
        clearInterval(interval.current);
        onEnd(reset);
        return time;
      }
      const timeLeft = time - 1000;
      setProgress(timeLeft / minutesToMillis(minutes));
      return timeLeft;
    });
  }

  useEffect(() => {
    setMillis(minutesToMillis(minutes));
  }, [minutes]);

  useEffect(() => {
    if (isPaused) {
      onPause();
      if (interval.current) clearInterval(interval.current);
      return;
    }
    onStart();
    interval.current = setInterval(countDown, 1000);

    return () => clearInterval(interval.current);
  }, [isPaused]);

  const minute = Math.floor(millis / 1000 / 60) % 60;
  const seconds = Math.floor(millis / 1000) % 60;
  return (
    <Text style={styles.text}>
      {formatTime(minute)}:{formatTime(seconds)}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: fontSizes.xxxl,
    fontWeight: 'bold',
    color: colors.white,
    padding: spacing.lg,
    // backgroundColor: colors.primary,
  },
});
