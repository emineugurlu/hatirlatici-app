// src/screens/MeetingReminderScreen.tsx

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, UserData } from '../../App';
import axios from 'axios';

type Props = NativeStackScreenProps<RootStackParamList, 'MeetingReminder'>;

const clothingSuggestions = [
  {
    minTemp: -10,
    maxTemp: 5,
    genders: ['Erkek', 'Kadın'],
    recommendation:
      '🧥 Hava çok soğuk. Kalın kaban, kazak ve bot giyin. Atkı unutmayın.',
  },
  {
    minTemp: 6,
    maxTemp: 18,
    genders: ['Erkek', 'Kadın'],
    recommendation:
      '🧣 Serin bir hava. İnce kazak, ceket ve pantolon önerilir.',
  },
  {
    minTemp: 19,
    maxTemp: 30,
    genders: ['Erkek', 'Kadın'],
    recommendation:
      '👕 Ilık hava. Tişört ve ince pantolon yeterli olabilir.',
  },
  {
    minTemp: 31,
    maxTemp: 50,
    genders: ['Erkek', 'Kadın'],
    recommendation:
      '🩳 Çok sıcak! Kısa kollu kıyafetler ve bol sıvı tüketimi önemli.',
  },
];

const MeetingReminderScreen: React.FC<Props> = ({ route }) => {
  const userData: UserData = route.params.userData;
  const [reminderDate, setReminderDate] = useState('');
  const [reminderNote, setReminderNote] = useState('');
  const [temperature, setTemperature] = useState<number | null>(null);
  const [weatherDesc, setWeatherDesc] = useState('');
  const [advice, setAdvice] = useState('');

  useEffect(() => {
    fetchWeather(userData.city);
  }, [userData.city]);

  const fetchWeather = async (city: string) => {
    try {
      const apiKey = 'YOUR_API_KEY'; // 🔁 Kendi OpenWeatherMap API anahtarınızı buraya ekleyin
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=tr&appid=${apiKey}`
      );

      const temp = response.data.main.temp;
      const desc = response.data.weather[0].description;

      setTemperature(temp);
      setWeatherDesc(desc);
      suggestClothing(temp, userData.gender);
    } catch (error) {
      setWeatherDesc('');
      setAdvice('⚠️ Hava verisi alınamadı. Genel tercihlere bakınız.');
    }
  };

  const suggestClothing = (temp: number, gender: string) => {
    const match = clothingSuggestions.find(
      (item) =>
        temp >= item.minTemp &&
        temp <= item.maxTemp &&
        item.genders.includes(gender)
    );

    setAdvice(match ? match.recommendation : 'Giyim önerisi bulunamadı.');
  };

  const handleSave = () => {
    if (!reminderDate.trim()) {
      Alert.alert('Eksik Bilgi', 'Lütfen tarih girin.');
      return;
    }
    if (!reminderNote.trim()) {
      Alert.alert('Eksik Bilgi', 'Lütfen hatırlatma notu girin.');
      return;
    }

    console.log('Hatırlatıcı:', reminderDate, reminderNote);
    Alert.alert('Başarılı', 'Hatırlatıcı kaydedildi.');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Hatırlatıcı Detayları</Text>

      <TextInput
        style={styles.input}
        placeholder="Tarih (06.06.2025)"
        value={reminderDate}
        onChangeText={setReminderDate}
      />
      <View style={{ height: 12 }} />
      <TextInput
        style={styles.input}
        placeholder="Hatırlatma Konusu"
        value={reminderNote}
        onChangeText={setReminderNote}
      />
      <View style={{ height: 12 }} />
      <Button title="Kaydet" onPress={handleSave} color="#8BC34A" />

      <View style={styles.suggestionContainer}>
        <Text style={styles.suggestionTitle}>👕 Giyim Önerisi</Text>
        {temperature !== null && (
          <Text style={styles.suggestionText}>
            {userData.city} - {temperature}°C - {weatherDesc}
          </Text>
        )}
        <Text style={styles.suggestionText}>{advice}</Text>
      </View>
    </ScrollView>
  );
};

export default MeetingReminderScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 8,
    height: 50,
    paddingHorizontal: 12,
    fontSize: 14,
    color: '#333333',
  },
  suggestionContainer: {
    marginTop: 24,
    backgroundColor: '#E1F5FE',
    borderRadius: 8,
    padding: 12,
  },
  suggestionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#1976D2',
  },
  suggestionText: {
    fontSize: 14,
    color: '#333333',
    marginBottom: 4,
  },
});
