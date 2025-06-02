// src/screens/MeetingReminderScreen.tsx

import React, { useState } from 'react';
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

interface WeatherInfo {
  temperature: number; // °C
  description: string; // Güneşli, Bulutlu, vb.
}

const cityWeatherMap: Record<string, WeatherInfo> = {
  'İstanbul': { temperature: 22, description: 'Güneşli' },
  'Ankara': { temperature: 18, description: 'Bulutlu' },
  'İzmir': { temperature: 25, description: 'Güneşli' },
  'Bingöl': { temperature: 12, description: 'Yağmurlu' },
  // Diğer şehirleri ekleyebilirsiniz...
};

interface ClothingSuggestion {
  minTemp: number;
  maxTemp: number;
  professions: string[];
  recommendation: string;
}

const clothingSuggestions: ClothingSuggestion[] = [
  {
    minTemp: -10,
    maxTemp: 5,
    professions: ['Bilgisayar Mühendisi', 'Yazılımcı', 'Mühendis'],
    recommendation:
      'Hava çok soğuk. Kalın kaban, kazak ve bot giyin. Toplantıda şık bir atkı tercih edebilirsiniz.',
  },
  {
    minTemp: 6,
    maxTemp: 18,
    professions: ['Bilgisayar Mühendisi', 'Yazılımcı', 'Mühendis'],
    recommendation:
      'Serin bir hava var. İnce bir kazak veya hafif ceket, altına uzun pantolon önerilir.',
  },
  {
    minTemp: 19,
    maxTemp: 30,
    professions: ['Bilgisayar Mühendisi', 'Yazılımcı', 'Mühendis'],
    recommendation:
      'Ilık bir gün. İnce gömlek veya polo yaka tişört, altına şık bir chino pantolon uygun olacaktır.',
  },
  {
    minTemp: 31,
    maxTemp: 50,
    professions: ['Bilgisayar Mühendisi', 'Yazılımcı', 'Mühendis'],
    recommendation:
      'Çok sıcak bir hava var. Açık renkli kısa kollu gömlek ve ince kumaş pantolon (eğer işyeri izni varsa şort) tercih edebilirsiniz.',
  },
];

type Props = NativeStackScreenProps<RootStackParamList, 'MeetingReminder'> & {
  userData: UserData;
};

const MeetingReminderScreen: React.FC<Props> = ({ userData }) => {
  const [meetingDate, setMeetingDate] = useState('');
  const [meetingTopic, setMeetingTopic] = useState('');

  const getWeatherForCity = (cityName: string): WeatherInfo | null => {
    return cityWeatherMap[cityName] || null;
  };

  const getClothingSuggestion = (
    weather: WeatherInfo,
    user: UserData
  ): string => {
    const temp = weather.temperature;
    const found = clothingSuggestions.find(
      (item) =>
        temp >= item.minTemp &&
        temp <= item.maxTemp &&
        item.professions.includes(user.job)
    );
    return found
      ? found.recommendation
      : 'Hava bilgisi tam değil. Lütfen günlük giyim tercihinize güvenin.';
  };

  const handleSave = () => {
    if (!meetingDate.trim()) {
      Alert.alert('Eksik Bilgi', 'Lütfen toplantı tarih ve saatini girin.');
      return;
    }
    if (!meetingTopic.trim()) {
      Alert.alert('Eksik Bilgi', 'Lütfen toplantı konusunu girin.');
      return;
    }
    console.log('Toplantı Tarihi:', meetingDate);
    console.log('Toplantı Konusu:', meetingTopic);
  };

  const weather = getWeatherForCity(userData.city);
  const clothingAdvice = weather
    ? getClothingSuggestion(weather, userData)
    : 'Hava verisi bulunamadı. Genel giyim tercihlerinize bakın.';

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Toplantı Detayları</Text>

      <TextInput
        style={styles.input}
        placeholder="Tarih ve Saat (DD/MM/YY 15:00)"
        placeholderTextColor="#888888"
        value={meetingDate}
        onChangeText={setMeetingDate}
      />
      <View style={{ height: 12 }} />
      <TextInput
        style={styles.input}
        placeholder="Toplantı Konusu"
        placeholderTextColor="#888888"
        value={meetingTopic}
        onChangeText={setMeetingTopic}
      />
      <View style={{ height: 12 }} />
      <Button title="Kaydet" onPress={handleSave} color="#8BC34A" />

      <View style={styles.suggestionContainer}>
        <Text style={styles.suggestionTitle}>Giyim Önerisi</Text>
        <Text style={styles.suggestionText}>{clothingAdvice}</Text>
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
  },
});
