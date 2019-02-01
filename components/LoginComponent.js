import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView, Image } from 'react-native';
import { Input, CheckBox, Button, Icon } from 'react-native-elements';
import { SecureStore, Camera, Permissions, ImagePicker, Asset, ImageManipulator } from 'expo';
import { createBottomTabNavigator } from 'react-navigation';
import { baseUrl } from '../shared/baseUrl';
import { IMAGES_MAP } from '../shared/imagesMap'

class LoginTab extends Component {

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      remember: false
    }
}

  componentDidMount() {
    SecureStore.getItemAsync('userinfo')
    .then((userdata) => {
        let userinfo = JSON.parse(userdata);
        if (userinfo) {
            this.setState({username: userinfo.username});
            this.setState({password: userinfo.password});
            this.setState({remember: true})
        }
    })
  }

  static navigationOptions = {
    title: 'Login',
    tabBarIcon: ({ tintColor }) => (
      <Icon
        name='sign-in'
        type='font-awesome'            
        size={24}
        iconStyle={{ color: tintColor }}
      />
    ) 
  };

  handleLogin() {
    console.log(JSON.stringify(this.state));
    if (this.state.remember)
        SecureStore.setItemAsync('userinfo', JSON.stringify({username: this.state.username, password: this.state.password}))
            .catch((error) => console.log('Could not save user info', error));
    else
        SecureStore.deleteItemAsync('userinfo')
            .catch((error) => console.log('Could not delete user info', error));

  }

  render() {
      return (
        <View style={styles.container}>
            <Input
                placeholder="Username"
                leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                onChangeText={(username) => this.setState({username})}
                value={this.state.username}
                containerStyle={styles.formInput}
                />
            <Input
                placeholder="Password"
                leftIcon={{ type: 'font-awesome', name: 'key' }}
                onChangeText={(password) => this.setState({password})}
                value={this.state.password}
                containerStyle={styles.formInput}
                />
            <CheckBox title="Remember Me"
                center
                checked={this.state.remember}
                onPress={() => this.setState({remember: !this.state.remember})}
                containerStyle={styles.formCheckbox}
                checkedColor='#d3ba64'
                />
            <View style={styles.formButton}>
                <Button
                    onPress={() => this.handleLogin()}
                    title="Login"
                    icon={
                        <Icon
                            name='sign-in'
                            type='font-awesome'            
                            size={24}
                            color= 'white'
                        />
                    }
                    buttonStyle={{
                        backgroundColor: "#d6a603"
                    }}
                    />
            </View>
            <View style={styles.formButton}>
                <Button
                    onPress={() => this.props.navigation.navigate('Register')}
                    title="Register"
                    clear
                    icon={
                        <Icon
                            name='user-plus'
                            type='font-awesome'            
                            size={24}
                            color= '#d6a603'
                        />
                    }
                    titleStyle={{
                        color: "#d6a603"
                    }}
                    />
            </View>
        </View>
    );
  }

}

const image = IMAGES_MAP['images/konfusion.png']

