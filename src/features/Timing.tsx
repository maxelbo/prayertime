import { View, StyleSheet } from 'react-native';
import { RoundedButton } from '../components/RoundedButton';
import { TimingProps } from '../utils/types';

export function Timing({ title, time, setMinutes }: TimingProps) {
  return (
    <View style={styles.timingButton}>
      <RoundedButton title={title} size={75} onPress={() => setMinutes(time)} />
    </View>
  );
}

const styles = StyleSheet.create({
  timingButton: {
    flex: 1,
    alignItems: 'center',
  },
});
