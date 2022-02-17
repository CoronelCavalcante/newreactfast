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
  Alert,
} from "react-native";
import * as SecureStore from 'expo-secure-store';



export default function Login({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [savedEmail, setSavedEmail] = useState("");
    const [savedPassword, setSavedPassword] = useState("");
    getEmail();
    getPassword();
    savedEmail && savedPassword !== "" ? (logar(savedEmail,savedPassword)) : (console.log("else do savedEmail de "));
    //mais facil de resolver isso é la na tela principal mesmo colocar pra chegar se tem saved email e password se tiver ja mandar pra um saved logar


    async function save(key, value){
      await SecureStore.setItemAsync(key, value)
    }

    async function getEmail(){
      let result = await SecureStore.getItemAsync('email');
      if (result){
        setSavedEmail(result)
      } else{
        console.log("else do getEmail")
      }
    }
    async function getPassword(){
      let result = await SecureStore.getItemAsync('password');
      if (result){
        setSavedPassword(result)
      } else{
        console.log("else do getPassword")
      }
    }




    function logar(email, password){
        var formdata = new FormData();
    formdata.append("username", email);
    formdata.append("password", password);
    
    var requestOptions = {
     method: 'POST',
    body: formdata,
    redirect: 'follow'
    };
    
    fetch("http://168.195.212.5:8000/login", requestOptions)
    .then(response => {if (!response.ok) {
        // create error object and reject if not a 2xx response code COLOCAR ALERTA DE ERROR. mudar o respota token pra uma variavel pq nao pode função
        let err = new Error("HTTP status code: " + response.status)
        err.response = response
        err.status = response.status
        throw err}
        return response.json()})
    .then(result => result.manager ? ( save("email", email),save("password", password) ,navigation.navigate('ManagerHome', {token: result, user: email})) : (navigation.navigate('Homescreen', {token: result, user: email})))
    .catch(error => {error.status == 403 ? Alert.alert("Usuario ou Senha Incorreta") : (Alert.alert("Impossivel Conectar ao servidor")) });
    }
    
    

    // <Image style={styles.image} source={require("./assets/log2.png")} />
  return (
  
    
    <View style={styles.container}> 
      <StatusBar style="auto" />
      <Image
        style={styles.image}
        source={{
          uri: 'https://uptecnologia.net.br/assets/images/up-logo-953x953.png',
        }}
      />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email"
          placeholderTextColor="#FFFFFF"
          onChangeText={(email) => setEmail(email)}
        />
      </View>
      

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password."
          placeholderTextColor="#FFFFFF"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>

      <TouchableOpacity style={styles.loginBtn} onPress={()=>{logar(email,password)}}>
        <Text style={[{color: 'white'}]}>LOGIN</Text>
      </TouchableOpacity>
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
    marginTop: -180,
    marginBottom: 40,
    width: 70,
    height: 65,
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