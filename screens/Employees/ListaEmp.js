import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,  
} from "react-native";


//essa tela é usada para listar os funcionarios no Banco de dados
export default function ListaEmp({route , navigation} ) {

    const [isLoading, setLoading] = useState(true);
    const [Emp, setEmp] = useState([]);
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+route.params.token);
    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };

    useEffect(() => {fetch("http://168.195.212.5:8000/users/all", requestOptions)
    .then(response => response.json())
    .then(result => setEmp(result))
    .then(Emp.length>0 ? (setLoading(false)) : (console.log("is loading ta como: ",isLoading)))
    .catch(error => console.log('error', error));})




      function Listar(obj) {
        var manager = ''
        obj.manager == true ? (manager = 'Sim') : (manager = 'Nao');
        return(          
          
          <TouchableOpacity onPress={() => navigation.navigate('DetalhesEmp',{obj: obj, token: route.params.token, manager: route.params.manager })}>
            <Text style={styles.cell}>   
              <Text style={{fontWeight: 'bold'}}>ID no banco </Text> {obj.id}
              {'\n'}
              Email {obj.email}
              {'\n'}
              Manager: {(manager)}
              {'\n'}
              Criado em: {obj.created_at}
             
                                                        
            </Text>
         </TouchableOpacity>
            );
    
        }
        ;



  return (
    <View style={styles.container}>
         {isLoading ? (<View><Text>Aguarde</Text></View>) : 
                (
                    
                    <> 
                     <View>
                         <Text style={styles.topo}>Total de funcionarios {Emp.length}</Text>
                         <FlatList
                        data={Emp}
                        renderItem={({item, index})=>
                         Listar(item, index)
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