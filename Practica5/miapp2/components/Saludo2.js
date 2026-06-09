import {Text, View, Image, Button} from 'react-native';

//declaramos componente:
 export const Saludo2 = () => {
    return(
        <View>

        <Text>Hola RN: Componente Propio 3 elementos!</Text>

         <Image source={require('../assets/wave.png')} />

         <Button title= "Hola 204"></Button>

         </View>
    );
}