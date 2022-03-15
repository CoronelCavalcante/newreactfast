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
    const [isLoading, setLoading] = useState(true);
    const [OS, setOS] = useState([]);
    const [savedToken, setSavedToken] = useState(route.params.token.access_token);
    const [loadingNT, setLoadingNT] = useState(true);   
    const [savedOS, setSavedOs] = useState([]);
    const [savedLoading, setSavedLoading] = useState(true);
    const [date, setDate] = useState();

    const storeData = async (value) => {
      try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem('@ManagerComplete', jsonValue)
         await AsyncStorage.setItem('@APIDate', String(new Date()))
         //console.log("logando um date qualquer:", String(new Date())  )
         //console.log("device info:", DeviceInfo.getTimezone());

      } catch (e) {
        console.log("Erro ao salvar.",e)
      }
    }

    async function getToken(){
      let result = await SecureStore.getItemAsync("token");
      if (result){
        setSavedToken(result)
        console.log("token no saved token:", savedToken)

      } else{
        console.log("else do getToken")
      }
    }



    async function APICall(){
    console.log("API CAL ACIONADA")
    var myHeaders = new Headers();
  
    myHeaders.append("Authorization", "Bearer " + savedToken);
    console.log("logando myheaders:",myHeaders);
    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };
    console.log("logando request options antes do fetch:", requestOptions);     
    fetch("http://168.195.212.5:8000/OS/Manager", requestOptions)
    .then(response => response.json())
    .then(result => {result.detail ==="could not validate credentials" ? (console.log("token expirado ", result.detail), loadingNT ? (newToken()):(console.log("new token false"))) : (console.log("setOS result"), setOS(result))})
    .then(OS.length>0 ? (console.log("SALVANDO A OS"),setLoading(false), storeData(OS), setLoadingNT(true)) : (console.log("false OS length")))
    .catch(error => console.log('error', error))
    }

    
    // async function getEmail(){
    //   let result = await SecureStore.getItemAsync("email");
    //   if (result){
    //     console.log("true do get email" , result)
    //     return(result)

    //   } else{
    //     console.log("else do getEmail")
    //   }
    // }
    // async function getPassword(){
    //   let result = await SecureStore.getItemAsync("password");
    //   if (result){
    //     console.log("true do get password", result)
    //     return(result)

    //   } else{
    //     console.log("else do getEmail")
    //   }
    // }

    async function newToken(){
    console.log("buscando novo token")
    var formdata = new FormData();
    formdata.append("username", route.params.email);
    formdata.append("password", route.params.password);
    
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

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@abertas')
      const date = await AsyncStorage.getItem('@APIDate')
      if (jsonValue !== null) {
        setSavedOs(JSON.parse(jsonValue))
        setDate(date)
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
  

  savedLoading ? (console.log("loading saved"),  getData()) : ( isLoading ? (APICall()) : (console.log("completou o isLoading")));
  return (
    <View style={styles.container}>
     

      <StatusBar style="auto" />



      <View>
      
      <Text style={styles.topo}>Logado como: {route.params.email},data dos dados:{date} </Text>  
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