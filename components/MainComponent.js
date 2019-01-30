import React, { Component } from 'react'
import Home from './HomeComponent'
import About from './AboutComponent'
import Menu from './MenuComponent'
import Contact from './ContactComponent'
import Dishdetail from './DishdetailComponent'
import { View, Platform, Text, ScrollView, Image, StyleSheet } from 'react-native'
import { createStackNavigator, createDrawerNavigator, DrawerItems, SafeAreaView } from 'react-navigation'
import { Icon } from 'react-native-elements'
import { connect } from 'react-redux'
import { fetchDishes, fetchComments, fetchPromos, fetchLeaders } from '../redux/ActionCreators'
import Reservation from './ReservationComponent'
import Favorites from './FavoriteComponent'
import Login from './LoginComponent';

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

const mapDispatchToProps = dispatch => ({
  fetchDishes: () => dispatch(fetchDishes()),
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchLeaders: () => dispatch(fetchLeaders()),
})

const HEADERS_CONFIG = {
  navigationOptions: ({ navigation }) => ({
    headerStyle: { backgroundColor: "#d6a603" },  
    headerTitleStyle: { color: "#fff" },
    headerTintColor: "#fff",
    headerLeftContainerStyle: {
      backgroundColor: '#ffbb00',
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
      backgroundColor: '#ffbb00'
    },
    headerTitntColor: '#fff',
    headerTitleStyle: {
      color: '#fff'
    }
  }
})

const LoginNavigator = createStackNavigator({
  Login: { screen: Login }
}, { ...HEADERS_CONFIG, initialRouteName: 'Login' })

const HomeNavigator = createStackNavigator({
    Home: { screen: Home }
  }, { ...HEADERS_CONFIG, initialRouteName: 'Home' })

const AboutNavigator = createStackNavigator({
    About: { screen: About }
}, { ...HEADERS_CONFIG, initialRouteName: 'About' })

const ContactNavigator = createStackNavigator({
    Contact: { screen: Contact }
  }, { ...HEADERS_CONFIG, initialRouteName: 'Contact' })

const ReservationNavigator = createStackNavigator({
    Reservation: { screen: Reservation }
  }, { ...HEADERS_CONFIG, initialRouteName: 'Reservation' })

const FavoritesNavigator = createStackNavigator({
  Favorites: { screen: Favorites }
  }, { ...HEADERS_CONFIG, initialRouteName: 'Favorites' })


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
  Login: 
  { screen: LoginNavigator,
    navigationOptions: {
      title: 'Login',
      drawerLabel: 'Login',
      drawerIcon: ({ tintColor, focused }) => (
        <Icon
          name='sign-in'
          type='font-awesome'            
          size={24}
          iconStyle={{ color: tintColor }}
        />
      ),
    }
  },
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
  },
  Reservation:
  { screen: ReservationNavigator,
    navigationOptions: {
      title: 'Reserve Table',
      drawerLabel: 'Reserve Table',
      drawerIcon: ({ tintColor, focused }) => (
        <Icon
          name='cutlery'
          type='font-awesome'            
          size={24}
          iconStyle={{ color: tintColor }}
        />
      ),
    }
  },
  Favorites:
  { screen: FavoritesNavigator,
    navigationOptions: {
      title: 'My Favorites',
      drawerLabel: 'My Favorites',
      drawerIcon: ({ tintColor, focused }) => (
        <Icon
          name='heart'
          type='font-awesome'            
          size={24}
          iconStyle={{ color: tintColor }}
        />
      ),
    }
  }
}, {
  initialRouteName: 'Home',
  drawerBackgroundColor: '#686868',
  contentComponent: CustomDrawerContentComponent,
  contentOptions: {
    activeTintColor: '#f6b500'
  }
})

class Main extends Component {
  componentDidMount() {
    this.props.fetchDishes()
    this.props.fetchComments()
    this.props.fetchPromos()
    this.props.fetchLeaders()
  }

  render() {
    return (
      <View style={{ flex: 1, paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight }}>
        <MainNavigator />
      </View>
    )
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

export default connect(mapStateToProps, mapDispatchToProps)(Main)
