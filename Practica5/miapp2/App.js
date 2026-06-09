//Zona 1 de Importaciones, componentes y archivos 
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Saludo } from './components/Saludo';
import { Saludo2 } from './components/Saludo2';
import { Perfil } from './components/Perfil';

//zona 2 : Main y componentes
export default function App() {
  return (
    <View style={styles.container}>
      <Image source={require('./assets/wave.png')} />

      <Text>Hola mundo RN!</Text>
        <Text>--------------------------------------------</Text>
        <Saludo></Saludo>
        <Saludo/>
        <Text>--------------------------------------------</Text>

        <Saludo2/>
        <Perfil/>

      <StatusBar style="auto" />
    </View>
  );
}

//zona 3 : Estilos y pososcionamiento 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});