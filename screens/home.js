import {Image, StyleSheet, Text, View ,TouchableOpacity} from 'react-native';
import React from 'react';
import Title from '../components/title';
import { createStackNavigator } from '@react-navigation/stack';
import { Dropdown } from 'react-native-element-dropdown';
  import AntDesign from '@expo/vector-icons/AntDesign';

const Home = ({navigation}) => {
 return (
    <View style= {styles.container}> 
      <Title/>
      <View style= {styles.bannerContainer} >
        <Image source={{uri: 'https://img.freepik.com/free-vector/hand-drawn-innovation-concept_52683-76273.jpg?size=626&ext=jpg&ga=GA1.1.1115343824.1708869851&semt=sph'}}
        style={styles.banner}
        />
      </View >
     
        
      <View style ={styles.buttonContainer}>
      <TouchableOpacity onPress={()=> navigation.navigate('Quiz')} 
       style= {styles.button} >
        <Text style={styles.buttonText}>Start</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
    container:{
        paddingTop: 60,
        paddingHorizontal: 14,
        height: "100%",
    },
    banner:{
        width: "100%",
        height: 500,
        
      },
      bannerContainer:{
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
        flex: 1,
      },
      buttonContainer : {
        marginBottom: 16,

      },
      button:{
        width: "100%",
        backgroundColor: '#22223b',
        padding: 20,
        borderRadius: 25,
        alignItems: "center",
      },
      buttonText:{
        fontWeight: "800",
        fontSize: 20,
        color: "white"

      },

      
});