My notes from [CodeWithMosh React Native Fundamentals](https://codewithmosh.com/p/the-ultimate-react-native-course-part1?_ga=2.91864024.353588028.1615025430-233404291.1615025430):

- [Fundamental concepts](#fundamental-concepts)
  - [Starting/running](#startingrunning)
  - [Views](#views)
  - [Text:](#text)
  - [Images](#images)
  - [Touchables](#touchables)
  - [Buttons](#buttons)
  - [Alerts](#alerts)
  - [StyleSheet](#stylesheet)
  - [Platform](#platform)
  - [StatusBar AP](#statusbar-ap)
- [Layout](#layout)
  - [Dimensions](#dimensions)
  - [Detecting orentation changes](#detecting-orentation-changes)
  - [Flexbox](#flexbox)
- [Styling](#styling)
  - [Borders](#borders)
  - [Shadows](#shadows)
  - [Padding and margins](#padding-and-margins)
  - [Styling text](#styling-text)

# Fundamental concepts

## Starting/running
- TO START PROJECT: expo init AppName <- terminal command to create an app
- TO RUN PROJECT: /npm start will serve app w/ expo
- TO DEBUG PROJECT: on phone, shake for dev menu, then hit debug remote JS; opens new tab in chrome, and can use browser console/debugger as normal

## Views
- `View` = div (for grouping or laying out children)
- No html elements at all; need to build in react native elements
- Cross-platform: when compiled, React Native compiles these components into their native components for iOS/Android
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

## Images
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

## Touchables
- Touchable components have `onPress` and `onLongPress` events
- Can wrap around elements that don't have their own onPress (like images)
- Three cross-platform touchable components (cross-platform):
  - `TouchableWithoutFeedback` (no feedback when touched)
  - `TouchableOpacity` (component goes see-thru when touched)
  - `TouchableHighlight` (component goes dark when touched)

## Buttons
- Buttons are self-closing. Text in it is from title prop.
- Props include:
  - `color` <- text color
  - `title` <- text inside the button
  - `onPress` <- event listener
- Example:
    ```js
    <Button
        color="orange"
        title="Click Me"
        onPress={() => {}}
    />
    ```

## Alerts
- Alert as a function works similarly to browser - pops up a lil window with your message and then ok to close.
- Alert as a component is imported with the other components, but it's an object API with methods (but no visible component, so you can't use it like a normal component, like `<Alert />`)
- Two methods: alert() and prompt()
  - First argument is the `title` (header for alert box)
  - Second argument is `message` for the alert body
  - Third argument is array of buttons; each button is an object with its `text`, `style`, and `onPress` event
- Example with basic alert method: 
    ```js
    Alert.alert('titleTextHere', 'messageTextHere', [
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

## StyleSheet
- Passed to component using `style` prop; ex: `<SafeAreaView style={styles.container}>`
- Styles inside are JS, not CSS!
- Advantages over plain JS object passed to `style` prop:
  - Validates style properties before passing to components (checks for typos)
  - More optimized
- Example:
    ```js
    const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    });
    ```
- Can put where `StyleSheet` is called/used in separate file and then export/import

## Platform
- Import as `Platform` from react-native
- Example:
    ```js
    const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0, //If operating system is Andriod, add padding equiv to status bar height (detected by StatusBar api)
    },
    });
    ```

## StatusBar AP
- Import as `StatusBar` from react-native
- `currentHeight` method detects height of status bar 

# Layout

## Dimensions
- Physical pixels = DIPs (density-independent pixels) x scale factor of the device <- This is how the app can scale to different screen sizes!
- Can use percentages just like normal CSS; example:
    ```js
    <View style={{
        width: '50%' //50% of parent's width, just like normal CSS
    }}>
    ```
- Can import `Dimensions` API from react-native
  - `get` method takes either `"window"` or `"screen"` as args and returns object w/ width, height, and scale factor
  - On iPhone, window === screen, but on Android, screen dimensions are slightly smaller
  - Caution: Doesn't respond to orientation changes!!

## Detecting orentation changes
- Default orientation of app is `"orientation": "portrait"` (in `app.json`); set to `"orientation": "default"` instead to be able to be used in both portrait and landscape
- [React Native Hooks](https://github.com/react-native-community/hooks) turns React Native APIs into hooks to use w/in functional components
  - `npm i @react-native-community/hooks`
  - `import {useDimensions} from '@react-native-community/hooks'`
- `useDimensions` hook returns dimensions of screen whether in portrait or landscape 
  - Returns object w/ fontScale, height, scale, and width
  - Component is rerendered when the device is rotated, so the hook gets called again if used w/in the component's code.
- `useDeviceOrientation` hook returns object w/ landscape and portrait; one will be true, and one will be false
  - `const {landscape} = useDeviceOrientation()` <- `landscape` will be either true or false after every rerender
  - Then, can use in style obj:
    ```js
    <View style={{
        width: '50%',
        height: landscape ? '100%' : '30%'
    }}>
    ```

## Flexbox
- Not exactly the same as CSS flexbox!
- `flex` property in style object tells the component how much to grow to take available free space. 
  - Shorthand that combines `flexGrow` and `flexShrink`
  - If set to 1, it grows to take all of the free space in the parent element. Example:
      ```js
      const styles = StyleSheet.create({
      container: {
          flex: 1,
      },
      });
      ```
  - Example w/ `flex` set to 0.5 to take half of the parent element's space:
    ```js
      const styles = StyleSheet.create({
      container: {
          flex: 0.5,
      },
      });
      ```
  - If there are multiple items in a container, the `flex` values become the proportions of the space each takes. For example, if there are three views inside, and the first has `flex: 2` but the other two have `flex: 1`, the first will take half the container, and the other two will have a quarter each.
- `flexDirection`:
  - Sets primary axis
  - Default is vertical alignment of items in container (makes most sense for typical portrait phone view; opposite to horizontal default in normal CSS flexbox)
  - Can set `flexDirection` to similar values as w/ CSS, incl. `"row"` (left to right), `"row-reverse"` (right to left), and `"column-reverse"` (up from bottom). 
- `justifyContent`:
  - Aligns along the primary (main) axis, same as w/ CSS - ex: horizontal if row
  - Same values as w/ CSS (`"center"`, `"flex-start"`, `"flex-end"`, `"space-around"`, `"space-evenly"`, `"space-between"`)
- `alignItems`:
  - Also functions how it does in CSS, aligning along the secondary access - ex: vertical if row
  - Defaults to `"stretch"`
  - Same values as w/ CSS (`"center"`, `"flex-start"`, `"flex-end"`, `"space-around"`, `"space-evenly"`, `"space-between"`) 
  - Also can use `"baseline"` value; this means all the items have the same baseline (all the bottom edges will line up)

# Styling

## Borders
- `borderWidth`, `borderColor`, and `borderRadius` properties control thickness, color, and border radius
- Can split out for specific sides (examples: `borderTopWidth` to thicken just the top border or `borderTopLeftRadius` to round just the top left corner)
- To make a circle, use a border radius half the size of the box

## Shadows
- `shadowColor` sets color
- `shadowOffset` takes object with width and height (`shadowOffset: {width: 10, height: 10}`)
- `shadowOpacity` takes a number between zero and one; 0===no shadow and 1===completely dark
- `elevation`
- Customisations only work on iOS (on Android, something either has a shadow or doesn't, and that's it, or you can change the elevation, but you can't change the color, etc.)

## Padding and margins
- `padding`, `paddingLeft`, `paddingTop`, etc. work like in CSS
- Can also use `paddingHorizontal` and `paddingVertical`
- Equivalent properties w/ margins as well

## Styling text
- 
