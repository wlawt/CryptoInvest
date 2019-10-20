import React, { Component } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Image,
  Alert,
  TouchableOpacity
} from "react-native";

import {
  Container,
  Content,
  Card,
  CardItem,
  Text,
  Body,
  Header
} from "native-base";

import BTC from "../assets/images/Bitcoin.png";
import ETH from "../assets/images/ETH.png";
import LTC from "../assets/images/LTC.png";
import XRP from "../assets/images/XRP.jpg";

class Cards extends React.Component {
  render() {
    return (
      <View style={styles.rectangle}>
        <Image source={this.props.image} style={styles.imageRectangle}></Image>
        <Text style={styles.textRectangle}>{this.props.text}</Text>
      </View>
    );
  }
}

getData = function() {
  return "hello";
};

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <Header style={styles.header}>
          <Text style={styles.headerText}>Crypto Investments</Text>
        </Header>

        <Text style={styles.headerTitle}>
          Wallet: <Text style={styles.money}>$313.67</Text>
        </Text>

        <TouchableOpacity
          style={styles.rectangle}
          onPress={() => Alert.alert("Current Bitcoin Price is $10471.84 CAD")}
        >
          <Image source={BTC} style={styles.imageRectangle}></Image>
          <Text style={styles.crypto}>Bitcoin</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.rectangle}
          onPress={() =>
            Alert.alert("Current Ethereum Price is $225.99 CAD")
          }
        >
          <Image source={ETH} style={styles.imageRectangle}></Image>
          <Text style={styles.crypto}>Ethereum</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.rectangle}
          onPress={() => Alert.alert("Current Ripple Price is $0.38 CAD")}
        >
          <Image source={XRP} style={styles.imageRectangle}></Image>
          <Text style={styles.crypto}>Ripple</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.rectangle}
          onPress={() => Alert.alert("Current Litecoin Price is $69.94 CAD")}
        >
          <Image source={LTC} style={styles.imageRectangle}></Image>
          <Text style={styles.crypto}>Litecoin</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Twitter Feed</Text>

        <Container>
          <Content>
            <Card>
              <CardItem header bordered>
                <Text style={styles.tweetText}>ReadBTC</Text>
              </CardItem>
              <CardItem bordered>
                <Body>
                  <Text>
                    "Electroneum, the startup which enables users to “mine" its
                    cryptocurrency on their smartphones, is launching new
                    services in Turkey—the inflation-strapped country is
                    currently number one in crypto adoption #cryptocurrencies"
                  </Text>
                </Body>
              </CardItem>
              <CardItem header bordered>
                <Text style={styles.tweetText}>Wall Street Journal</Text>
              </CardItem>
              <CardItem bordered>
                <Body>
                  <Text>
                    "Even though GM and the UAW have struck a deal, the strike
                    is still rippling through the Midwest economy: "Everybody is
                    taking a hit.""
                  </Text>
                </Body>
              </CardItem>
              <CardItem header bordered>
                <Text style={styles.tweetText}>Christoffel Botha Jacobs</Text>
              </CardItem>
              <CardItem bordered>
                <Body>
                  <Text>
                    "IBAYI MArketing: Bitcoin A Cut Above The Rest. When I do
                    look at bitcoin it seemed that it had the future in mind and
                    it's certainly a cut above the rest. Through it all, it got
                    stronger and stronger."
                  </Text>
                </Body>
              </CardItem>
            </Card>
          </Content>
        </Container>
      </ScrollView>
    </View>
  );
}
HomeScreen.navigationOptions = {
  header: null
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  contentContainer: {
    paddingTop: 20
  },
  headerTitle: {
    fontSize: 32,
    color: "black",
    lineHeight: 24,
    textAlign: "center",
    padding: "10%"
  },
  rectangle: {
    width: 120 * 2,
    height: 100,
    marginLeft: "17%",
    flexDirection: "row",
    marginBottom: "5%"
  },
  imageRectangle: {
    width: "30%",
    height: "15%",
    paddingTop: "30%",
    marginTop: "5%"
  },
  textRectangle: {
    marginLeft: "12%",
    marginTop: "13%",
    fontSize: 30
  },
  portfolio: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 40
  },
  money: {
    color: "#218838",
    marginBottom: 20,
    paddingLeft: 85,
    fontSize: 32
  },
  header: {
    backgroundColor: "#1877F2",
    height: 70
  },
  headerText: {
    paddingTop: 20,
    paddingRight: 100,
    fontSize: 25,
    color: "white",
    fontWeight: "bold"
  },
  crypto: {
    paddingLeft: 30,
    paddingTop: 30,
    fontSize: 25,
    height: 100
  },
  tweetText: {
    color: "#1877F2"
  }
});