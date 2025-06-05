import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'ReminderSelection'>;

const ReminderSelectionScreen: React.FC<Props> = ({ navigation, route }) => {
  const { userData } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hatırlatıcı Seçimi</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('WaterReminder', { userData })}
      >
        <Text style={styles.buttonText}>💧 Su Hatırlatıcı</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('MealReminder', { userData })}
      >
        <Text style={styles.buttonText}>🍽️ Yemek Hatırlatıcı</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('MeetingReminder', { userData })}
      >
        <Text style={styles.buttonText}>🗓️ Hatırlatıcı</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('OtherReminder', { userData })}
      >
        <Text style={styles.buttonText}>🔔 Diğer Hatırlatıcı</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.detoxButton}
        onPress={() => navigation.navigate('DetoxList')}
      >
        <Text style={styles.detoxText}>🧃 Detoks Tarifleri</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ReminderSelectionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#F0F4F8',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  button: {
    backgroundColor: '#8BC34A',
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  detoxButton: {
    marginTop: 20,
    backgroundColor: '#4DD0E1',
    padding: 12,
    borderRadius: 10,
  },
  detoxText: {
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
  },
});
