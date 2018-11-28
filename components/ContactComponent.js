import React, { Component } from 'react'
import { Text } from 'react-native'
import { Card } from 'react-native-elements'

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

  render() {
    return (
      <Card title={TITLE}>
        <Text>{ADDRESS}</Text>
        <Text>{CITY}</Text>
        <Text>{COUNTRY}</Text>
        <Text>{TEL}</Text>
        <Text>{FAX}</Text>
        <Text>{EMAIL}</Text>
      </Card>
    )
  }
}


export default Contact