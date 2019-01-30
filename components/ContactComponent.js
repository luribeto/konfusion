import React, { Component } from 'react'
import { Text } from 'react-native'
import { Card, Button, Icon } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import { MailComposer } from 'expo';
import { emails } from '../shared/baseUrl'

const TITLE = 'CONTACT INFORMATION'
const ADDRESS = '121, Clear Water Bay Road'
const CITY = 'Clear Water Bay, Kowloon'
const COUNTRY = 'HONG KONG'
const TEL = 'Tel: +852 1234 5678'
const FAX = 'Fax: +852 8765 4321'
const EMAIL = 'Email:confusion@food.net'

class Contact extends Component {
  static navigationOptions = {
    title: 'Contact Us'
  }

  sendMail() {
    MailComposer.composeAsync({
        recipients: emails,
        subject: 'Enquiry',
        body: 'To whom it may concern:'
    })
  }

  render() {
    return (
      <Animatable.View animation="fadeInDown" duration={1000} delay={500}>
        <Card title={TITLE}>
          <Text>{ADDRESS}</Text>
          <Text>{CITY}</Text>
          <Text>{COUNTRY}</Text>
          <Text>{TEL}</Text>
          <Text>{FAX}</Text>
          <Text>{EMAIL}</Text>
          <Button
            title="Send Email"
            buttonStyle={{backgroundColor: "#f6b500", marginTop: 20}}
            icon={<Icon name='envelope-o' type='font-awesome' color='white' />}
            onPress={this.sendMail}
            />
        </Card>
      </Animatable.View>
    )
  }
}


export default Contact