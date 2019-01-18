import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { Tile, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { IMAGES_MAP } from '../shared/imagesMap'
import { Loading } from './LoadingComponent'
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
  return {
    dishes: state.dishes
  }
}

class Menu extends Component {
  static navigationOptions = {
    title: 'Menu'
  }

  render() {
    const renderMenuItem = ({item, index}) => {
      const imageUri = IMAGES_MAP[item.image]
      const duration = this.getItemDuration(index)

      return (
        <Animatable.View animation="fadeInRightBig" duration={duration}>
          <Tile
            key={index}
            title={item.name}
            caption={item.description}
            featured
            onPress={() => navigate('Dishdetail', { dishId: item.id })}
            imageSrc={{ uri: imageUri.url }}
          />
        </Animatable.View>
      )
    }

    const { navigate } = this.props.navigation

    if (this.props.dishes.isLoading) {
      return(
        <Loading />
      )
    }
    else if (this.props.dishes.errMess) {
      return(
        <View>            
          <Text>{props.dishes.errMess}</Text>
        </View>            
      )
    }
    else {
      return (
        <FlatList 
            data={this.props.dishes.dishes}
            renderItem={renderMenuItem}
            keyExtractor={item => item.id.toString()}
            />
      )
    }
  }

  getItemDuration (index) {
    if (index === 0) return 500
    return index * 1000
  }
}

export default connect(mapStateToProps)(Menu)
