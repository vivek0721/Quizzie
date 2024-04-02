import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Home from './screens/home';
import Quiz from  './screens/quiz';
import Result from './screens/result';
import MyStack from './navigation';
import { NavigationContainer } from '@react-navigation/native';

const App = () => {
  return (
      <NavigationContainer>
      <MyStack/>
      </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    paddingLeft: 16,
    paddingRight: 16,
  },
  banner:{
    width: 300,
    height: 300,
  },
  bannerContainer:{
    justifyContent: "center",
    alignItems: "center",
  }
});
