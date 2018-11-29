import React, { Component } from 'react';
import Home from './HomeComponent';
import About from './AboutComponent'
import Menu from './MenuComponent';
import Contact from './ContactComponent'
import Dishdetail from './DishdetailComponent';
import { View, Platform, Text, ScrollView, Image, StyleSheet } from 'react-native';
import { createStackNavigator, createDrawerNavigator, DrawerItems, SafeAreaView } from 'react-navigation';
import { Icon } from 'react-native-elements';

const HEADERS_CONFIG = {
  navigationOptions: ({ navigation }) => ({
    headerStyle: { backgroundColor: "#d6a603" },  
    headerTitleStyle: { color: "#fff" },
    headerTintColor: "#fff",
    headerLeftContainerStyle: {
      backgroundColor: '#f6b500',
      paddingLeft: 30
    },
    headerLeft: <Icon name="menu" size={24} 
      color= 'white'
      onPress={ () => navigation.toggleDrawer() } />
  })
}

// const getHeaderConfig = (iconName) => {
//   return ({ navigation }) => ({
//     headerStyle: { backgroundColor: "#d6a603" },  
//     headerTitleStyle: { color: "#fff" },
//     headerTintColor: "#fff",
//     headerLeft: <Icon name="menu" size={24} 
//       color= 'white'
//       onPress={ () => navigation.toggleDrawer() } /> 
//   })
// }

const MenuNavigator = createStackNavigator({
  Menu: { 
    screen: Menu,
    ...HEADERS_CONFIG
  },
  Dishdetail: { screen: Dishdetail }
}, {
  initialRouteName: 'Menu',
  navigationOptions: {
    headerStyle: {
      backgroundColor: '#f6b500'
    },
    headerTitntColor: '#fff',
    headerTitleStyle: {
      color: '#fff'
    }
  }
})

const HomeNavigator = createStackNavigator({
    Home: { screen: Home }
  }, { ...HEADERS_CONFIG, initialRouteName: 'Home' })

const AboutNavigator = createStackNavigator({
    About: { screen: About }
}, { ...HEADERS_CONFIG, initialRouteName: 'About' })

const ContactNavigator = createStackNavigator({
    Contact: { screen: Contact }
  }, { ...HEADERS_CONFIG, initialRouteName: 'Contact' })

const CustomDrawerContentComponent = (props) => (
  <ScrollView>
    <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
      <View style={styles.drawerHeader}>
        <View style={{flex:1}}>
          <Image source={require('./images/konfusion.png')} style={styles.drawerImage} />
        </View>
        <View style={{flex: 2}}>
          <Text style={styles.drawerHeaderText}>Ristorante {"\n"}Kon Fusion</Text>
        </View>
      </View>
      <DrawerItems {...props} />
    </SafeAreaView>
  </ScrollView>
)

const MainNavigator = createDrawerNavigator({
  Home: { 
    screen: HomeNavigator,
    navigationOptions: {
      title: 'Home',
      drawerLabel: 'Home',
      drawerIcon: ({ tintColor, focused }) => (
        <Icon
          name='home'
          type='font-awesome'            
          size={24}
          color={tintColor}
        />
      )
    }
  },
  About: { 
    screen: AboutNavigator,
    navigationOptions: {
      title: 'About Us',
      drawerLabel: 'About Us',
      drawerIcon: ({ tintColor, focused }) => (
        <Icon
          name='info-circle'
          type='font-awesome'            
          size={24}
          color={tintColor}
        />
      )
    }
  },
  Menu: { 
    screen: MenuNavigator,
    navigationOptions: {
      title: 'Menu',
      drawerLabel: 'Menu',
      drawerIcon: ({ tintColor, focused }) => (
        <Icon
          name='list'
          type='font-awesome'            
          size={24}
          color={tintColor}
        />
      )
    }
  },
  Contact: {
    screen: ContactNavigator,
    navigationOptions: {
      title: 'Contact Us',
      drawerLabel: 'Contact Us',
      inactiveTintColor: '#686868',
      drawerIcon: ({ tintColor, focused }) => (
        <Icon
          name='address-card'
          type='font-awesome'            
          size={22}
          color={tintColor}
        />
      )
    }
  }
}, {
  drawerBackgroundColor: '#686868',
  contentComponent: CustomDrawerContentComponent,
  contentOptions: {
    activeTintColor: '#f6b500'
  }
})

class Main extends Component {
  render() {
    return (
      <View style={{ flex: 1, paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight }}>
        <MainNavigator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  drawerHeader: {
    backgroundColor: '#444444',
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row'
  },
  drawerHeaderText: {
    color: '#f6b500',
    fontSize: 22,
    fontWeight: 'bold'
  },
  drawerImage: {
    margin: 10,
    width: 80,
    height: 90
  }
})

export default Main;