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
import openMap from "react-native-open-maps";




//supostamente nao tem problema se o cliente nao tem login mas ainda falta teste
export default function ModalOS({route , navigation}){
  var cliente = route.params.obj.cliente
  var ordem = route.params.obj.ordem_servico
  var login = route.params.obj.login
  var horario = 'fail switch'
  console.log(ordem.endereco)
  console.log(ordem.latitude, "E ", ordem.longitude)
  switch(ordem.melhor_horario_agenda){
    case "Q":
      horario = 'Qualquer';
      break;
    case "M":
      horario = 'Manha';
      break;
    case "T":
      horario = 'Tarde';
      break;
    case "N":
      horario = 'Noite';
      break;    
  }
  

  function abrirNoMaps() {
    return(
       <Button 
    onPress={()=> openMap({query: ordem.endereco})}
    title="Click To Open Maps"/>
    )
    
  }

  function distribuir(){
    if(route.params.token.manager == true){
      return(<Button onPress={() => navigation.navigate('ModalDist',{obj: route.params.obj, token: route.params.token })} title="Distribuir OS"/>)
    }
    else{
      return ("Logado como funcionario")
    }
  };
    return(
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>
          {cliente.id} {cliente.razao}
          {'\n'}
          endereco: {ordem.endereco}
          {'\n'}
          fone: {cliente.fone} - {cliente.telefone_comercial} - {cliente.celular}
          {'\n'}
          ID assunto: {ordem.id_assunto}
          {'\n'}
          {ordem.mensagem}
          {'\n'}
          melhor horario: {horario}
          {'\n'}
          {'\n'}
          A fazer parte de Atendimento concluido
          {'\n'}
          {'\n'}
          Dados tecnicos:
          Hardware: {login.id_hardware}
          {'\n'}
          tipo_conexao: {login.tipo_conexao}
          {'\n'}
          tipo_equipamento: {login.tipo_equipamento}
          {'\n'}
          interface transmissao: {login.interface_transmissao}
          {'\n'}
          interface transmissao fibra: {login.interface_transmissao_fibra}
          {'\n'}
          usuario: {login.usuario_router}
          {'\n'}
          sinal: {login.sinal_ultimo_atendimento}
          {'\n'}
          {'\n'}
          A fazer parte de CONTRATO para pegar STATUS 
          {'\n'}
          {'\n'}
          A fazer achar antena.....
          {'\n'}
          {'\n'}
          senha r1: {login.senha_router1}
          {'\n'}
          Endereço ip: {login.ip}
          {'\n'}
          Endereço Mac: {login.mac}
          {'\n'}{'\n'}
          A FAZER DETALHES E OBSERVAÇÕES
          {'\n'}{'\n'}
          A fazer metodo de conclusao de OS  
          {'\n'}{'\n'}
          {distribuir()}                {abrirNoMaps()}   
          
          


        
          
        </Text>
       
      </View>
      
    );
  }