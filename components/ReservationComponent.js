// import React, { Component } from 'react'
// import { Text, View, ScrollView, StyleSheet, Picker, Switch, Button, Alert } from 'react-native'
// import { Card } from 'react-native-elements';
// import DatePicker from 'react-native-datepicker'
// import * as Animatable from 'react-native-animatable';
// import { Permissions, Notifications, Calendar } from 'expo';

// class Reservation extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       guests: 1,
//       smoking: false,
//       date: ''
//     }
//   }

//   static navigationOptions = {
//     title: 'Reserve Table',
//   };

//   handleReservation() {
//     const alertStr = `Numer of Guests: ${this.state.guests} \n Smoking? ${this.state.smoking} \n Date and Time: ${this.state.date}`
//     console.log(alertStr);

//     Alert.alert(
//       'Your reservation it`s OK?',
//       alertStr,
//       [
//         {text: 'Cancel', onPress: () => this.resetForm(), style: 'cancel'},
//         {text: 'OK', onPress: () => {
//             this.presentLocalNotification(this.state.date)
//             this.addReservationToCalendar(this.state.date)
//             this.resetForm()
//           }
//         },
//       ],
//       { cancelable: false }
//     );
//   }

//   async obtainCalendarPermission () {
//     let permission = await Permissions.getAsync(Permissions.CALENDAR);

//     if (permission.status !== 'granted') {
//         permission = await Permissions.askAsync(Permissions.CALENDAR);

//         if (permission.status !== 'granted') {
//             Alert.alert('Permission not granted to add a calendar event');
//         }
//     }

//     return permission;
//   }

//   async addReservationToCalendar(date) {
//     await this.obtainCalendarPermission();

//     Calendar.createEventAsync(Calendar.DEFAULT, {
//       startDate: new Date(Date.parse(date)), 
//       endDate: new Date(Date.parse(date)+2*60*60*1000), 
//       timeZone: 'Asia/Hong_Kong', 
//       location: '121, Clear Water Bay Road, Clear Water Bay, Kowloon, Hong Kong',
//       title: 'Con Fusion Table Reservation'
//     });
//   }

//   resetForm() {
//     this.setState({
//       guests: 1,
//       smoking: false,
//       date: ''
//     })
//   }

//   async obtainNotificationPermission() {
//     let permission = await Permissions.getAsync(Permissions.USER_FACING_NOTIFICATIONS);

//     if (permission.status !== 'granted') {
//         permission = await Permissions.askAsync(Permissions.USER_FACING_NOTIFICATIONS);

//         if (permission.status !== 'granted') {
//             Alert.alert('Permission not granted to show notifications');
//         }
//     }

//     return permission;
//   }

// async presentLocalNotification(date) {
//     await this.obtainNotificationPermission();

//     Notifications.presentLocalNotificationAsync({
//         title: 'Your Reservation',
//         body: 'Reservation for '+ date + ' requested',
//         ios: {
//             sound: true
//         },
//         android: {
//             sound: true,
//             vibrate: true,
//             color: '#f6b500'
//         }
//     });
//   }
  
