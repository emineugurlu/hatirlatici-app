// src/screens/OnboardingScreen.tsx

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  ScrollView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const days = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'];

const OnboardingScreen = ({ navigation }: any) => {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [job, setJob] = useState('');
  const [city, setCity] = useState('');
  const [offDays, setOffDays] = useState<string[]>([]);

  const toggleOffDay = (day: string) => {
    if (offDays.includes(day)) {
      setOffDays(offDays.filter(d => d !== day));
    } else {
      setOffDays([...offDays, day]);
    }
  };

  const saveData = async () => {
    if (!age || !gender || !job || !city) {
      Alert.alert('Lütfen tüm alanları doldurun');
      return;
    }

    const userData = {
      age,
      gender,
      job,
      city,
      offDays,
    };

    try {
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
      Alert.alert('Bilgiler kaydedildi!');
      navigation.navigate('ReminderSelection');
    } catch (e) {
      if (e instanceof Error) {
        Alert.alert('Kaydetme hatası', e.message);
      } else {
        Alert.alert('Kaydetme hatası', 'Bilinmeyen hata oluştu');
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Hoşgeldiniz! Lütfen bilgilerinizi girin.</Text>

      <Text>Yaşınız:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={age}
        onChangeText={setAge}
        placeholder="Örn: 25"
      />

      <Text>Cinsiyetiniz:</Text>
      <TextInput
        style={styles.input}
        value={gender}
        onChangeText={setGender}
        placeholder="Erkek/Kadın"
      />

      <Text>Mesleğiniz:</Text>
      <TextInput
        style={styles.input}
        value={job}
        onChangeText={setJob}
        placeholder="Örn: Öğrenci"
      />

      <Text>Yaşadığınız şehir:</Text>
      <TextInput
        style={styles.input}
        value={city}
        onChangeText={setCity}
        placeholder="Örn: İstanbul"
      />

      <Text>İzin Günleri (tatil günleri):</Text>
      <View style={styles.offDaysContainer}>
        {days.map(day => (
          <TouchableOpacity
            key={day}
            style={[styles.dayButton, offDays.includes(day) && styles.dayButtonSelected]}
            onPress={() => toggleOffDay(day)}
          >
            <Text style={offDays.includes(day) ? styles.dayTextSelected : styles.dayText}>
              {day}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Button title="Devam" onPress={saveData} />
    </ScrollView>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 8,
    marginVertical: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  offDaysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 10,
  },
  dayButton: {
    borderWidth: 1,
    borderColor: '#4A90E2',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 14,
    margin: 4,
  },
  dayButtonSelected: {
    backgroundColor: '#4A90E2',
  },
  dayText: {
    color: '#4A90E2',
  },
  dayTextSelected: {
    color: '#fff',
  },
});
