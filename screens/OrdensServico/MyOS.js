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
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function MyOS({route , navigation} ) {

    const [isLoading, setLoading] = useState(true);
    const [OS, setOS] = useState([]);
    const [savedLoading, setSavedLoading] = useState(true)
    const [savedOS, setSavedOs] = useState([]);

    const storeData = async (value) => {
      try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem('@myos', jsonValue)
      } catch (e) {
        console.log("Erro ao salver.",e)
      }
    }
    const getData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('@myos')
        if (jsonValue !== null) {
          setSavedOs(JSON.parse(jsonValue))
          return(setSavedLoading(false))
        }
        else{
          return(console.log('nodata'))
        }
        ;
      } catch(e) {
        console.log("ERROR NO GET DATA: ",e)
      }
    }
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+route.params.token.access_token);
    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };

    useEffect(() => {fetch("http://168.195.212.5:8000/OS/My", requestOptions)
    .then(response => response.json())
    .then(result =>  {setOS(result), storeData(result)})
    .then(OS.length>0 ? (setLoading(false)) : (console.log("is loading ta como: ",isLoading)))
    .catch(error => console.log('error', error));})




      function Listar(obj) {
        return(          
          <TouchableOpacity onPress={() => navigation.navigate('ModalOS',{obj: obj, token: route.params.token })}>
            <Text style={styles.cell}>   
              <Text style={{fontWeight: 'bold'}}>ID da Ordem: {obj.ordem_servico.id} </Text> 
              {'\n'}
              ID Cliente: {obj.cliente.id}
              {'\n'}
              Razao social: {obj.cliente.razao}
              {'\n'}
              {obj.ordem_servico.mensagem}
              {'\n'}
              Atribuida por:  {obj.givem_by}
              {'\n'}
              Status da ordem pelo IXC:
              {obj.ordem_servico.status}
              {'\n'}
              TA COMPLETED? {obj.completed.toString()}
              
                                                        
            </Text>
         </TouchableOpacity>
            );
    
        }
        ;


        getData();

  return (
    <View style={styles.container}>
          {isLoading ? (savedLoading ? (<View><Text>Aguarde! pode demorar até 30 segundos</Text></View>): ( <> 
                     <View>
                         <Text style={styles.topo}>Ordem de Servicos ja salvas: {savedOS.length}</Text>
                         <FlatList
                        data={savedOS}
                        renderItem={({item, index})=>
                        Listar(item, index)
                
                            }
              
                        />
                         
                     </View>
              
                </>)) : 
                (
                    
                    <> 
                     <View>
                         <Text style={styles.topo}>Ordem de Servicos:</Text>
                         <Button onPress={() => navigation.navigate('AllMyOSModal',{OS: OS, token: route.params.token })} title="Ver Ordens concluidas"/>

      
                         <FlatList
                        data={OS}
                        renderItem={({item, index})=>
                        item.completed ? (console.log("")) : 
                        (Listar(item, index))
                
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