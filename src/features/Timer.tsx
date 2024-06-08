import { useContext, useState } from "react";
import { View, Text, Vibration, StyleSheet } from "react-native";
import { ProgressBar, TextInput } from "react-native-paper";
import { useKeepAwake } from "expo-keep-awake";
import { Countdown } from "../components/Countdown";
// import { Timing } from "./Timing";
import { RoundedButton } from "../components/RoundedButton";
import { GlobalContext } from "../context/GlobalContext";
import { TimerProps } from "../utils/types";
import { colors, spacing } from "../utils/styleVariables";

// Vibration Pattern
const ONE_SECOND_IN_MS = 1000;

const PATTERN = [
  1 * ONE_SECOND_IN_MS,
  2 * ONE_SECOND_IN_MS,
  3 * ONE_SECOND_IN_MS,
  4 * ONE_SECOND_IN_MS,
  5 * ONE_SECOND_IN_MS,
];

export function Timer({ focusSubject, onTimerEnd, clearSubject }: TimerProps) {
  useKeepAwake();
  const [isStarted, setIsStarted] = useState(false);
  const [minutes, setMinutes] = useState<number | null>(null);
  const [progress, setProgress] = useContext(GlobalContext);

  function onEnd(reset: () => void) {
    Vibration.vibrate(PATTERN);
    setIsStarted(false);
    setProgress(1);
    reset();
    onTimerEnd(focusSubject);
  }

  function handleMinutesChange(text: string) {
    const value = parseFloat(text);
    setMinutes(isNaN(value) ? null : value);
  }

  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <Countdown
          minutes={minutes !== null ? minutes : 0}
          onStart={() => {}}
          onPause={() => {}}
          isPaused={!isStarted}
          onEnd={onEnd}
        />
        <View>
          <Text style={styles.title}>Praying for:</Text>
          <Text style={styles.task}>{focusSubject}</Text>
        </View>
      </View>
      <View style={{ paddingTop: spacing.sm }}>
        <ProgressBar
          progress={progress}
          color={colors.primary}
          style={{ height: spacing.sm }}
        />
      </View>
      <View style={styles.timingWrapper}>
        <TextInput
          keyboardType="numeric"
          style={{ flex: 1, borderRadius: 5 }}
          onChangeText={handleMinutesChange}
          autoCompleteType="off"
        />
        {!isStarted ? (
          <RoundedButton
            size={65}
            title="start"
            onPress={() => minutes !== null && setIsStarted(true)}
          />
        ) : (
          <RoundedButton
            size={65}
            title="pause"
            onPress={() => setIsStarted(false)}
          />
        )}
        {/* <Timing title="00:05" time={0.09} setMinutes={setMinutes} />
        <Timing title="00:15" time={0.25} setMinutes={setMinutes} />
        <Timing title="01:00" time={1} setMinutes={setMinutes} /> */}
      </View>
      {/* <View style={styles.buttonWrapper}>
        {!isStarted ? (
          <RoundedButton
            title="start"
            onPress={() => minutes !== null && setIsStarted(true)}
          />
        ) : (
          <RoundedButton title="pause" onPress={() => setIsStarted(false)} />
        )}
      </View> */}
      <View style={styles.clearWrapper}>
        <RoundedButton title="clear" size={65} onPress={clearSubject} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  countdown: {
    flex: 0.6,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: colors.white,
    fontWeight: "bold",
    textAlign: "center",
  },
  task: {
    color: colors.white,
    textAlign: "center",
  },
  defaultText: {
    color: colors.white,
    fontSize: 24,
    textAlign: "center",
  },
  timingWrapper: {
    flex: 0.2,
    gap: spacing.md,
    flexDirection: "row",
    padding: spacing.xxl,
    justifyContent: "center",
    alignItems: "center",
  },
  // buttonWrapper: {
  //   flex: 0.3,
  //   flexDirection: "row",
  //   padding: spacing.md,
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  clearWrapper: {
    flex: 0.2,
    flexDirection: "row",
    padding: spacing.xxl,
    justifyContent: "center",
  },
});