class RegisterTab extends Component {

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      firstname: '',
      lastname: '',
      email: '',
      remember: false,
      imageUrl: image.url
    }
  }

  getImageFromCamera = async () => {
    const cameraPermission = await Permissions.askAsync(Permissions.CAMERA);
    // const cameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    if (cameraPermission.status === 'granted') {
      let capturedImage = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [3, 4],
      });
      if (!capturedImage.cancelled) {
        console.log(capturedImage);
        this.processImage(capturedImage.uri);
      }
    }
  }

  getImageFromGallery = async () => {
    const cameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    if (cameraRollPermission.status === 'granted') {
      let selectedImage = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          aspect: [3, 4],
      });

      if (!selectedImage.cancelled) {
          console.log(selectedImage);
          this.processImage(selectedImage.uri);
      }
    }
  }

  processImage = async (imageUri) => {
    let processedImage = await ImageManipulator.manipulate(
      imageUri, 
      [
          {resize: {width: 400}}
      ],
      {format: 'png'}
    );
    console.log(processedImage);
    this.setState({imageUrl: processedImage.uri });
  }
  
  static navigationOptions = {
    title: 'Register',
    tabBarIcon: ({ tintColor, focused }) => (
        <Icon
          name='user-plus'
          type='font-awesome'            
          size={24}
          iconStyle={{ color: tintColor }}
        />
      ) 
  };

  handleRegister() {
    console.log(JSON.stringify(this.state));
    if (this.state.remember)
      SecureStore.setItemAsync('userinfo', JSON.stringify({username: this.state.username, password: this.state.password}))
        .catch((error) => console.log('Could not save user info', error));
  }

  render() {
    return(
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.imageContainer}>
              <Image 
                  source={{uri: this.state.imageUrl}} 
                  loadingIndicatorSource={require('./images/konfusion.png')}
                  style={styles.image} 
                  />
              <Button
                  title="Camera"
                  onPress={this.getImageFromCamera}
                  buttonStyle={{ backgroundColor: '#d6a603'}}
                  />
              <Button
                  title="Gallery"
                  onPress={this.getImageFromGallery}
                  buttonStyle={{ backgroundColor: '#d6a603', marginLeft: 20}}
                  />
          </View>
          <Input
              placeholder="Username"
              leftIcon={{ type: 'font-awesome', name: 'user-o' }}
              onChangeText={(username) => this.setState({username})}
              value={this.state.username}
              containerStyle={styles.formInput}
              />
          <Input
              placeholder="Password"
              leftIcon={{ type: 'font-awesome', name: 'key' }}
              onChangeText={(password) => this.setState({password})}
              value={this.state.password}
              containerStyle={styles.formInput}
              />
          <Input
              placeholder="First Name"
              leftIcon={{ type: 'font-awesome', name: 'user-o' }}
              onChangeText={(firstname) => this.setState({firstname})}
              value={this.state.firstname}
              containerStyle={styles.formInput}
              />
          <Input
              placeholder="Last Name"
              leftIcon={{ type: 'font-awesome', name: 'user-o' }}
              onChangeText={(lastname) => this.setState({lastname})}
              value={this.state.lastname}
              containerStyle={styles.formInput}
              />
          <Input
              placeholder="Email"
              leftIcon={{ type: 'font-awesome', name: 'envelope-o' }}
              onChangeText={(email) => this.setState({email})}
              value={this.state.email}
              containerStyle={styles.formInput}
              />
          <CheckBox title="Remember Me"
              center
              checked={this.state.remember}
              onPress={() => this.setState({remember: !this.state.remember})}
              containerStyle={styles.formCheckbox}
              checkedColor='#d3ba64'
              />
          <View style={styles.formButton}>
              <Button
                  onPress={() => this.handleRegister()}
                  title="Register"
                  icon={
                      <Icon
                          name='user-plus'
                          type='font-awesome'            
                          size={24}
                          color= 'white'
                      />
                  }
                  buttonStyle={{
                      backgroundColor: "#d6a603"
                  }}
                  />
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    margin: 20
  },
  imageContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    height: 100,
    backgroundColor: '#d8d6d6',
    borderRadius: 10
  },
  image: {
    width: 80,
    height: 100,
  },
  formInput: {
    margin: 20
  },
  formCheckbox: {
    margin: 20,
    backgroundColor: null
  },
  formButton: {
    margin: 60
  }
});

const Login = createBottomTabNavigator({
  Login: LoginTab,
  Register: RegisterTab
}, {
  tabBarOptions: {
    activeBackgroundColor: '#d6a603',
    inactiveBackgroundColor: '#d3ba64',
    activeTintColor: '#ffffff',
    inactiveTintColor: '#fbfbfb'
  }
});

export default Login;
