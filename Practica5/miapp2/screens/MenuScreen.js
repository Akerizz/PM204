//Zona 1 de Importaciones, componentes y archivos 
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Button } from 'react-native';
import React, { useState } from 'react';
import TargetasScreen from './TargetasScreen';
import SafeScreen from './SafeScreen';
import PresseableScreen from './PresseableScreen';
import ModalBottomSheetScreen from './ModalBottomSheetScreen';
import TextInputAlerts from './TextInputAlerts';
import FlatListScreen from './FlatListScreen';

//zona 2 : Main y componentes
export default function MenuScreen() {
  const [screen, setScreen] = useState('menu');

  switch(screen){
    case 'targetas':
      return <TargetasScreen/>;
    case 'safeArea':
      return <SafeScreen/>;  
    case 'presseable':
      return <PresseableScreen/>;
    case 'modal':
      return <ModalBottomSheetScreen/>;
    case 'textinput':
      return <TextInputAlerts/>;
    case 'flatlist':
      return <FlatListScreen/>;
    case 'menu':
    default:       
      return (
        <View style={styles.container}>
          <View> 
            <Button title='Practica Targetas' onPress={() => setScreen('targetas')} />
          </View>
          <View> 
            <Button title='Practica SafeArea' onPress={() => setScreen('safeArea')} />
          </View>
          <View> 
            <Button title='Practica Presseable' onPress={() => setScreen('presseable')} />
          </View>
          <View> 
            <Button title='Practica Modal' onPress={() => setScreen('modal')} />
          </View>
          <View> 
            <Button title='Practica TextInput' onPress={() => setScreen('textinput')} />
          </View>
          <View> 
            <Button title='Practica FlatList' onPress={() => setScreen('flatlist')} />
          </View>
          <StatusBar style="auto" />
        </View>
      );
  }
}

//zona 3 : Estilos y pososcionamiento 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'column',
  },
});