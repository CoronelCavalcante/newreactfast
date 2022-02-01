import React,{ useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, SafeAreaView, ActivityIndicator, ScrollView } from 'react-native';



export default function OrdemDetails( {route , navigation} ){


    global.Buffer = global.Buffer || require('buffer').Buffer    
    const token = '34:04158e2b764e4b456df04043b585a5673d4d0721d95d2578269b87e46f4628ed';

    const [isLoading, setLoading] = useState(true);
    const [OS, setOS] = useState([]);
    const [clienteAPI, setClienteAPI] = useState([]);
    const [isLoadingCliente, setLoadingCliente] = useState(true);

    

    useEffect(() => {
        fetch('https://abn.redeip.com.br/webservice/v1/cliente', 
        {
          method: 'POST',
          headers:
            {
              'Content-Type': 'application/json',
              Authorization: 'Basic ' + new Buffer.from(token).toString('base64'),
              ixcsoft: 'listar'
            },
          body: JSON.stringify({
            
              qtype: 'cliente.id',
              query: route.params?.obj.id_cliente,
              oper: '=',
              page: '1',
              rp: '4',
              sortname: 'cliente.id',
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
          <TouchableOpacity onPress={() => navigation.navigate('LoginDetails', {obj})}>
            <Text style={styles.cell}>   
              <Text style={{fontWeight: 'bold'}}> ID OS: </Text> {route.params?.obj.id}  ID DA OS PELO CLIENTE?:
              {'\n'}           
              ID Cliente: {obj.id}
              {'\n'}
              Razao social: {obj.razao}
              {'\n'} 
              Fatasia: {obj.fatasia}   
              {'\n'}
              Mensagem: {'\n'} {route.params?.obj.mensagem}   
              {'\n'} 
              id Atendente: {route.params?.obj.id_atendente}
              {'\n'}
              CPF/CNPJ: {obj.cnpj_cpf}  
              {'\n'}
              Endereco pela OS:{route.params?.obj.endereco}  
              {'\n'}
              Endereco pelo Cliente: {obj.endereco}  
              {'\n'}
              
              
                                          
            </Text>
         </TouchableOpacity>
            );
    
        }
        ;
        
        
      

          
        
         
    

    return(   
            <View style={styles.container}>
              {isLoading ? (<ActivityIndicator/>) : 
                (   <> 
                      <FlatList
                      data={OS.registros}
                      renderItem={({ item }) => (
                       Listar(item)
                      )
                      } 
                  /> 
                     
                </>
                )} 


            </View>
    )
    
            
              
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
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
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor:"#E4EBEE",
    fontSize: 18,
    marginBottom: 2, 
    }
  });