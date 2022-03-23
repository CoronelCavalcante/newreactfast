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
import MyTask from "../../MyTask";


const registerMyTask = () =>{
  MyTask.register()
    .then(()=> console.log("task registered"))
    .catch(error => console.log(error))
}

const unRegisterMyTask = () =>{
  MyTask.unregister()
    .then(()=> console.log("task unregistered"))
    .catch(error => console.log(error))
}



export default function ManagerHome( {route , navigation}) {
    const [isLoading, setLoading] = useState(true);
    const [OS, setOS] = useState([]);
    const [savedToken, setSavedToken] = useState(route.params.token);
    const [loadingNT, setLoadingNT] = useState(true);   
    const [savedOS, setSavedOs] = useState([]);
    const [savedLoading, setSavedLoading] = useState(true);
    const [date, setDate] = useState();
    const [espera, setEspera] = useState(true);
    console.log("LOGANDO O QUE CHEGOU NO MANAGER HOME: ", route.params)

    
    const storeData = async (value) => {
      try {
        console.log("STORE DATA FOI ACIONADO AGORA")
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem('@ManagerComplete', jsonValue);
        await AsyncStorage.setItem('@APIDate', String(new Date()));
         //console.log("logando um date qualquer:", String(new Date())  )
         //console.log("device info:", DeviceInfo.getTimezone());

      } catch (e) {
        console.log("Erro ao salvar.",e)
      }
    }

    // async function getToken(){
    //   let result = await SecureStore.getItemAsync("token");
    //   if (result){
    //     setSavedToken(result)
    //     console.log("token no saved token:", savedToken)

    //   } else{
    //     console.log("else do getToken")
    //   }
    // }



    // async function APICall(){
    // console.log("API CAL ACIONADA")
    // var myHeaders = new Headers();
  
    // myHeaders.append("Authorization", "Bearer " + savedToken);
    // var requestOptions = {
    // method: 'GET',
    // headers: myHeaders,
    // redirect: 'follow'
    // };
    // fetch("http://168.195.212.5:8000/OS/Manager", requestOptions)
    // .then(response => response.json())
    // .then(result => {
    //     result.detail ==="could not validate credentials" ? 
    //       (console.log("token expirado ", result), loadingNT ? 
    //         (newToken())
    //         :
    //         (console.log("Dentro do API Call, LoadingNT: ", loadingNT))
    //       ) : 
    //       (result.detail ? 
    //         (console.log("result tem detail", result.detail))  
    //         :  
    //         (setOS(result))
    //       )
    //   }
    // )
    // .then(Object.keys(OS).length > 0 ? (console.log("SALVANDO A OS"),setLoading(false), storeData(OS)) : (console.log("false OS length ", Object.keys(OS).length)))
    // .catch(error => console.log('error', error))
    // }

    
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

  //   async function newToken(){
  //   console.log("buscando novo token");
  //   var formdata = new FormData();
  //   formdata.append("username", route.params.email);
  //   formdata.append("password", route.params.password);
    
  //   var requestOptions = {
  //    method: 'POST',
  //   body: formdata,
  //   redirect: 'follow'
  //   };
  //   fetch("http://168.195.212.5:8000/login", requestOptions)
  //   .then(response => {if (!response.ok) {
  //       // create error object and reject if not a 2xx response code COLOCAR ALERTA DE ERROR. mudar o respota token pra uma variavel pq nao pode função
  //       let err = new Error("HTTP status code: " + response.status)
  //       err.response = response
  //       err.status = response.status
  //       throw err}
  //       return response.json()})
  //   .then(response => {SecureStore.setItemAsync("token", response.access_token); setLoadingNT(false)})
  //   .catch(error => {error.status == 403 ? console.log("Usuario ou Senha Incorreta") : (console.log("Impossivel Conectar ao servidor")) });
      
  // };


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
  //timer assim nao fucionar pq ficar so conta se o app tiver no foreground ver outra solução para ficar atualizando os dados
  // setInterval(
  // () =>{
  // console.log("INTERVAL"),
  // setSavedLoading(true),
  // console.log("SETsavedloading"),
  // setEspera(true),
  // setLoading(true)}, minute_ms)
  
  
  
  // savedLoading ? 
  //   (console.log("loading saved"),  getData()) 
  //   : 
  //   ( isLoading ? 
  //     (APICall()) 
  //     : 
  //     (espera ? 
  //       (getData(),setEspera(false)) 
  //       : 
  //       (console.log("completou o isLoading e o espera"))
  //     )
  //   );
  const APIcall = async() =>{
    console.log("LOGANDO params API CALL", route.params);
    try{
      var myHeaders = new Headers();  
      myHeaders.append("Authorization", "Bearer " + savedToken);
      var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
      };
      const response = await fetch("http://168.195.212.5:8000/OS/Manager", requestOptions);
      const json = await response.json();
      json.detail === "could not validate credentials"? (await newToken()) : (console.log("APicall NAO tem detail"))
      return(console.log(json));

    }
    catch(e){
      console.log("catch do APICall", e)
    }
  }
  const newToken = async()=>{
    console.log("LOGANDO params", route.params);
    try{
        console.log("buscando novo token");
        var formdata = new FormData();
        formdata.append("username", route.params.email);
        formdata.append("password", route.params.password);
        
        
        var requestOptions = {
          method: 'POST',
          body: formdata,
          redirect: 'follow'
        };
        console.log("infos que irao para o fetch do new token:", requestOptions);
       const response = await fetch("http://168.195.212.5:8000/login", requestOptions);
       const json = await response.json();
       json.detail ? (console.log("deu algum erro no new token", json)):
       (  
        console.log("novo token adquirido"),
        setSavedToken(json),
        await APIcall()
       )


    }
    catch(e){
     console.log("catch newToken ",e)
    }
  }  


  const CarregarDados = async() =>{
    console.log("LOGANDO params CARREGAR DADOS", route.params),
    savedLoading ? (
     
      setSavedLoading(false),
      await getData(),
      await APIcall()
      ) 
    :
    (
      console.log("else dentro do carregar dados")
    )
  }
    
  
  




