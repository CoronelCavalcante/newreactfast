import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  Switch,
  TouchableOpacity,
  Alert,
} from "react-native";

//METODOS POST PRA HTTP NAO FUNCIONAO NO ANDROID ATUALIZADO. VER SE RESOLVO OU SE ESPERO TER UM HTTPS.
export default function CreateUser( {route , navigation}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);


    function criar(){
        
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer "+route.params.token.access_token);
        myHeaders.append("Content-Type", "application/json");
        
        var raw = JSON.stringify({
          "email": email,
          "password": password,
          "manager": String(isEnabled)
        });
        
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };


        fetch("http://168.195.212.5:8000/users/", requestOptions)
        .then(response => {response.text(),console.log(response.status) ,Alert.alert("resposta", response.status == 201 ? ("Usuario Criado com sucesso"):(response.status==409? ("Email ja registrado"): ("Erro inesperado ao tentar criar usuario")))})
       .catch(error => console.log('error', error));
    }
    // O problema é na resposta do post. ele ta fazendo a operação mas nao to conseguindo esperar pela reposta
    

    // <Image style={styles.image} source={require("./assets/log2.png")} />
  return (
    <View style={styles.container}>
     

      <StatusBar style="auto" />
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


      
          <Text>Esse Funcionario é gerente?</Text>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4,f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    

      <TouchableOpacity style={styles.loginBtn} onPress={()=>{criar()}}>
        <Text style={[{color: 'white', fontSize: 18}]}>CRIAR</Text>
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