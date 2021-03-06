# My notes and example code from [CodeWithMosh React Native Fundamentals]

## Starting/running:
- TO START PROJECT: expo init AppName <- terminal command to create an app
- TO RUN PROJECT: /npm start will serve app w/ expo
- TO DEBUG PROJECT: on phone, shake for dev menu, then hit debug remote JS; opens new tab in chrome, and can use browser console/debugger as normal

## Views:
- `View` = div (for grouping or laying out children)
- no html elements at all; need to build in react native elements
- cross-platform: when compiled, React Native compiles these components into their native components for iOS/Android
- `SafeAreaView` leaves room for iPhone notch; no effect on Android

## Text: 
-Essential text component props:
  - `numberOfLines` = max # of lines to display (excess gets truncated w/ ...)
  - `onPress` = event listener; function for what happens when the element is touched
- Example: 
```js
<Text numberOfLines={1} onPress={handlePress}>
  Hello React Native!
</Text> 
```

## Images:
- Local images: require function w/ path as source, ex: `source={require('./assets/icon.png')}` <- this tells Metro Bundler to include this file w/ our app (increases size of app, so only use static images where necessary!)
- Network images: source w/ object w/ uri, ex: `source={{uri: 'https://picsum.photos/200/300'}}`
- for network images, MUST specify dimensions in source obj (width/height) as well as uri before it'll display
- `loadingIndicatorSource` attribute lets you supply a static local image while the network img is loading
- Image component doesn't have onPress! Need to wrap w/ separate touchable component depending on feedback we want to give to users.
- Example: 
```js
<TouchableHighlight onPress={handlePress} onLongPress={handleLongPress}>
  <Image
    source={{
      uri: 'https://picsum.photos/200/300',
      width: 300,
      height: 200
    }}
  />
</TouchableHighlight>
```

## Touchables:
- Touchable components have `onPress` and `onLongPress` events
- Can wrap around elements that don't have their own onPress (like images)
- Three cross-platform touchable components (cross-platform):
  - `TouchableWithoutFeedback` (no feedback when touched)
  - `TouchableOpacity` (component goes see-thru when touched)
  - `TouchableHighlight` (component goes dark when touched)

## Buttons:
- Buttons are self-closing. Text in it is from title prop.
- Props include:
  - `color` <- text color
  - `title` <- text inside the button
  - `onPress` <- event listener

## Alerts:
- Alert as a function works similarly to browser - pops up a lil window with your message and then ok to close.
- Alert as a component is imported with the other components, but it's an object API with methods (but no visible component, so you can't use it like a normal component, like `<Alert />`)
- Two methods: alert() and prompt()
  - First argument is the `title` (header for alert box)
  - Second argument is `message` for the alert body
  - Third argument is array of buttons; each button is an object with its `text`, `style`, and `onPress` event
- Example with basic alert method: 
```js
Alert.alert('titleTextHere', 'message', [
        {text: "button text", onPress: ()=>{}}, 
        {text: "other button text",  onPress: ()=>{}}
    ]
)
```
- Example with prompt method: 
```js
Alert.prompt('titleTextHere', 'message', (text)=>{
    // fx here that does something w/ the text the user inputted
    console.log(text)
    })`
```

## StyleSheet:
- Passed to component using `style` prop; ex: `<SafeAreaView style={styles.container}>`
- Styles inside are JS, not CSS!
- Advantages over plain JS object passed to `style` prop:
  - Validates style properties before passing to components (checks for typos)
  - More optimized
- Example:
```js
const styles = StyleSheet.create({
  container: {
    flex: 1, //view is flexible - can grow both horiz and vert to fill free space (1 is taking whole screen)
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
```
- Can put where `StyleSheet` is called/used in separate file and then export/import

## Platform module:
- Import as `Platform` from react-native
- Example:
```js
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
```

## StatusBar API
- Import as `StatusBar` from react-native
- `currentHeight` method detects height of status bar 

