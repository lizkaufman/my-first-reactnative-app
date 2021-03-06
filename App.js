import React from "react";
import {
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TouchableHighlight,
  View,
  Image,
  SafeAreaView,
  Button,
  Alert,
} from "react-native";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Button
        color="orange"
        title="Click Me"
        onPress={() =>
          Alert.alert("Stay alert!", "Your country needs more lerts.", [
            {
              text: "Um, okay.",
              onPress: () => alert("You can't see a virus!"),
            },
            {
              text: "No. That doesn't work for a virus.",
              onPress: () => alert("Exactly!"),
            },
          ])
        }
      />
      <Button
        color="dodgerblue"
        title="Click Me Next"
        onPress={() =>
          Alert.prompt("What do you think?", "Tell me your thoughts.", (text) =>
            alert(`You're thinking "${text}"`)
          )
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, //view is flexible - can grow both horiz and vert to fill free space (1 is taking whole screen)
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
