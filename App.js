import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/Login';
import Homescreen from './screens/homescreens/Homescreen';
import ManagerHome from './screens/homescreens/ManagerHome';
import ModalOS  from './screens/detalhes/ModalOS';
import CreateUser from './screens/CreateUser';
import ListaEmp from './screens/Employees/ListaEmp';
import ModalDist from './screens/detalhes/ModalDist';
import DetalhesDist from './screens/Distribuir/DetalhesDist';
import DetalhesEmp from './screens/Employees/DetalhesEmp';
import AllMyOSModal from './screens/OrdensServico/AllMyOSModal';
import ModalAllDist from './screens/Distribuir/ModalAllDist';
import MyOsOff from './screens/OrdensServico/MyOSOff'
import ListarOsOff from './screens/OrdensServico/ListarOSOff';
import OsDistOff from './screens/Distribuir/OsDistOff';
//APP apenas serva para criar organizar a navegação do APP com tack navigator e imediatamente ja manda para a Tela Login


const Stack = createNativeStackNavigator();

function App() {
  return(
    <NavigationContainer>
        <Stack.Navigator screenOptions={{ gestureEnbled: false}}>
            <Stack.Screen name= "Login" component={Login} options={{title: 'Login', headerShown: false}} />
            <Stack.Screen name= "Homescreen" component={Homescreen} options={{title: 'Home Employee', headerShown: false}} />
            <Stack.Screen name= "ManagerHome" component={ManagerHome} options={{title: 'Home Manager', headerShown: false}} />
            <Stack.Screen name= "CreateUser" component={CreateUser} options={{title: 'Adicionar Novo Funcionario'}} />
            <Stack.Screen name= "ListaEmp" component={ListaEmp} options={{title: 'Lista de Funcionarios'}} />
            <Stack.Screen name= "ModalOS" component={ModalOS} options={{title: 'Ordem de Servico'}} screenOptions={{presetation:'modal'}} />
            <Stack.Screen name= "ModalDist" component={ModalDist} options={{title: 'Escolha um funcionario para distribuir a ordem'}} screenOptions={{presetation:'modal'}} />
            <Stack.Screen name= "DetalhesDist" component={DetalhesDist} options={{title: 'Ordem de Servico'}} screenOptions={{presetation:'modal'}} />
            <Stack.Screen name= "DetalhesEmp" component={DetalhesEmp} options={{title: 'Detalhes do funcionario'}} screenOptions={{presetation:'modal'}} />
            <Stack.Screen name= "AllMyOSModal" component={AllMyOSModal} options={{title: 'Todas as Ordens ja distribuidas'}} screenOptions={{presetation:'modal'}} />
            <Stack.Screen name= "ModalAllDist" component={ModalAllDist} options={{title: 'Todas as Ordens ja distribuidas'}} screenOptions={{presetation:'modal'}} />
            <Stack.Screen name= "MyOsOff" component={MyOsOff} options={{title: 'Minhas Ordens Abertas Salva'}} />
            <Stack.Screen name= "ListarOsOff" component={ListarOsOff} options={{title: 'Lista de Ordens Abertas Salvas'}} />
            <Stack.Screen name= "OsDistOff" component={OsDistOff} options={{title: 'Detalhes Ordens Distribuidas Offline'}} />
          </Stack.Navigator>    
    </NavigationContainer>

  );
}


export default App;




