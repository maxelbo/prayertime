import { View, Text, StyleSheet, FlatList } from 'react-native';
import { colors } from '@/utils/styleVariables';
import { fontSizes, spacing } from '@/utils/styleVariables';

export function FocusHistory({ history }) {
  if (!history || !history.length) {
    return (
      <View style={styles.container}>
        <Text style={styles.item}>No prayers yet.</Text>
      </View>
    );
  }

  function renderItem({ item }) {
    return <Text style={styles.item}>- {item}</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Prayer History</Text>
      <FlatList data={history} renderItem={renderItem} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
    flex: 1,
  },
  title: {
    color: colors.white,
    fontSize: fontSizes.lg,
    fontWeight: 'bold',
  },
  item: {
    fontSize: fontSizes.md,
    color: colors.white,
  },
});
