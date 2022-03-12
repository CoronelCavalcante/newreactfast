import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect  } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
// import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';



export default function ManagerHome( {route , navigation}) {
  async function mecherToken() {
    // const keys = ["email", "manager", "token"]
    try {
      SecureStore.setItemAsync("token", "token trocado para nao valido")
      console.log("token trocado para nao valido")
    } catch(e) {
      // clear error
      console.log(e)
    }
  
    console.log('Done.')
  }

  async function clearAll() {
    // const keys = ["email", "manager", "token"]
    try {
      await SecureStore.deleteItemAsync("email"),
      await SecureStore.deleteItemAsync("password"),
      await SecureStore.deleteItemAsync("manager"),
      await SecureStore.deleteItemAsync("token"),
      await AsyncStorage.clear(),
      console.log("CLEAR"),
      await navigation.goBack()
    } catch(e) {
      // clear error
      console.log(e)
    }
  
    console.log('Done.')
  }
  return (
    <View style={styles.container}>
     

      <StatusBar style="auto" />



      <View>
      
      <Text style={styles.topo}>Logado como: {route.params.user}</Text>  
      </View>

      <View style={styles.inputView}>
      <TouchableOpacity style={styles.TextInput} onPress={()=>{mecherToken()}}>
      <Text style={[{color: 'white'}]}>mecher token</Text>
        </TouchableOpacity>
      </View>
     
      <View style={styles.inputView}>
      <TouchableOpacity style={styles.TextInput} onPress={()=>{navigation.navigate('FastListarOS', {token: route.params.token})}}>
      <Text style={[{color: 'white'}]}>Ordens de Servicos</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.inputView}>
      <TouchableOpacity style={styles.TextInput} onPress={()=>{navigation.navigate('ListarOsOff', {token: route.params.token})}}>
      <Text style={[{color: 'white'}]}>Ordens de Servicos OFFLINE</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.inputView}>
      <TouchableOpacity style={styles.TextInput} onPress={()=>{navigation.navigate('OsDist', {token: route.params.token})}}>
      <Text style={[{color: 'white'}]}>Ordens Distribuidas</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.inputView}>
      <TouchableOpacity style={styles.TextInput} onPress={()=>{navigation.navigate('OsDistOff', {token: route.params.token})}}>
      <Text style={[{color: 'white'}]}>Ordens Distribuidas OFFLINE</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.inputView}>
      <TouchableOpacity style={styles.TextInput} onPress={()=>{navigation.navigate('CreateUser', {token: route.params.token})}}>
      <Text style={[{color: 'white'}]}>Novo Funcionario</Text>
        </TouchableOpacity>
      </View>
      
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
      <View style={styles.inputView}>
      <TouchableOpacity style={styles.TextInput} onPress={()=>{navigation.navigate('ListaEmp', {token: route.params.token})}}>
      <Text style={[{color: 'white'}]}>Lista de funcionarios</Text>
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
          {text: "Confirmar", onPress:()=>{clearAll()}}
          
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
    marginTop: 20,

    alignItems: "center",
  },
  
  inputView2: {
    backgroundColor: "red",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginTop: 20,

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

  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#1676DD",
  },
  topo: {
    height: 100,
    padding: 1,
    color: 'black',
    fontSize: 18

  },
});