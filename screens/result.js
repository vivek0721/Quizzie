import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const Result = ({navigation, route}) => {
    const {score}= route.params

const ShowResult= score>40? "https://img.freepik.com/free-vector/hand-drawn-racing-driver-winning-prize_23-2147878659.jpg?t=st=1709063956~exp=1709067556~hmac=62edcfebfbe91bdae7e935c060446b5475489017ab10c631e85795a628f6e21e&w=826"
:"https://img.freepik.com/free-vector/failure-grunge-text_460848-9361.jpg?t=st=1709064043~exp=1709067643~hmac=fe0c361deab51e11ff9e5ebee703b32ffe3411a7b293dab33ce655b806a9231d&w=1060"
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Result</Text>
      <Text style={styles.title}>{score}</Text>
      <View  style={styles.bannerContainer}>
      <Image source={{uri: ShowResult}}
        style={styles.banner}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={()=> navigation.navigate("Home")} style={styles.button}>
            <Text style={styles.buttonText}>Home</Text>
        </TouchableOpacity>
      </View>
    </View>
    
  )
}

export default Result;

const styles = StyleSheet.create({
    banner:{
        width: 400,
        height: 400,
      },
      bannerContainer:{
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
      },
      container:{
        marginVertical: 40,
        marginHorizontal: 14,
        height: "100%",
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
      buttonContainer:{
        marginBottom: 60
      },
      title:{
        fontSize: 40,
        fontWeight: "800",
        alignSelf: "center"
    }
})