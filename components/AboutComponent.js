import React, { Component } from 'react'
import { Text, ScrollView, FlatList } from 'react-native';
import { Card, ListItem } from 'react-native-elements'
import { LEADERS } from '../shared/leaders';

const historyP1 = 'Started in 2010, Ristorante con Fusion quickly established itself as a culinary icon par excellence in Hong Kong. With its unique brand of world fusion cuisine that can be found nowhere else, it enjoys patronage from the A-list clientele in Hong Kong.  Featuring four of the best three-star Michelin chefs in the world, you never know what will arrive on your plate the next time you visit us.'
const historyP2 = 'The restaurant traces its humble beginnings to The Frying Pan, a successful chain started by our CEO, Mr. Peter Pan, that featured for the first time the world`s best cuisines in a pan.'

class About extends Component {
  static navigationOptions = {
    title: 'About Us'
  }

  constructor(props) {
    super(props);
    this.state = {
      leaders: LEADERS
    };
  }

  render() {
    const renderLeader = ({item, index}) => {
      return (
        <ListItem
          key={index}
          title={item.name}
          titleStyle={{ fontWeight: 'bold' }}
          subtitle={item.description}
          hideChevron={true}
          leftAvatar={{ source: require('./images/luribeto.png')}}
        />
      )
    } 

    return(
      <ScrollView>
        <Card title="OUR HISTORY">
          <Text>{historyP1}</Text>
          <Text style={{marginTop: 10}}>{historyP2}</Text>
        </Card>
        <Card title="CORPORATE LEADERSHIP">
          <FlatList 
            data={this.state.leaders}
            renderItem={renderLeader}
            keyExtractor={item => item.id.toString()}
          />
        </Card>
      </ScrollView>
    )
  }
}


export default About