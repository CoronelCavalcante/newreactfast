import React,{ useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, SafeAreaView, ActivityIndicator, ScrollView } from 'react-native';



export default function LoginDetails( {route , navigation} ){


    global.Buffer = global.Buffer || require('buffer').Buffer    
    const token = '34:04158e2b764e4b456df04043b585a5673d4d0721d95d2578269b87e46f4628ed';

    const [isLoading, setLoading] = useState(true);
    const [OS, setOS] = useState([]);
    const [clienteAPI, setClienteAPI] = useState([]);
    const [isLoadingCliente, setLoadingCliente] = useState(true);


    

    useEffect(() => {
        fetch('https://abn.redeip.com.br/webservice/v1/radusuarios', 
        {
          method: 'POST',
          headers:
            {
              'Content-Type': 'application/json',
              Authorization: 'Basic ' + new Buffer.from(token).toString('base64'),
              ixcsoft: 'listar'
            },
          body: JSON.stringify({
            
              qtype: 'radusuarios.id_cliente',
              query: route.params?.ordem.id_cliente,
              oper: '=',
              page: '1',
              rp: '100',
              sortname: 'radusuarios.id_cliente',
              sortorder: 'asc'
            }),
          json: true
          }
          
          ) 
          .then((response) => response.json())
          .then((json) => {setOS(json)})
          .catch((error) => alert(error))
          .then(setLoading(false));     

      
      
      
        })

      function Listar(obj) {
        return(          
          
            <Text style={styles.cell}>   
             
              ID Cliente pela tabela login: {obj.id_cliente}
              {'\n'}
              ID login pela tabela login: {obj.id}
              {'\n'}
              Login pela tabela login: {obj.login}
              {'\n'}
              
                                          
            </Text>
            );
    
        }
        ;
        
        
      

          
        
         
    

    return(   
            <ScrollView>
              {isLoading ? (<ActivityIndicator/>) : 
                (   <>
                      <Text style={styles.text}> 
                        ID Cliente pela tabela ordem: {route.params?.ordem.id_cliente}   
                        {'\n'}
                        ID Cliente pela tabela cliente: {route.params?.cliente.id}   
                        {'\n'}
                        Nome: {route.params?.cliente.razao}  
                        {'\n'}
                        {route.params?.ordem.mensagem}
                        {'\n'}
                        ENDEREÇO: {route.params?.ordem.endereco}
                        {'\n'}
                        {'\n'}
                        ----------------Lista de logins---------------
                      </Text>
                      <FlatList
                      data={OS.registros}
                      renderItem={({ item }) => (
                       Listar(item)
                      )
                      } 
                  /> 
                     
                </>
                )} 


            </ScrollView>
    )
    
            
              
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
    lista:{

        padding: 24,
        flex: 1,
        alignSelf: 'stretch',
        textAlign: 'center',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
    cell:{
      flex: 1,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor:"#E4EBEE",
    fontSize: 18,
    marginBottom: 2, 
    },
    text: {
      flex: 1,
      fontSize: 18,
      color: '#2f354b',
      textAlign: 'center',
      fontWeight: 'bold',
  },
  });