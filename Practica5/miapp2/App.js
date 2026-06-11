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
      
        <Perfil style={styles.targetaverde}
        nombre="Jorge" 
        carrera="ISC" 
        materia="Programación Movil" 
        cuatri="Cuatrimestre 9"
        />
         
         <Perfil style={styles.targetaroja}
         nombre="Maria" 
         carrera="LAGE" 
         materia="Las escondidas" 
         cuatri="Cuatrimestre 9"
         />

         <Perfil style={styles.targetaverde}
        nombre="Jorge2" 
        carrera="ISC" 
        materia="Programación Movil" 
        cuatri="Cuatrimestre 9"
        />

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
    targetaverde:{
      backgroundColor: '#6BDB6B',
    },
    targetaroja:{
      backgroundColor: '#9c120b',  
    },
    
});