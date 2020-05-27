import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TouchableHighlight,
  View,
  Image,
  SafeAreaView,
} from 'react-native';

//view = div (for grouping or laying out children)
//no html elements at all; need to build in react native elements
//cross-platform: when compiled, React Native compiles these components into their native components for iOS/Android

//Essential text component props:
// - numberOfLines = max # of lines to display (excess gets truncated w/ ...)
// - onPress = event listener; function for what happens when the element is touched

//Local images: require function w/ path as source, ex: source={require('./assets/icon.png')}
//Network images: source w/ object w/ uri, ex: source={{uri: 'https://picsum.photos/200/300'}}

//Touchable components have onPress and onLongPress events

//Three cross-platform touchable components:
// - TouchableWithoutFeedback (no feedback when touched)
// - TouchableOpacity (component goes see-thru when touched)
// - TouchableHighlight (component goes dark when touched)

export default function App() {
  function handlePress() {
    console.log('you pressed it');
  }

  function handleLongPress() {
    console.log('you pressed it for a long time');
  }

  return (
    // SafeAreaView adds padding on the top to leave room for the iPhone notch
    <SafeAreaView style={styles.container}>
      <Text numberOfLines={1} onPress={handlePress}>
        Hello React Native!
      </Text>
      {/*Image component doesn't have onPress! Need to wrap w/ separate touchable component depending on feedback we want to give to users. */}
      <TouchableHighlight onPress={handlePress} onLongPress={handleLongPress}>
        <Image
          source={{
            uri: 'https://picsum.photos/200/300',
            width: 300,
            height: 200, //for network images, have to specify dimensions before it'll display
          }}
        />
      </TouchableHighlight>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, //view is flexible - can grow both horiz and vert to fill free space (1 is taking whole screen)
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
