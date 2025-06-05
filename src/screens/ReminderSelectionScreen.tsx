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

interface WeatherInfo {
  temperature: number;
  description: string;
}

const MeetingReminderScreen: React.FC<Props> = ({ route }) => {
  const userData: UserData = route.params.userData;
  const [reminderDate, setReminderDate] = useState('');
  const [reminderNote, setReminderNote] = useState('');
  const [weatherInfo, setWeatherInfo] = useState<WeatherInfo | null>(null);
  const [recommendation, setRecommendation] = useState('');

  const API_KEY = 'ac782525f21daebd1fe4320a895bc087';

  const getClothingRecommendation = (
    temperature: number,
    gender: string
  ): string => {
    if (temperature < 10) {
      return gender === 'Kadın'
        ? '🧥 Kalın mont, bot ve atkı önerilir.'
        : '🧥 Kalın kaban, kazak ve bot giyebilirsin.';
    } else if (temperature < 20) {
      return gender === 'Kadın'
        ? '🧶 İnce kazak, ceket ve uzun pantolon uygun olur.'
        : '🧥 Hafif mont ve pantolon tercih edebilirsin.';
    } else if (temperature < 30) {
      return gender === 'Kadın'
        ? '👗 Hafif elbise veya tişört + pantolon kombinasyonu harika olur.'
        : '👕 Tişört ve rahat bir pantolon iyi gider.';
    } else {
      return gender === 'Kadın'
        ? '🩱 İnce kıyafetler ve açık renkler tercih edin.'
        : '👕 Kısa kollu tişört ve şort tam sana göre.';
    }
  };

  const fetchWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${userData.city}&appid=${API_KEY}&units=metric&lang=tr`
      );
      const temp = response.data.main.temp;
      const desc = response.data.weather[0].description;
      setWeatherInfo({ temperature: temp, description: desc });
      const clothing = getClothingRecommendation(temp, userData.gender);
      setRecommendation(clothing);
    } catch (error) {
      setWeatherInfo(null);
      setRecommendation('⚠️ Hava verisi alınamadı. Genel tercihlere bakınız.');
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  const handleSave = () => {
    if (!reminderDate.trim()) {
      Alert.alert('Eksik Bilgi', 'Lütfen hatırlatma tarihini girin.');
      return;
    }
    if (!reminderNote.trim()) {
      Alert.alert('Eksik Bilgi', 'Lütfen hatırlatma notu girin.');
      return;
    }
    console.log('Hatırlatma Tarihi:', reminderDate);
    console.log('Hatırlatma Notu:', reminderNote);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Hatırlatıcı Detayları</Text>

      <TextInput
        style={styles.input}
        placeholder="05.06.2025"
        placeholderTextColor="#888"
        value={reminderDate}
        onChangeText={setReminderDate}
      />
      <TextInput
        style={styles.input}
        placeholder="Toplantı, İş, Randevu..."
        placeholderTextColor="#888"
        value={reminderNote}
        onChangeText={setReminderNote}
      />

      <Button title="KAYDET" onPress={handleSave} color="#8BC34A" />

      <View style={styles.suggestionContainer}>
        <Text style={styles.suggestionTitle}>👕 Giyim Önerisi</Text>
        <Text style={styles.suggestionText}>
          {weatherInfo
            ? `${userData.city} için hava: ${weatherInfo.description}, ${weatherInfo.temperature}°C\n${recommendation}`
            : recommendation}
        </Text>
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
    borderColor: '#CCCCCC',
    borderRadius: 8,
    height: 50,
    paddingHorizontal: 12,
    fontSize: 15,
    marginBottom: 10,
    backgroundColor: '#FAFAFA',
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
    color: '#1976D2',
    marginBottom: 6,
  },
  suggestionText: {
    fontSize: 15,
    color: '#333',
  },
});
