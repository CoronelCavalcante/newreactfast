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



export default function Login({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function logar(){
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
    .then(result => result.manager ? ( console.log(Object.keys(result)) ,navigation.navigate('ManagerHome', {token: result})) : (navigation.navigate('Homescreen', {token: result})))
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
          placeholder="Email."
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

      <TouchableOpacity style={styles.loginBtn} onPress={()=>{logar()}}>
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