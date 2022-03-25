import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Button,
} from "react-native";
import openMap from "react-native-open-maps";

//essa tela exibe os detalhes da ordem de servico como teria na de papel
//daqui o usuario pode ver a localização da OS no google maps ou caso gerente distribuir a ordem para outro funcionario

//a fazer: melhorar o CSS para melhorar a leitura da tela

export default function ModalOS({route , navigation}){
  var cliente = route.params.obj.cliente
  var ordem = route.params.obj.ordem_servico
  var login = route.params.obj.login
  var assunto = route.params.obj.assunto
  var contrato = route.params.obj.contrato
  var horario = 'Null'
  console.log(route.params.token)

 
 
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
    title="Endereço no Maps"/>
    )
    
  }

  function distribuir(){
    if(route.params.manager === 'True' ){
      return(<Button onPress={() => navigation.navigate('ModalDist',{obj: route.params.obj, token: route.params.token })} title="Distribuir OS"/>)
    }
    else{
      return ("Logado como funcionario")
    }
  };
   
    return(
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>
          {cliente?.razao}    ID: {cliente?.id} 
          {'\n'}
          Endereço: {ordem.endereco}
          {'\n'}
          fone: {cliente?.fone} - {cliente?.telefone_comercial} - {cliente?.celular}
          {'\n'}
          Assunto: {assunto.assunto}
          {'\n'}
          Melhor Horario: {horario}
          {'\n'}
          {'\n'}
          {ordem.mensagem}
          {'\n'}
          {'\n'}
          Dados tecnicos:
          {'\n'}
          tipo_conexao: {login?.tipo_conexao}
          {'\n'}
          tipo_equipamento: {login?.tipo_equipamento}
          {'\n'}
          interface transmissao: {login?.interface_transmissao}
          {'\n'}
          interface transmissao fibra: {login?.interface_transmissao_fibra}
          {'\n'}
          usuario: {login?.usuario_router}0,
          {'\n'}
          sinal: {login?.sinal_ultimo_atendimento}
          {'\n'}
          {'\n'}
          Bloquerio Automatico: {contrato.bloqueio_automatico}
          {'\n'}
          {'\n'}
          senha r1: {login?.senha_router1}
          {'\n'}
          Endereço ip: {login?.ip}
          {'\n'}
          Endereço Mac: {login?.mac}
          {'\n'}{'\n'}
          {route.params.manager === 'True' ? (distribuir()) : (console.log("no manager "))}                {abrirNoMaps()}     
          


        
          
        </Text>
       
      </View>
      
    );
  }