CarregarDados();
  
  
  return (
    <View style={styles.container}>
     

      <StatusBar style="auto" />



      <View>
      <Text  style={styles.topo}>
      Usuario: {route.params.email}{'\n'}
      Dados Armazenados: {savedLoading ? ("carregando") : (Object.keys(savedOS).length > 0 ?("Prontos") :("Nao ha dados"))}
      {'\n'}Estado do banco: {espera ? ("Sincronizando...") : ("Sincronização concluida")}
      {'\n'}Ultima Sincronizacao: {date ? (date): ("Carregando")} </Text>  
      </View>

      {/* <View style={styles.inputView}>
      <TouchableOpacity style={styles.TextInput} onPress={()=>{mecherToken()}}>
      <Text style={[{color: 'white'}]}>mecher token</Text>
        </TouchableOpacity>
      </View> */}
     
      {/* <View style={styles.inputView}>
      <TouchableOpacity style={styles.TextInput} onPress={()=>{navigation.navigate('FastListarOS', {token: route.params.token})}}>
      <Text style={[{color: 'white'}]}>Ordens de Servicos</Text>
        </TouchableOpacity>
      </View> */}
      <View style={styles.inputView}>
      <TouchableOpacity style={styles.TextInput} onPress={()=>{Object.keys(savedOS).length > 0 ? (navigation.navigate('MyOsOff', {myos: savedOS.minhas_ordens, token: savedToken, manager: route.params.manager})): (Alert.alert("Carregando dados"))}}>
      <Text style={[{color: 'white'}]}>Minhas Ordens</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.inputView}>
      <TouchableOpacity style={styles.TextInput} onPress={()=>{Object.keys(savedOS).length > 0 ? (navigation.navigate('ListarOsOff', {abertas: savedOS.ordens_abertas, token: savedToken, manager: route.params.manager})) : (Alert.alert("Carregando dados"))}}>
      <Text style={[{color: 'white'}]}>Ordens de Servicos</Text>
        </TouchableOpacity>
      </View>
      
      {/* <View style={styles.inputView}>
      <TouchableOpacity style={styles.TextInput} onPress={()=>{navigation.navigate('OsDist', {token: route.params.token})}}>
      <Text style={[{color: 'white'}]}>Ordens Distribuidas</Text>
        </TouchableOpacity>
      </View> */}
      <View style={styles.inputView}>
      <TouchableOpacity style={styles.TextInput} onPress={()=>{Object.keys(savedOS).length > 0 ? (navigation.navigate('OsDistOff', {dist: savedOS.ordens_dist, token: savedToken,manager: route.params.manager})) : (Alert.alert("Carregando dados"))}}>
      <Text style={[{color: 'white'}]}>Ordens Distribuidas</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.inputView}>
      <TouchableOpacity style={styles.TextInput} onPress={()=>{navigation.navigate('CreateUser', {token: savedToken})}}>
      <Text style={[{color: 'white'}]}>Novo Funcionario</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.inputView}>
      <TouchableOpacity style={styles.TextInput} onPress={()=>{registerMyTask()}}>
      <Text style={[{color: 'white'}]}>Registrar Task</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.inputView}>
      <TouchableOpacity style={styles.TextInput} onPress={()=>{SecureStore.setItemAsync("token", 'Token invalido para teste')}}>
      <Text style={[{color: 'white'}]}>Invalidar token</Text>
        </TouchableOpacity>
      </View>
      
      {/* <View style={styles.inputView}>
      <TouchableOpacity style={styles.TextInput} onPress={()=>{navigation.navigate('MyOS', {token: route.params.token})}}>
      <Text style={[{color: 'white'}]}>Minhas Ordens</Text>
        </TouchableOpacity>
      </View> */}
      
      <View style={styles.inputView}>
      <TouchableOpacity style={styles.TextInput} onPress={()=>{navigation.navigate('ListaEmp', {token: savedToken, manager: route.params.manager})}}>
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
    
    padding: 2,
    color: 'black',
    fontSize: 18

  },
});