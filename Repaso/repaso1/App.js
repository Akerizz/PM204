import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import RegistroScreen from './screens/RegistroScreen';

export default function App() {
  return (
    <View style={styles.container}>
      <RegistroScreen />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});