//   render() {
//     return(
//       <ScrollView>
//         <Animatable.View animation="zoomIn" duration={1000} delay={50}>
//           <Card title='RESERVE A TABLE'>
//             <View style={styles.formRow}>
//             <Text style={styles.formLabel}>Number of Guests</Text>
//             <Picker
//                 style={styles.formItem}
//                 selectedValue={this.state.guests}
//                 onValueChange={(itemValue, itemIndex) => this.setState({guests: itemValue})}>
//                 <Picker.Item label="1" value="1" />
//                 <Picker.Item label="2" value="2" />
//                 <Picker.Item label="3" value="3" />
//                 <Picker.Item label="4" value="4" />
//                 <Picker.Item label="5" value="5" />
//                 <Picker.Item label="6" value="6" />
//             </Picker>
//             </View>
//             <View style={styles.formRow}>
//             <Text style={styles.formLabel}>Smoking/Non-Smoking?</Text>
//             <Switch
//                 style={styles.formItem}
//                 value={this.state.smoking}
//                 onTintColor='#ffbb00'
//                 // ios_backgroundColor='#ffbb00'
//                 // thumbColor='#ffbb00'
//                 onValueChange={(value) => this.setState({smoking: value})}>
//             </Switch>
//             </View>
//             <View style={styles.formRow}>
//             <Text style={styles.formLabel}>Date and Time</Text>
//             <DatePicker
//                 style={{flex: 2, marginRight: 20}}
//                 date={this.state.date}
//                 format=''
//                 mode="datetime"
//                 placeholder="date and Time"
//                 minDate="2018-01-01"
//                 confirmBtnText="Confirm"
//                 cancelBtnText="Cancel"
//                 customStyles={{
//                 dateIcon: {
//                     position: 'absolute',
//                     left: 0,
//                     top: 4,
//                     marginLeft: 0
//                 },
//                 dateInput: {
//                     marginLeft: 36
//                 }
//                 // ... You can check the source to find the other keys. 
//                 }}
//                 onDateChange={(date) => {this.setState({date: date})}}
//             />
//             </View>
//             <View style={styles.formRow}>
//             <Button
//                 onPress={() => this.handleReservation()}
//                 title="Reserve"
//                 color="#ffbb00"
//                 accessibilityLabel="Learn more about this yellow button"
//                 />
//             </View>
//           </Card>
//         </Animatable.View>
//       </ScrollView>
//     )
//   }
// }

// const styles = StyleSheet.create({
//   formRow: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     flex: 1,
//     flexDirection: 'row',
//     margin: 20
//   },
//   formLabel: {
//     fontSize: 18,
//     flex: 2
//   },
//   formItem: {
//     flex: 1
//   },
//   modal: {
//     justifyContent: 'center',
//     margin: 20,
//     marginTop: 100
//   },
//   modalTitle: {
//       fontSize: 24,
//       fontWeight: 'bold',
//       backgroundColor: '#ffbb00',
//       textAlign: 'center',
//       color: 'white',
//       marginBottom: 20
//   },
//   modalText: {
//       fontSize: 18,
//       margin: 10
//   }
// })

// export default Reservation


import React, { Component } from 'react'
import { Text, View, ScrollView, StyleSheet, Picker, Switch, Button, Modal } from 'react-native'
import { Card } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import * as Animatable from 'react-native-animatable';
import { Permissions, Notifications, Calendar } from 'expo';
import moment from 'moment';

class Reservation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      guests: 1,
      smoking: false,
      date: '',
      showModal: false
    }
  }

  static navigationOptions = {
    title: 'Reserve Table',
  };

  handleReservation() {
    const alertStr = `Numer of Guests: ${this.state.guests} \n Smoking? ${this.state.smoking} \n Date and Time: ${this.state.date}`
    console.log(alertStr);

    this.presentLocalNotification(this.state.date)
    this.addReservationToCalendar(this.state.date)
    this.toggleModal()
  }

  async obtainCalendarPermission () {
    let permission = await Permissions.getAsync(Permissions.CALENDAR);

    if (permission.status !== 'granted') {
        permission = await Permissions.askAsync(Permissions.CALENDAR);

        if (permission.status !== 'granted') {
            Alert.alert('Permission not granted to add a calendar event');
        }
    }

    return permission;
  }

  async addReservationToCalendar(date) {
    await this.obtainCalendarPermission();

    Calendar.createEventAsync(Calendar.DEFAULT, {
      startDate: new Date(Date.parse(date)), 
      endDate: new Date(Date.parse(date)+2*60*60*1000), 
      timeZone: 'Asia/Hong_Kong', 
      location: '121, Clear Water Bay Road, Clear Water Bay, Kowloon, Hong Kong',
      title: 'Con Fusion Table Reservation'
    });
  }

  resetForm() {
    this.setState({
      guests: 1,
      smoking: false,
      date: ''
    })
  }

  async obtainNotificationPermission() {
    let permission = await Permissions.getAsync(Permissions.USER_FACING_NOTIFICATIONS);

    if (permission.status !== 'granted') {
        permission = await Permissions.askAsync(Permissions.USER_FACING_NOTIFICATIONS);

        if (permission.status !== 'granted') {
            Alert.alert('Permission not granted to show notifications');
        }
    }

    return permission;
  }

