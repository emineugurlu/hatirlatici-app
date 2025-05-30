// src/screens/ReminderSelectionScreen.tsx

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../App';

// Navigatör tipini tanımlıyoruz:
type ReminderSelectionNavProp = NativeStackNavigationProp<
  RootStackParamList,
  'ReminderSelection'
>;

const ReminderSelectionScreen: React.FC = () => {
  const navigation = useNavigation<ReminderSelectionNavProp>();

  const handleSelection = (screen: keyof RootStackParamList) => {
    console.log(`${screen} seçildi`);
    navigation.navigate(screen);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bugün neyi hatırlamak istersiniz?</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => handleSelection('WaterReminder')}
      >
        <Text style={styles.buttonText}>💧 Su İçmeyi</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => handleSelection('MealReminder')}
      >
        <Text style={styles.buttonText}>🍽️ Yemek Yemeyi</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => handleSelection('MeetingReminder')}
      >
        <Text style={styles.buttonText}>📅 Toplantıyı</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => handleSelection('OtherReminder')}
      >
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
