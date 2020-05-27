import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';

//view = div (for grouping or laying out children)
//no html elements at all; need to build in react native elements
//cross-platform: when compiled, React Native compiles these components into their native components for iOS/Android

//essential text component props:
// - numberOfLines = max # of lines to display (excess gets truncated w/ ...)
// - onPress = event listener; function for what happens when the element is touched

export default function App() {
  function handlePress() {
    console.log('text pressed');
  }

  return (
    // SafeAreaView adds padding on the top to leave room for the iPhone notch
    <SafeAreaView style={styles.container}>
      <Text numberOfLines={1} onPress={handlePress}>
        Hello React Native!
      </Text>
      <Text>From Liz x</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, //view is flexible - can grow both horiz and vert to fill free space (1 is taking whole screen)
    backgroundColor: 'dodgerblue',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
