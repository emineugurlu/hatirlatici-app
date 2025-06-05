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
import axios from 'axios';

type Props = NativeStackScreenProps<RootStackParamList, 'MeetingReminder'>;

interface SavedReminder {
  date: string;
  topic: string;
}

const MeetingReminderScreen: React.FC<Props> = ({ route }) => {
  const userData: UserData = route.params.userData;
  const [date, setDate] = useState('');
  const [topic, setTopic] = useState('');
  const [reminders, setReminders] = useState<SavedReminder[]>([]);
  const [weatherInfo, setWeatherInfo] = useState('');
  const [clothingAdvice, setClothingAdvice] = useState('');

  const API_KEY = 'ac782525f21daebd1fe4320a895bc087';

  const fetchWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${userData.city}&units=metric&lang=tr&appid=${API_KEY}`
      );
      const temp = response.data.main.temp;
      const condition = response.data.weather[0].description;

      setWeatherInfo(`${userData.city} için hava: ${condition}, ${temp.toFixed(1)}°C`);

      if (temp <= 10) {
        setClothingAdvice('🧥 Kalın mont ve atkı giyinmeyi unutmayın.');
      } else if (temp <= 20) {
        setClothingAdvice('🧣 İnce kazak veya hırka tercih edilebilir.');
      } else {
        setClothingAdvice('👕 Hafif elbise veya tişört + pantolon kombinasyonu harika olur.');
      }
    } catch (error) {
      setWeatherInfo('⚠️ Hava verisi alınamadı.');
      setClothingAdvice('Genel tercihlere bakınız.');
    }
  };

  const handleSave = () => {
    if (!date.trim() || !topic.trim()) {
      Alert.alert('Eksik Bilgi', 'Lütfen tarih ve hatırlatma konusunu girin.');
      return;
    }

    setReminders((prev) => [...prev, { date, topic }]);
    setDate('');
    setTopic('');
    fetchWeather();
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
        placeholder="Toplantı, İş, Randevu..."
        value={topic}
        onChangeText={setTopic}
      />
      <Button title="KAYDET" onPress={handleSave} color="#8BC34A" />

      <View style={styles.suggestionContainer}>
        <Text style={styles.suggestionTitle}>👕 Giyim Önerisi</Text>
        <Text style={styles.suggestionText}>{weatherInfo}</Text>
        <Text style={styles.suggestionText}>{clothingAdvice}</Text>
      </View>

      {reminders.length > 0 && (
        <View style={styles.cardContainer}>
          {reminders.map((reminder, index) => (
            <View key={index} style={styles.card}>
              <Text style={styles.cardDate}>{reminder.date}</Text>
              <Text style={styles.cardTopic}>{reminder.topic}</Text>
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
    marginBottom: 4,
  },
  suggestionText: {
    fontSize: 14,
    color: '#333333',
  },
  cardContainer: {
    marginTop: 20,
  },
  card: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    borderLeftWidth: 5,
    borderLeftColor: '#8BC34A',
  },
  cardDate: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
  cardTopic: {
    fontSize: 14,
    color: '#555555',
    marginTop: 4,
  },
});
