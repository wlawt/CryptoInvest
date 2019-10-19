import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

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
          <Text>{getData()}</Text>
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
  }
});