async presentLocalNotification(date) {
    await this.obtainNotificationPermission();

    Notifications.presentLocalNotificationAsync({
        title: 'Your Reservation',
        body: 'Reservation for '+ date + ' requested',
        ios: {
            sound: true
        },
        android: {
            sound: true,
            vibrate: true,
            color: '#f6b500'
        }
    });
  }

  toggleModal() {
    this.setState({showModal: !this.state.showModal});
  }

  closeModal() {
    this.setState({ showModal: false });
  }

  resetForm() {
    this.setState({
      guests: 1,
      smoking: false,
      date: '',
      showModal: false
    })
  }
  
  render() {
    return(
      <ScrollView>
        <Animatable.View animation="zoomIn" duration={1500} delay={500}>
          <Card title='RESERVE A TABLE'>
            <View style={styles.formRow}>
            <Text style={styles.formLabel}>Number of Guests</Text>
            <Picker
                style={styles.formItem}
                selectedValue={this.state.guests}
                onValueChange={(itemValue, itemIndex) => this.setState({guests: itemValue})}>
                <Picker.Item label="1" value="1" />
                <Picker.Item label="2" value="2" />
                <Picker.Item label="3" value="3" />
                <Picker.Item label="4" value="4" />
                <Picker.Item label="5" value="5" />
                <Picker.Item label="6" value="6" />
            </Picker>
            </View>
            <View style={styles.formRow}>
            <Text style={styles.formLabel}>Smoking/Non-Smoking?</Text>
            <Switch
                style={styles.formItem}
                value={this.state.smoking}
                onTintColor='#ffbb00'
                // ios_backgroundColor='#ffbb00'
                // thumbColor='#ffbb00'
                onValueChange={(value) => this.setState({smoking: value})}>
            </Switch>
            </View>
            <View style={styles.formRow}>
            <Text style={styles.formLabel}>Date and Time</Text>
            <DatePicker
                style={{flex: 2, marginRight: 20}}
                date={this.state.date}
                format='MMM DD YYYY'
                mode="datetime"
                placeholder="date and Time"
                minDate="2018-01-01"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0
                },
                dateInput: {
                    marginLeft: 36
                }
                // ... You can check the source to find the other keys. 
                }}
                onDateChange={(date) => {this.setState({date: date})}}
            />
            </View>
            <View style={styles.formRow}>
            <Button
                onPress={() => this.handleReservation()}
                title="Reserve"
                color="#ffbb00"
                accessibilityLabel="Learn more about this yellow button"
                />
            </View>
          </Card>
          <Modal animationType = {"slide"} transparent = {false}
              visible = {this.state.showModal}
              onDismiss = {() => this.closeModal() }
              onRequestClose = {() => this.toggleModal() }>
              <View style = {styles.modal}>
                  <Text style = {styles.modalTitle}>Your Reservation</Text>
                  <Text style = {styles.modalText}>Number of Guests: {this.state.guests}</Text>
                  <Text style = {styles.modalText}>Smoking?: {this.state.smoking ? 'Yes' : 'No'}</Text>
                  <Text style = {styles.modalText}>Date and Time: {moment(this.state.date).format("MMM DD YYYY")}</Text>
                  
                  <Button 
                      onPress = {() =>{this.toggleModal(); this.resetForm();}}
                      color="#ffbb00"
                      title="Close" 
                      />
              </View>
          </Modal>
        </Animatable.View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  formRow: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row',
    margin: 20
  },
  formLabel: {
    fontSize: 18,
    flex: 2
  },
  formItem: {
    flex: 1
  },
  modal: {
    justifyContent: 'center',
    margin: 20,
    marginTop: 100
  },
  modalTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      backgroundColor: '#ffbb00',
      textAlign: 'center',
      color: 'white',
      marginBottom: 20
  },
  modalText: {
      fontSize: 18,
      margin: 10
  }
})

export default Reservation
