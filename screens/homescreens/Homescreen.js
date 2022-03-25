import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';


//tela principal para funcionarios por enquanto so a função de acessar OS deles ou log off,mas ja fica pronto para implementações futuras
export default function Homescreen( {route , navigation}) {
  const [savedToken, setSavedToken] = useState(route.params.token);
  const [savedOS, setSavedOs] = useState([]);
  const [savedLoading, setSavedLoading] = useState(true);
  const [date, setDate] = useState();
  const [espera, setEspera] = useState(true);



  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('@ManagerComplete', jsonValue);
      await AsyncStorage.setItem('@APIDate', String(new Date()));

    } catch (e) {
      console.log("Erro ao salvar.",e)
    }
  }

  async function clearAll() {
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
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@ManagerComplete')
      const date = await AsyncStorage.getItem('@APIDate')
      if (jsonValue !== null) {
        setSavedOs(JSON.parse(jsonValue))
        setDate(date)
        console.log("getData Concluido")
        return(setSavedLoading(false))
      }
      else{
        return(console.log('nodata')),
        setSavedLoading(false)
      } 
      ;
    } catch(e) {
      console.log("ERROR NO GET DATA: ",e)
    }
  }

  const APIcall = async() =>{
    try{
      var myHeaders = new Headers();  
      myHeaders.append("Authorization", "Bearer " + savedToken);
      var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
      };
      console.log("fetchAPICALL");
      const response = await fetch("http://168.195.212.5:8000/OS/My", requestOptions);
      const json = await response.json();
      json.detail === "could not validate credentials"? (await newToken(),setSavedLoading(true)) : (console.log("APIcall NAO tem detail"),setSavedOs(json),storeData(json))
      return(console.log("apifetch completo"));

    }
    catch(e){
      console.log("catch do APICall", e)
    }
  }
  const newToken = async()=>{
    try{
        var formdata = new FormData();
        formdata.append("username", route.params.email);
        formdata.append("password", route.params.password);
        
        
        var requestOptions = {
          method: 'POST',
          body: formdata,
          redirect: 'follow'
        };
       
       const response = await fetch("http://168.195.212.5:8000/login", requestOptions);
       const json = await response.json();
       json.detail ? (console.log("deu algum erro no new token", json)):
       (  
        setSavedToken(json.access_token.toString()),
        SecureStore.setItemAsync("token", json.access_token.toString())
        
      )


    }
    catch(e){
     console.log("catch newToken ",e)
    }
  }  


  const CarregarDados = async() =>{
    savedLoading ? (
      setSavedLoading(false),
      await getData(),
      await APIcall(),
      setEspera(false)
      ) 
    :
    (
      console.log("else carregar dados")
    )
  }
    
  
  




CarregarDados();



  return (
    <View style={styles.container}>
     

      <StatusBar style="auto" />
      
     
      <View style={styles.inputView}>
      <TouchableOpacity style={styles.TextInput} onPress={()=>{navigation.navigate('MyOsOff', {myos: savedOS,token: savedToken})}}>
      <Text style={[{color: 'white'}]}>Minhas Ordens</Text>
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