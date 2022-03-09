import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function Homescreen( {route , navigation}) {
  async function clearAll() {
    // const keys = ["email", "manager", "token"]
    try {
      await SecureStore.deleteItemAsync("email"),
      await SecureStore.deleteItemAsync("password"),
      await SecureStore.deleteItemAsync("token"),
      await AsyncStorage.clear(),
      console.log("CLEAR")
    } catch(e) {
      // clear error
      console.log(e)
    }
  
    console.log('Done.')
  }
  return (
    <View style={styles.container}>
     

      <StatusBar style="auto" />
      {console.log(route.params.token)}
      
      <View style={styles.inputView}>
      <TouchableOpacity style={styles.TextInput} onPress={()=>{navigation.navigate('MyOS', {token: route.params.token})}}>
      <Text style={[{color: 'white'}]}>Minhas Ordens</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.inputView}>
      <TouchableOpacity style={styles.TextInput} onPress={()=>{navigation.navigate('MyOsOff', {token: route.params.token})}}>
      <Text style={[{color: 'white'}]}>Minhas Ordens OFFLINE</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.inputView2}>
      <TouchableOpacity style={styles.TextInput} onPress={()=>{
    Alert.alert( 
      "tem certeza que desaja sair?",
      "Ao sair as informações salvas serao apagadas e o login nao sera feito altomaticamente ",
      [
          {text: "Cancelar", onPress:()=>console.log("CANCELADO"),
          style: "cancel"},
          {text: "Confirmar", onPress:()=>{clearAll(), navigation.goBack()}}
          
      ])



      }}>
      <Text style={[{color: 'white'}]}>Log OFF</Text>
        </TouchableOpacity>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    marginBottom: 40,
  },

  inputView: {
    backgroundColor: "#1676DD",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,

    alignItems: "center",
  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
    color: 'white'
  },

  forgot_button: {
    height: 30,
    marginBottom: 30,
  },
  inputView2: {
    backgroundColor: "red",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginTop: 20,
  },

  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#1676DD",
  },
  
});