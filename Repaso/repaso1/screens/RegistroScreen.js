import React, { useState } from 'react';
import { View, Text, TextInput, Switch, StyleSheet, Pressable, Alert, SafeAreaView, ScrollView } from 'react-native';

export default function RegistroScreen() {
  const [nombre, setNombre] = useState('');
  const [carrera, setCarrera] = useState('');
  const [semestre, setSemestre] = useState('');
  const [taller, setTaller] = useState(false);
  const [constancia, setConstancia] = useState(false);
  const [deportes, setDeportes] = useState(false);

  const enviarRegistro = () => {
    if (!nombre || !carrera || !semestre) {
      Alert.alert('Campo incompleto', 'Debes llenar todos los campos bobo.');
      return;
    }

    if (isNaN(semestre) || semestre.trim() === '') {
      Alert.alert('Error', 'El semestre debe ser un numero.');
      return;
    }

    const mensajeExito = `Nombre: ${nombre}\nCarrera: ${carrera}\nSemestre: ${semestre}\n\nTaller: ${taller ? 'Ci' : 'No'}\nConstancia: ${constancia ? 'Si' : 'No'}\nDeportes: ${deportes ? 'Si' : 'No'}`;
    
    Alert.alert('Registro enviado', mensajeExito);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.titulo}>Coso de Evento Universitario</Text>
        
        <TextInput 
          style={styles.input} 
          placeholder="Nombre completo" 
          value={nombre} 
          onChangeText={setNombre} 
          placeholderTextColor="#9C27B0"
        />
        <TextInput 
          style={styles.input} 
          placeholder="Carrera" 
          value={carrera} 
          onChangeText={setCarrera} 
          placeholderTextColor="#9C27B0"
        />
        <TextInput 
          style={styles.input} 
          placeholder="Cuatrimestre" 
          value={semestre} 
          onChangeText={setSemestre} 
          keyboardType="numeric" 
          placeholderTextColor="#9C27B0"
        />

        <Text style={styles.subtitulo}>Opciones</Text>

        <View style={styles.filaSwitch}>
          <Text style={styles.textoSwitch}>Asistiras al taller?</Text>
          <Switch 
            value={taller} 
            onValueChange={setTaller} 
            trackColor={{ false: '#E1BEE7', true: '#7B1FA2' }} 
            thumbColor="#fff" 
          />
        </View>

        <View style={styles.filaSwitch}>
          <Text style={styles.textoSwitch}>Requieres constancia?</Text>
          <Switch 
            value={constancia} 
            onValueChange={setConstancia} 
            trackColor={{ false: '#E1BEE7', true: '#7B1FA2' }} 
            thumbColor="#fff" 
          />
        </View>

        <View style={styles.filaSwitch}>
          <Text style={styles.textoSwitch}>Participar en deportes?</Text>
          <Switch 
            value={deportes} 
            onValueChange={setDeportes} 
            trackColor={{ false: '#E1BEE7', true: '#7B1FA2' }} 
            thumbColor="#fff" 
          />
        </View>

        <Pressable style={styles.boton} onPress={enviarRegistro}>
          <Text style={styles.textoBoton}>Enviar Registro</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F3E5F5' },
  scroll: { padding: 25, paddingTop: 50 },
  titulo: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', color: '#4A148C' },
  input: { borderWidth: 1, borderColor: '#AB47BC', borderRadius: 8, padding: 12, marginBottom: 15, fontSize: 16, backgroundColor: '#FFFFFF', color: '#4A148C' },
  subtitulo: { fontSize: 18, fontWeight: 'bold', marginTop: 10, marginBottom: 15, color: '#6A1B9A' },
  filaSwitch: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  textoSwitch: { fontSize: 15, color: '#4A148C', fontWeight: '500' },
  boton: { backgroundColor: '#8E24AA', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 20, elevation: 3 },
  textoBoton: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});