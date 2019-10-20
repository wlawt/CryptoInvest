import React from 'react';
import { View, TextInput } from 'react-native';


export default function SettingsScreen() {
  return (
    <View>
      <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}>Hello</TextInput>
    </View>
  )
}

SettingsScreen.navigationOptions = {
  title: 'app.json',
};
