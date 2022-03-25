import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect  } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';

//parte ainda em teste para tarefas no Background
// import MyTask from "../../MyTask";


// const registerMyTask = () =>{
//   MyTask.register()
//     .then(()=> console.log("task registered"))
//     .catch(error => console.log(error))
// }

// const unRegisterMyTask = () =>{
//   MyTask.unregister()
//     .then(()=> console.log("task unregistered"))
//     .catch(error => console.log(error))
// }





export default function ManagerHome( {route , navigation}) {
    const [savedToken, setSavedToken] = useState(route.params.token);
    const [savedOS, setSavedOs] = useState([]);
    const [savedLoading, setSavedLoading] = useState(true);
    const [date, setDate] = useState();
    const [espera, setEspera] = useState(true);

    
    const storeData = async (value) => {
      try {
        console.log("STORE DATA FOI ACIONADO AGORA")
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
      const response = await fetch("http://168.195.212.5:8000/OS/Manager", requestOptions);
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
        console.log("buscando novo token");
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
        SecureStore.setItemAsync("token", json.access_token)
        
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



      <View>
      <Text  style={styles.topo}>
      Usuario: {route.params.email}{'\n'}
      Dados Armazenados: {savedLoading ? ("carregando") : (Object.keys(savedOS).length > 0 ?("Prontos") :("Nao ha dados"))}
      {'\n'}Estado do banco: {espera ? ("Sincronizando...") : ("Sincronização concluida")}
      {'\n'}Ultima Sincronizacao: {date ? (date): ("Carregando")} </Text>  
      </View> 
     
      
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