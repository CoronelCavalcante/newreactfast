import React,{ useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, SafeAreaView, ActivityIndicator, ScrollView } from 'react-native';




export default function  listarOrdem({ navigation }){


    global.Buffer = global.Buffer || require('buffer').Buffer    
    const token = '34:04158e2b764e4b456df04043b585a5673d4d0721d95d2578269b87e46f4628ed';

    const [isLoading, setLoading] = useState(true);
    const [OS, setOS] = useState([]);
    const [OS2, setOS2] = useState([]);
    const [clienteAPI, setClienteAPI] = useState([]);
    const [isLoadingCliente, setLoadingCliente] = useState(true);
    const [passou, setPassou] = useState(false);
    const [passouCliente, setPassouCliente]= useState(false);
    const [clienteListar, setClienteListar]  = useState([]);
    const [juntaOrdemCliente, setJuntaOrdemCliente] = useState([])
    

    function fetchOrdem() {
      console.log("ESTOU NO FETCH ORDEM")
          fetch('https://abn.redeip.com.br/webservice/v1/su_oss_chamado', 
        {
          method: 'POST',
          headers:
            {
              'Content-Type': 'application/json',
              Authorization: 'Basic ' + new Buffer.from(token).toString('base64'),
              ixcsoft: 'listar'
            },
          body: JSON.stringify({
            
              qtype: 'su_oss_chamado.status',
              query: 'A',
              oper: '=',
              page: '1',
              rp: '100',
              sortname: 'su_oss_chamado.id',
              sortorder: 'asc'
            }),
          json: true
          }
          
          ) 
          .then((response) => response.json())
          .then((json) => {setOS(json.registros)})
          .catch((error) => alert(error))
          .then(setLoading(false))
          
          

      
      
      
        }



            
        function fetchCliente(obj) {
          console.log("ESTOU NO FETCH CLIENTE")
          return  ( 
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
             query: obj.id_cliente,
              oper: '=',
              page: '1',
              rp: '1',
              sortname: 'cliente.id',
              sortorder: 'asc'
            }),
          json: true
     
       }) 
          .then((response) => response.json())
          .then((json) => {setClienteAPI(clienteAPI => [...clienteAPI, json.registros[0]])})
          .catch((error) => alert(error))
          
      )}
      ;

       

      function Listar(obj) {
        console.log("ESTOU NO LISTAR")
        return  ( 
        
          <TouchableOpacity onPress={() => navigation.navigate('OrdemDetails', {obj})}>
          
            <Text style={styles.cell}>
            ID OS: {obj.id}
            {'\n'}      
            ID do Cliente pelo OS registros: {obj.id_cliente}
            {'\n'}  
             
           
                          
           </Text> 
           </TouchableOpacity>   
           
            );
            
        }
        ;
      function buscarClientes(){
        console.log("ESTOU NO BUSCARCLIENTES")
        OS.map((key, index) => {
          return(
            fetchCliente(key)
          )
        
        })
      ,setLoadingCliente(false)
      
      

      }   
      
  

    return(
          
            <View style={styles.container}>
              {isLoading ? ( fetchOrdem()) : (  isLoadingCliente ? (setTimeout(() => {buscarClientes();
}, 500),console.log("ISLOADINGCLIENTE")): (
                  <>  
                      <Text style={styles.text}>Total de Ordem Abertas: {Object.keys(OS).length} TAMANHO DO CLIENTE: {Object.keys(clienteAPI).length}</Text>
                     <FlatList
                     data={OS}
                     keyExtractor={(item) => item.id}
                     renderItem={({ item }) => (
                      Listar(item)
                     )
                     } 
                     
                     />
                      
                      

                      
                     
                      </>
                     
                      
                  
                  
                ))}
            </View>
    )

            
              
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignSelf: 'stretch',
      textAlign: 'center',
      backgroundColor: '#0000',
      alignItems: 'center',
      justifyContent: 'center', 
      marginBottom: 10,
      marginTop: 10,
      
      
    },
    text: {
      fontSize: 18,
      color: '#2f354b',
      textAlign: 'center',
      fontWeight: 'bold',
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
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor:"#E4EBEE",
    fontSize: 18,
    marginBottom: 2, 
    }
  });