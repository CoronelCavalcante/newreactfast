import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/Login';
import Homescreen from './screens/homescreens/Homescreen';
import ManagerHome from './screens/homescreens/ManagerHome';
import FastListarOS  from './screens/OrdensServico/FastListarOS';
import ModalOS  from './screens/detalhes/ModalOS';
import CreateUser from './screens/CreateUser';
import MyOS from './screens/OrdensServico/MyOS';
import ListaEmp from './screens/Employees/ListaEmp';
import OsDist from './screens/Distribuir/OsDist';
import ModalDist from './screens/detalhes/ModalDist';
import DetalhesDist from './screens/Distribuir/DetalhesDist';
import DetalhesEmp from './screens/Employees/DetalhesEmp';
import allMyOsModal from './screens/OrdensServico/allMyOSModal'

const Stack = createNativeStackNavigator();

function App() {
  return(
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name= "Login" component={Login} options={{title: 'Login'}} />
            <Stack.Screen name= "Homescreen" component={Homescreen} options={{title: 'Home Employee'}} />
            <Stack.Screen name= "ManagerHome" component={ManagerHome} options={{title: 'Home Manager'}} />
            <Stack.Screen name= "CreateUser" component={CreateUser} options={{title: 'Criar novo usuario'}} />
            <Stack.Screen name= "FastListarOS" component={FastListarOS} options={{title: 'Lista de Ordens Abertas'}} />
            <Stack.Screen name= "MyOS" component={MyOS} options={{title: 'Minhas Ordens Abertas'}} />
            <Stack.Screen name= "ListaEmp" component={ListaEmp} options={{title: 'Lista de Funcionarios'}} />
            <Stack.Screen name= "OsDist" component={OsDist} options={{title: 'Lista de Os distribuidas'}} />
            <Stack.Screen name= "ModalOS" component={ModalOS} options={{title: 'Ordem de Servico'}} screenOptions={{presetation:'modal'}} />
            <Stack.Screen name= "ModalDist" component={ModalDist} options={{title: 'Escolha um funcionario para distribuir a ordem'}} screenOptions={{presetation:'modal'}} />
            <Stack.Screen name= "DetalhesDist" component={DetalhesDist} options={{title: 'Ordem de Servico'}} screenOptions={{presetation:'modal'}} />
            <Stack.Screen name= "DetalhesEmp" component={DetalhesEmp} options={{title: 'Detalhes do funcionario'}} screenOptions={{presetation:'modal'}} />
            <Stack.Screen name= "allMyOsModal" component={allMyOsModal} options={{title: 'Todas as Ordens ja distribuidas'}} screenOptions={{presetation:'modal'}} />

        </Stack.Navigator>    
    </NavigationContainer>

  );
}


export default App;




