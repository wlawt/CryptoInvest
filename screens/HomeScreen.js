import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';

import BTC from '../assets/images/Bitcoin.png'
import ETH from '../assets/images/ETH.png'
import LTC from '../assets/images/LTC.png'
import XRP from '../assets/images/XRP.jpg'

class Card extends React.Component {
  render() {
    return (
      <View style={styles.rectangle}>
        <Image source={this.props.image} style={styles.imageRectangle}></Image>
        <Text style={styles.textRectangle}>{this.props.text}</Text>
      </View>
    )
  }
}

getData = function() {
  return "hello";
}

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>
        
          <Text style={styles.headerTitle}>Crypto Arbitrage</Text>
          <Card image={BTC} text={"Bitcoin"}></Card>
          <Card image={ETH} text={"Ethereum"}></Card>
          <Card image={XRP} text={"Ripple"}></Card>
          <Card image={LTC} text={"Litecoin"}></Card>
          
      </ScrollView>
    </View>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  contentContainer: {
    paddingTop: 30,
  },
  headerTitle: {
    fontSize: 32,
    color: 'black',
    lineHeight: 24,
    textAlign: 'center',
    padding: '10%'
  },
  rectangle: {
    width: 120 * 2,
    height: 100,
    backgroundColor: '#f7fffa',
    marginLeft: '17%',
    flexDirection: 'row',
    marginBottom: '5%',
  },
  imageRectangle: {
    width: '30%',
    height: '15%',
    paddingTop: '30%',
    marginTop: '5%',
  },
  textRectangle: {
    marginLeft: '12%',
    marginTop: '13%',
    fontSize: 30,
  }
});
