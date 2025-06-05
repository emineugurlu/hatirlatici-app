// src/screens/MeetingReminderScreen.tsx
import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, Button, StyleSheet, ScrollView, Alert
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, UserData } from '../../App';
import axios from 'axios';

type Props = NativeStackScreenProps<RootStackParamList, 'MeetingReminder'>;

interface Reminder {
  date: string;
  time: string;
  topic: string;
}

const MeetingReminderScreen: React.FC<Props> = ({ route }) => {
  const userData: UserData = route.params.userData;
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [topic, setTopic] = useState('');
  const [weatherInfo, setWeatherInfo] = useState<string | null>(null);
  const [recommendation, setRecommendation] = useState('');
  const [reminders, setReminders] = useState<Reminder[]>([]);

  const apiKey = 'ac782525f21daebd1fe4320a895bc087';

  const fetchWeather = async () => {
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${userData.city}&appid=${apiKey}&units=metric&lang=tr`
      );
      const temp = res.data.main.temp;
      const description = res.data.weather[0].description;
      setWeatherInfo(`${userData.city} için hava: ${description}, ${temp}°C`);

      let rec = '';
      if (userData.gender === 'Kadın') {
        if (temp < 10) rec = '🧥 Kalın mont, atkı ve bot tercih edin.';
        else if (temp < 20) rec = '🧣 İnce mont, pantolon uygun olur.';
        else rec = '👗 Hafif elbise ya da tişört + pantolon önerilir.';
      } else {
        if (temp < 10) rec = '🧥 Kalın kaban, atkı ve bot giyin.';
        else if (temp < 20) rec = '🧢 Sweatshirt + pantolon iyi olur.';
        else rec = '👕 Tişört ve rahat bir pantolon yeterli olur.';
      }
      setRecommendation(rec);
    } catch (err) {
      setWeatherInfo(null);
      setRecommendation('⚠️ Hava verisi alınamadı.');
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  const handleSave = () => {
    if (!date || !time || !topic) {
      Alert.alert('Eksik Bilgi', 'Tarih, saat ve konuyu giriniz.');
      return;
    }
    const newReminder = { date, time, topic };
    setReminders((prev) => [...prev, newReminder]);
    setDate('');
    setTime('');
    setTopic('');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Hatırlatıcı Detayları</Text>

      <TextInput
        style={styles.input}
        placeholder="Tarih (05.06.2025)"
        value={date}
        onChangeText={setDate}
      />
      <TextInput
        style={styles.input}
        placeholder="Saat (14:00)"
        value={time}
        onChangeText={setTime}
      />
      <TextInput
        style={styles.input}
        placeholder="Toplantı, İş, Randevu..."
        value={topic}
        onChangeText={setTopic}
      />
      <Button title="KAYDET" onPress={handleSave} color="#8BC34A" />

      <View style={styles.suggestionContainer}>
        <Text style={styles.suggestionTitle}>👕 Giyim Önerisi</Text>
        <Text style={styles.suggestionText}>{weatherInfo || 'Veri alınamadı.'}</Text>
        <Text style={styles.suggestionText}>{recommendation}</Text>
      </View>

      {reminders.length > 0 && (
        <View style={styles.cardList}>
          {reminders.map((item, index) => (
            <View key={index} style={styles.card}>
              <Text style={styles.cardText}>📅 {item.date} - 🕒 {item.time}</Text>
              <Text style={styles.cardText}>📝 {item.topic}</Text>
            </View>
          ))}
        </View>
      )}
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
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    height: 48,
    paddingHorizontal: 12,
    fontSize: 14,
    marginBottom: 10,
  },
  suggestionContainer: {
    marginTop: 20,
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
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  cardList: {
    marginTop: 20,
  },
  card: {
    backgroundColor: '#FFF8E1',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  cardText: {
    fontSize: 14,
    color: '#444',
  },
});
