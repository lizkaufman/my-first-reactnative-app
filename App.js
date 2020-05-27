import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

//view is like div
//when compiled, React Native compiles these components into their native components for iOS/Android

export default function App() {
  let x = 1;

  return (
    <View style={styles.container}>
      <Text>Hello React Native!</Text>
      <Text>From Liz x</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
