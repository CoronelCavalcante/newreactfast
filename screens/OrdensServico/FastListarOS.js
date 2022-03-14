import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Alert
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
//import DeviceInfo from 'react-native-device-info';








export default function FastListarOS({route , navigation} ) {

    const [isLoading, setLoading] = useState(true);
    const [OS, setOS] = useState([]);
    const [savedToken, setSavedToken] = useState("");
    const [loadingNT, setLoadingNT] = useState(true);    
    

    const storeData = async (value) => {
      try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem('@abertas', jsonValue)
         await AsyncStorage.setItem('@abertasDate', String(new Date()))
         //console.log("logando um date qualquer:", String(new Date())  )
         //console.log("device info:", DeviceInfo.getTimezone());

      } catch (e) {
        console.log("Erro ao salvar.",e)
      }
    }
    // const getData = async () => {
    //   try {
    //     const jsonValue = await AsyncStorage.getItem('@abertas')
    //     if (jsonValue !== null) {
    //       setSavedOs(JSON.parse(jsonValue))
    //       return(setSavedLoading(false))
    //     }
    //     else{
    //       return(console.log('nodata'))
    //     }
    //     ;
    //   } catch(e) {
    //     console.log("ERROR NO GET DATA: ",e)
    //   }
    // }
    // const getData = async () => {
    //   try {
    //     const jsonValue = await AsyncStorage.getItem('@abertas')
    //     return jsonValue != null ? JSON.parse(jsonValue) : null;
    //   } catch(e) {
    //     // error reading value
    //   }
    // }
    // // console.log(getSaved)
    // async function save(key, value){
    //   await SecureStore.setItemAsync(key, value)
    // }

    // async function getSaved(){
    //   let result = await SecureStore.getItemAsync('Abertas');
    //   if (result){
    //     setSavedOs(result),
    //     console.log(savedOS)
    //   } else{
    //     console.log("else do Abertas")
    //   }
    // }
    async function getToken(){
      let result = await SecureStore.getItemAsync("token");
      if (result){
        setSavedToken(result)
        console.log("token no saved token:", savedToken)

      } else{
        console.log("else do getToken")
      }
    }

    // var myHeaders = new Headers();
    // myHeaders.append("Authorization", "Bearer "+ savedToken);
    // var requestOptions = {
    // method: 'GET',
    // headers: myHeaders,
    // redirect: 'follow'
    // };
    // useEffect(() => {
    // getToken();
    // console.log("confirmo useEffect");
    // savedToken ? (
    //   console.log("tru do saved token ?"),
    // fetch("http://168.195.212.5:8000/OS/Abertas", requestOptions)
    // .then(response => response.json())
    // .then(result => {result.detail ==="could not validate credentials" ? (console.log("token expirado ", result.detail), newToken()) : (console.log(""), setOS(result))})
    // .then(OS.length>0 ? (setLoading(false), storeData(OS)) : (console.log()))
    // .catch(error => console.log('error', error))) : (console.log("carregando saved token"))}, [savedToken])


    


    async function APICall(){
      console.log("API CAL ACIONADA")
    getToken();
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+ savedToken);
    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };  
    savedToken ? (
    console.log("tru do saved token ?"),
    fetch("http://168.195.212.5:8000/OS/Abertas", requestOptions)
    .then(response => response.json())
    .then(result => {result.detail ==="could not validate credentials" ? (console.log("token expirado ", result.detail), loadingNT ? (newToken()):(console.log("new token false"))) : (console.log(""), setOS(result))})
    .then(OS.length>0 ? (setLoading(false), storeData(OS), setLoadingNT(true)) : (console.log()))
    .catch(error => console.log('error', error))) 
    : (console.log("carregando saved token"))
    }

    
    async function getEmail(){
      let result = await SecureStore.getItemAsync("email");
      if (result){
        console.log("true do get email" , result)
        return(result)

      } else{
        console.log("else do getEmail")
      }
    }
    async function getPassword(){
      let result = await SecureStore.getItemAsync("password");
      if (result){
        console.log("true do get password", result)
        return(result)

      } else{
        console.log("else do getEmail")
      }
    }

    async function newToken(){
    console.log("buscando novo token")
    var formdata = new FormData();
    formdata.append("username", await getEmail());
    formdata.append("password", await getPassword());
    
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
    .then(response => {SecureStore.setItemAsync("token", response.access_token), setLoadingNT(false)})
    .catch(error => {error.status == 403 ? console.log("Usuario ou Senha Incorreta") : (console.log("Impossivel Conectar ao servidor")) });
      
  };
    



      function Listar(obj) {
        return(          
          <TouchableOpacity onPress={() => navigation.navigate('ModalOS',{obj: obj, token: route.params.token })}>
            <Text style={styles.cell}>   
              <Text style={{fontWeight: 'bold'}}>ID da Ordem: </Text> {obj.ordem_servico.id}
              {'\n'}
              data abertura: {obj.ordem_servico.data_abertura}
              {'\n'}
              Razao social: {obj.cliente?.razao}
              {'\n'}
              {obj.ordem_servico.mensagem}
             
                                                        
            </Text>
         </TouchableOpacity>

            );
    
        }
        ;


  isLoading ? (APICall()) : (console.log());
  return (
    <View style={styles.container}>
         {isLoading ? (<View><Text>Aguarde! pode demorar até 30 segundos</Text></View>) : 
                (
                    
                    <> 
                     <View>
                         <Text style={styles.topo}>Ordem de Servicos abertas: {OS.length}</Text>
                         <FlatList
                        data={OS}
                        renderItem={({item, index})=>
                        Listar(item, index)
                
                            }
              
                        />
                         
                     </View>
              
                </>
                
                )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      alignSelf: 'stretch',
      textAlign: 'left',
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection:'row',
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
  topo: {
    height: 50,
    padding: 10,
    color: 'black',
    fontSize: 18

  },



  TextInput: {
    height: 50,
    padding: 10,
    marginLeft: 20,
    color: 'black'
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
  lista:{

    padding: 24,
    alignSelf: 'stretch',
    textAlign: 'center',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
    cell:{
    padding: 18,    
    borderRadius: 5,    
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor:"#3D95D8",
    fontSize: 18,
    marginBottom: 2, 
    color: 'white',
    }
});