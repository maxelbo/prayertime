import { useState } from "react";
import { SafeAreaView, StyleSheet, Platform, StatusBar } from "react-native";
import { Focus } from "@/features/Focus";
import { FocusHistory } from "@/features/FocusHistory";
import { Timer } from "@/features/Timer";
import ContextProvider from "@/context/GlobalContext";
import { colors } from "@/utils/styleVariables";

export default function App() {
  const [currentSubject, setCurrentSubject] = useState(null);
  const [history, setHistory] = useState([]);

  return (
    <SafeAreaView style={styles.container}>
      <ContextProvider>
        <StatusBar barStyle="light-content" />
        {!currentSubject ? (
          <>
            <Focus addSubject={setCurrentSubject} />
            <FocusHistory history={history} />
          </>
        ) : (
          <Timer
            focusSubject={currentSubject}
            onTimerEnd={(subject: string) => {
              setHistory([...history, subject]);
            }}
            clearSubject={() => setCurrentSubject(null)}
          />
        )}
      </ContextProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    color: colors.white,
    backgroundColor: colors.backgroundColor,
  },
});
