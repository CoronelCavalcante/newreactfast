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
import { useFocusEffect } from '@react-navigation/native';



//A tela login tenta acessar infos armazenadas no aparecelho para logar automaticamente caso, caso nao seja possivel
//o login manual pode ser feito normalmente quando feito as infos de login e password sao armazenadas de fomra segura no aparelho




export default function Login({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [savedEmail, setSavedEmail] = useState("");
    const [savedManager, setSavedManager] = useState("");
    const [savedToken, setSavedToken] = useState("");
    const [savedPassword, setSavedPassword] = useState("");
    
      useFocusEffect(
        React.useCallback(() =>{
            console.log("CHEGOU NO REFRESH"),
            setEmail(null),
            setPassword(null),
            setSavedEmail(""),
            setSavedManager(""),
            setSavedToken("")
        },[])
      )
      
  
    const getSaved = async() =>{
      await getEmail();
      await getManager();
      await getToken();
      await getPassword();
      savedEmail && savedManager && savedToken && savedPassword !== "" ? (savedLogar()) : (console.log("else do logarsaved "));


    }
    getSaved();

    async function save(key, value){
      await SecureStore.setItemAsync(key, value)
    }

    async function getEmail(){
      let result = await SecureStore.getItemAsync("email");
      if (result){
        setSavedEmail(result),
        console.log("logando saved email", savedEmail)

      } else{
        console.log("else do getEmail")
      }
    }
    async function getManager(){
      let result = await SecureStore.getItemAsync("manager");
      if (result){
        setSavedManager(result),
        console.log("logando saved manager", savedManager)
      } else{
        console.log("else do getManager")
      }
    }
    async function getToken(){
      let result = await SecureStore.getItemAsync("token");
      if (result){
        setSavedToken(result),
        console.log("logando saved token", savedToken)


      } else{
        console.log("else do getToken")
      }
    }
    async function getPassword(){
      let result = await SecureStore.getItemAsync('password');
      if (result){
        setSavedPassword(result),
        console.log("logando saved password", savedPassword)


      } else{
        console.log("else do getPassword")
      }
    }
   
    function savedLogar(){
      (console.log("chegou no savedlogar"))
      const token ={
        access_token: savedToken,
      };
      savedManager === "True" ? (console.log("logando o que vai ser passado para o route:",savedToken,savedPassword,savedEmail),navigation.navigate('ManagerHome',  { password: savedPassword, token: savedToken, email: savedEmail, manager: 'True'})

      ) : (
        navigation.navigate('Homescreen', {token: savedToken, email: savedEmail, password: savedPassword, manager: 'False'})
      )
    }



    function logar(email, password){
    var formdata = new FormData();
    formdata.append("username", email);
    formdata.append("password", password);
    console.log("formdata: ",formdata)
    
    var requestOptions = {
     method: 'POST',
    body: formdata,
    redirect: 'follow'
    };
    
    fetch("http://168.195.212.5:8000/login", requestOptions)
    .then(response => {if (!response.ok) {
        // create error object and reject if not a 2xx response code COLOCAR ALERTA DE ERROR. mudar o respota token pra uma variavel pq nao pode fun????o
        let err = new Error("HTTP status code: " + response.status)
        err.response = response
        err.status = response.status
        throw err}
        return response.json()})
    .then(result => (result.manager ? ( save("email", email),save("password", password), save("token", result.access_token), save("manager", "True") ,navigation.navigate('ManagerHome',  {token: result.access_token, email: email, password: password, manager: 'True'})) : (save("email", email),save("password", password), save("manager", "False", save("token", result.access_token)),navigation.navigate('Homescreen', {manager: 'False',token: result.access_token, email: email, password: password}))))
    .then(setEmail(""),setPassword(""))
    .catch(error => {console.log(error), error.status == 403 ? Alert.alert("Usuario ou Senha Incorreta") : (Alert.alert("Impossivel Conectar ao servidor")) });
    }
    
    



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