import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const ReminderSelectionScreen = ({ navigation }: any) => {
  const handleSelection = (type: string) => {
    console.log(`${type} seçildi`);
    // navigation.navigate('WaterReminder') gibi yönlendirme ekleyeceğiz
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bugün neyi hatırlamak istersiniz?</Text>
      
      <TouchableOpacity style={styles.button} onPress={() => handleSelection('Su')}>
        <Text style={styles.buttonText}>💧 Su İçmeyi</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => handleSelection('Yemek')}>
        <Text style={styles.buttonText}>🍽️ Yemek Yemeyi</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => handleSelection('Toplantı')}>
        <Text style={styles.buttonText}>📅 Toplantıyı</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => handleSelection('Diğer')}>
        <Text style={styles.buttonText}>📌 Diğer</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ReminderSelectionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#4A90E2',
    padding: 15,
    borderRadius: 12,
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
});
