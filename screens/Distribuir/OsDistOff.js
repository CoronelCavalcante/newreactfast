import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  FlatList,  
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';


//essa tela é usadas para monstrar ao gerente que ordem ja foram distribuidas e ainda nao foram concluidas
export default function OsDistOff({route , navigation} ) {
    const savedOS = route.params.dist;
    

    



      function Listar(obj) {
        return(
                 
          <TouchableOpacity onPress={() => navigation.navigate('DetalhesDist',{obj: obj, token: route.params.token })}>
            <Text style={styles.cell}>   
              <Text style={{fontWeight: 'bold'}}>ID Ordem: </Text> {obj.ordem_servico.id}
              {'\n'}
              email funcionario: {obj.employee.email}
              {'\n'}
              nome cliente: {obj.cliente?.razao}
      
              {'\n'}              
              email manager: {obj.poster.email}
              {'\n'}
              distribuida em: {obj.distribuida.created_at}
                                                        
            </Text>
         </TouchableOpacity>
            );
    
        }
        ;


  return (
    <View style={styles.container}>
         
                                  
                    <> 

                     <View>
                         <Text style={styles.topo}>Ordem  Distribuidas Não Concluidas salvas: {'\n'}</Text>
                         <Button style={styles.loginBtn} color='green'onPress={() => navigation.navigate('ModalAllDist',{OS: savedOS, token: route.params.token })} title="Ver Ordens concluidas"/>

                         <FlatList
                        data={savedOS}
                        renderItem={({item, index})=>
                        item.distribuida.completed ? (console.log("")) : (Listar(item, index))
                        }
              
                        />
                         
                     </View>
                     
                </>
                
                

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
    fontSize: 16

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
    marginTop: 20,
    marginBottom: 20,
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