import React, { Component } from 'react'
import { Text, View, ScrollView, FlatList, StyleSheet, Button, Modal } from 'react-native'
import { Card, Icon, Input, Rating } from 'react-native-elements'
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { IMAGES_MAP } from '../shared/imagesMap'
import { postFavorite, postComment } from '../redux/ActionCreators'

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    favorites: state.favorites
  }
}

const mapDispatchToProps = dispatch => ({
  postFavorite: (dishId) => dispatch(postFavorite(dishId)),
  postComment: (updatedComments) => dispatch(postComment(updatedComments))
})

function RenderComments(props) {
  const comments = props.comments

  const renderCommentItem = ({item, index}) => {
      
    return (
      <View key={index} style={{margin: 10}}>
        <Text style={{fontSize: 14}}>{item.comment}</Text>
        <Text style={{fontSize: 12}}>{item.rating} Stars</Text>
        <Text style={{fontSize: 12}}>{'-- ' + item.author + ', ' + item.date} </Text>
      </View>
    )
  }
  
  return (
    <Card title='Comments' >
      <FlatList 
        data={comments}
        renderItem={renderCommentItem}
        keyExtractor={item => item.id.toString()}
        />
    </Card>
  )
}

function RenderDish(props) {

  const dish = props.dish
  
  if (dish != null) {
    const imageUri = IMAGES_MAP[dish.image]

    return (
      <Card
        featuredTitle={dish.name}
        image={{ uri: imageUri.url }}>
          <Text style={{margin: 10}}>
              {dish.description}
          </Text>
          <View style={styles.iconsRow}>
            <Icon
              reverse
              name={ props.favorite ? 'heart' : 'heart-o'}
              type='font-awesome'
              color='#ffbb00'
              onPress={() => {
                if (props.favorite) return console.log('Already favorite') 
                return props.onPress()
              }}
              />
            <Icon
              reverse
              name={ 'pencil' }
              type='font-awesome'
              color='#686868'
              onPress={ props.toggleModal }
              />
          </View>
      </Card>
    )
  }
  
  return (<View></View>)
}

class Dishdetail extends Component {
  constructor (props) {
    super(props)

    this.state = {
      favorites: [],
      showModal: false,
      author: '',
      comment: '',
      rating: 0
    }
  }

  static navigationOptions = {
    title: 'Dish Details'
  }

  markFavorite = (dishId) => () => {
    this.props.postFavorite(dishId)
  }

  handleComment = (dishId) => () => {
    const updatedComments = [...this.props.comments.comments]
    const id = updatedComments.length
    const comment = {
      id,
      comment: this.state.comment,
      author: this.state.author,
      rating: this.state.rating,
      dishId,
      date: new Date().toISOString()
    }
    updatedComments.push(comment)

    this.props.postComment(updatedComments)
    this.closeModal()
  }

  toggleModal = () => {
    this.setState({showModal: !this.state.showModal})
  }

  closeModal = () => {
    this.setState({ showModal: false })
  }

  ratingCompleted = (rating) => {
    this.setState({ rating })
  }

  render () {
    const dishId = this.props.navigation.getParam('dishId', '')

    return (
      <ScrollView>
        <RenderDish dish={this.props.dishes.dishes[+dishId]}
          favorite={this.props.favorites.some(el => el === dishId)}
          onPress={this.markFavorite(dishId)}
          toggleModal={ this.toggleModal }
          />
        <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />
        <Modal animationType = {"slide"} transparent = {false}
            visible = {this.state.showModal}
            onDismiss = {() => this.closeModal() } 
            onRequestClose = {() => this.toggleModal() }
            >
          <View style={styles.modal}>
            <View style={styles.modalRow}>
                <Rating
                  showRating
                  type="star"
                  fractions={1}
                  startingValue={4}
                  imageSize={40}
                  onFinishRating={this.ratingCompleted}
                  onStartRating={this.ratingStarted}
                  style={{ paddingVertical: 10 }}
                  style = {styles.modalRow}
                />
              </View>
              <View style={styles.modalRow}>
                <Input
                  placeholder='Author'
                  leftIcon={
                    <Icon
                      type='font-awesome'
                      name='user'
                      size={24}
                      color='#686868'
                    />
                  }
                  onChangeText={(text) => this.setState({ author: text})}
                />
                <Input
                  placeholder='Comment'
                  leftIcon={
                    <Icon
                      type='font-awesome'
                      name='comment'
                      size={22}
                      color='#686868'
                    />
                  }
                  onChangeText={(text) => this.setState({comment: text})}
                />
              </View>
              <View style={styles.modalRow}>
                  <Button 
                    onPress = { this.handleComment(dishId) }
                    color="#ffbb00"
                    title="SUBMIT" 
                    />
              </View>
              <View style={styles.modalRow}>
                  <Button 
                    onPress = { this.closeModal }
                    color="#686868"
                    title="CLOSE" 
                    />
              </View>
            </View>
        </Modal>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  iconsRow: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row',
    margin: 20
  },
  modal: {
    justifyContent: 'center',
    margin: 20,
    marginTop: 100
  },
  modalRow: {
    margin: 10
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail)
