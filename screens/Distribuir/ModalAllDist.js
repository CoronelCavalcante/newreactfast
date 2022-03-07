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
  ActivityIndicator
} from "react-native";



export default function ModalAllDist({route , navigation} ) {


      function Listar(obj) {
        return(          
          <TouchableOpacity onPress={() => {navigation.navigate('ModalOS',{obj: obj, token: route.params.token }), title="Ver tambem ordens concluidas"}}>
            <Text style={styles.cell}>   
              <Text style={{fontWeight: 'bold'}}>ID da Ordem: {obj.ordem_servico.id} </Text> 
              {'\n'}
              ID Cliente: {obj.cliente?.id}
              {'\n'}
              Razao social: {obj.cliente?.razao}
              {'\n'}
              {obj.ordem_servico.mensagem}
              {'\n'}
              Atribuida por:  {obj.givem_by}
              {'\n'}
              Status da ordem pelo IXC:
              {obj.ordem_servico.status}
                                                        
            </Text>
         </TouchableOpacity>
            );
    
        }
        ;



  return (
    <View style={styles.container}> 
                
                    
                    <> 
                     <View>
                         <Text style={styles.topo}>Total de ordens de servico distribuidas: {route.params.OS.length}</Text>
      
                         <FlatList
                        data={route.params.OS}
                        renderItem={({item, index})=>
                        Listar(item, index)
                
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