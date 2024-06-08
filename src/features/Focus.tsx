import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";
import { RoundedButton } from "../components/RoundedButton";
import { FocusProps } from "../utils/types";

export function Focus({ addSubject }: FocusProps) {
  const [subject, setSubject] = useState(null);
  console.log(subject);

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          onChangeText={setSubject}
          label="What would you like to pray for?"
          autoCompleteType={"off"}
        />
        <View style={styles.button}>
          <RoundedButton
            title="+"
            size={50}
            onPress={() => addSubject(subject)}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.2,
  },
  inputContainer: {
    paddingTop: 25,
    gap: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
  textInput: {
    flex: 0.9,
    borderRadius: 5,
  },
  button: {
    justifyContent: "center",
  },
});
