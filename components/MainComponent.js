import React, { Component } from 'react';
import Home from './HomeComponent';
import About from './AboutComponent'
import Menu from './MenuComponent';
import Contact from './ContactComponent'
import Dishdetail from './DishdetailComponent';
import { View, Platform } from 'react-native';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

const HEADERS_CONFIG = {
  navigationOptions: ({ navigation }) => ({
    headerStyle: { backgroundColor: "#d6a603" },  
    headerTitleStyle: { color: "#fff" },
    headerTintColor: "#fff" 
  })
}

const MenuNavigator = createStackNavigator({
  Menu: { screen: Menu },
  Dishdetail: { screen: Dishdetail }
}, {
  initialRouteName: 'Menu',
  navigationOptions: {
    headerStyle: {
      backgroundColor: '#d6a603'
    },
    headerTitntColor: '#fff',
    headerTitleStyle: {
      color: '#fff'
    }
  }
})

const HomeNavigator = createStackNavigator({
    Home: { screen: Home }
  }, { ...HEADERS_CONFIG, initialRouteName: 'Home' } )

const AboutNavigator = createStackNavigator({
    About: { screen: About }
}, { ...HEADERS_CONFIG, initialRouteName: 'About' } )

const ContactNavigator = createStackNavigator({
    Contact: { screen: Contact }
  }, { ...HEADERS_CONFIG, initialRouteName: 'Contact' } )

const MainNavigator = createDrawerNavigator({
  Home: { 
    screen: HomeNavigator,
    navigationOptions: {
      title: 'Home',
      drawerLabel: 'Home'
    }
  },
  About: { 
    screen: AboutNavigator,
    navigationOptions: {
      title: 'About Us',
      drawerLabel: 'About Us'
    }
  },
  Menu: { 
    screen: MenuNavigator,
    navigationOptions: {
      title: 'Menu',
      drawerLabel: 'Menu'
    }
  },
  Contact: {
    screen: ContactNavigator,
    navigationOptions: {
      title: 'Contact Us',
      drawerLabel: 'Contact Us',
    }
  }
}, {
  drawerBackgroundColor: '#686868'
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

export default Main;