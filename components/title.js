import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const Title = () => {
  return (
    <View style= {styles.container}>
      <Text style= {styles.title}>Quizzie</Text>
    </View>
  );
};

export default Title;

const styles = StyleSheet.create({
    container:{
        justifyContent: "center",
        alignItems: "center",
        marginTop: 8,
        

    },
    title:{
        fontSize: 55,
        fontWeight: "800",
    }

});