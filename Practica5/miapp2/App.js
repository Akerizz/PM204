//Zona 1 de Importaciones, componentes y archivos 
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import MenuScreen from './screens/MenuScreen';

//zona 2 : Main y componentes
export default function App() {
  return (
    <View style={styles.container}>

      <MenuScreen></MenuScreen>

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
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
});