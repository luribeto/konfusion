// import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';
// import Main from './components/MainComponent';

// export default class App extends React.Component {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text>This is an REACT NATIVE APP</Text>
//         <Text>Edit App.js file</Text>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#ccc',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

import React from 'react';
import { StyleSheet, View } from 'react-native';
import Main from './components/MainComponent';

export default class App extends React.Component {
  render() {
    return (
      <Main style={styles.container} />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
