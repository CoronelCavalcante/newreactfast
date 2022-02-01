import React,{ useState, useEffect } from "react";

import {StyleSheet,View, Text, FlatList, ActivityIndicator,TouchableOpacity} from "react-native"


global.Buffer = global.Buffer || require('buffer').Buffer    
    const token = '34:04158e2b764e4b456df04043b585a5673d4d0721d95d2578269b87e46f4628ed';
    

class App extends React.Component{
   constructor(){

    super();
    this.state={
        isLoadingOrdem: true,
        isLoadingCliente: true,
        ordem:[],
        cliente:[],

    }
   }
   
   async componentDidMount()
    { try{
      await this.apiCall()
      
      
    }

    
      catch(err){
        console.log(err)
      }
    }

    async apiCall(){
        const response = await fetch('https://abn.redeip.com.br/webservice/v1/su_oss_chamado',
        {
          method: 'POST',
          headers: {
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
            sortname: 'su_oss_chamado.id_cliente',
            sortorder: 'asc'
          }),
          json: true
        }

      );
      const data = await response.json();
      this.setState(
        {
          ordem: data,
          isLoadingOrdem: false,
        });
        this.todosClientes();

    }
   async clienteCall(obj){
      const response = await fetch('https://abn.redeip.com.br/webservice/v1/cliente',
       {
         method: 'POST',
         headers: {
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
       });
     const data = await response.json();
     this.setState(
       { cliente: [...this.state.cliente, data.registros[0]] });
       if(this.state.cliente.length === this.state.ordem.registros.length){
        this.sortByKey(),
    
       this.setState({isLoadingCliente: false})}
      else{console.log("ainda nao ta igual")}
       ;
     
      
      
   }
   todosClientes(){
        if(this.state.isLoadingOrdem) {
          console.log("loading Ordem ta como: ", this.state.isLoadingOrdem)        

        }
        else{
          try{
          return  (
            console.log("ESTOU INDO PRA O MAP"),
            this.state.ordem.registros.map((key, index) => 
            this.clienteCall(key)
             ));
          
          }
          catch(err){
            console.log(err)
          } 
        }
   }
    Listar(obj, index) {
    console.log("ESTOU NO LISTAR")
    return  ( 
    
      <TouchableOpacity onPress={() => this.props.navigation.navigate('LoginDetails', {ordem: obj, cliente: this.state.cliente[index]})}>
      
        <Text style={styles.cell}>
        ID OS: {obj.id}
        {'\n'}      
        ID do Cliente OS Registros: {obj.id_cliente}
        {'\n'} 
        ID DO CLIENTE: {this.state.cliente[index].id}  
        {'\n'} 
        NOME DO CLIENTE: {this.state.cliente[index].razao}
        {'\n'} 
        ENDEREÇO: {obj.endereco}
       
                      
       </Text> 
       </TouchableOpacity>   
       
        );
        
    }
    ;
    sortByKey() {
      return this.state.cliente.sort(function(a, b) {
                   
            return a.id - b.id;
          
      });
  }


    render(){
      if (this.state.isLoadingOrdem){
        return(<ActivityIndicator/>)


      }
      else{
        if (this.state.isLoadingCliente){
          return(
          <ActivityIndicator/>
          
          )

        }
        else{
        return(
          
          <View>
              <Text style={styles.text}>Total de Ordem Abertas: {this.state.ordem.total}</Text>
              <FlatList
                data={this.state.ordem.registros}
                renderItem={({item, index})=>
                  this.Listar(item, index)
                
                }
              
              />
              
          </View>
        )
      }
    }
  }


}
const styles = StyleSheet.create({
  container: {
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
  marginBottom: 4, 
  }
});



export default App;