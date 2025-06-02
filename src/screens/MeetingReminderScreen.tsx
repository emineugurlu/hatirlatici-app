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

// Basit bir “Hava Durumu” tipi (örn. sıcaklık ve durum)
// Gerçek kullanımda bir API’yi çağırıp state’e atarsınız.
interface WeatherInfo {
  temperature: number; // °C
  description: string; // "Güneşli", "Yağmurlu", vb.
}

// Basit statik hava durumu verisi (şehir bazlı)
const cityWeatherMap: Record<string, WeatherInfo> = {
  Istanbul: { temperature: 22, description: 'Güneşli' },
  Ankara: { temperature: 18, description: 'Bulutlu' },
  Izmir: { temperature: 25, description: 'Güneşli' },
  Bingöl: { temperature: 12, description: 'Yağmurlu' },
  // İstediğiniz kadar şehir ekleyin
};

// Giyim öneri tipi
interface ClothingSuggestion {
  minTemp: number;
  maxTemp: number;
  professions: string[]; // Hangi mesleklere uygun
  recommendation: string;
}

// Örnek giyim öneri listesi
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
      'Serin bir hava var. İnce bir kazak veya spor ceket, altına uzun pantolon önerilir.',
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
      'Çok sıcak bir hava var. Açık renkli kısa kollu gömlek ve şort (eğer ofis kuralları izin veriyorsa) ya da ince kumaş pantolon tercih edebilirsiniz.',
  },
];

type MeetingProps = NativeStackScreenProps<RootStackParamList, 'MeetingReminder'> & {
  userData: UserData;
};

const MeetingReminderScreen: React.FC<MeetingProps> = ({ userData }) => {
  const [meetingDate, setMeetingDate] = useState(''); // “DD/MM/YY 14:00” gibi
  const [meetingTopic, setMeetingTopic] = useState('');

  // Kullanıcının şehrine göre statik hava bilgisini getir
  const getWeatherForCity = (cityName: string): WeatherInfo | null => {
    return cityWeatherMap[cityName] || null;
  };

  // Kullanıcının mesleğine ve sıcaklığa göre giyim önerisi
  const getClothingSuggestion = (
    weather: WeatherInfo,
    user: UserData
  ): string => {
    const temp = weather.temperature;
    // Listeden ilk eşleşeni bul
    const found = clothingSuggestions.find(
      (item) =>
        temp >= item.minTemp &&
        temp <= item.maxTemp &&
        item.professions.includes(user.job)
    );
    return found
      ? found.recommendation
      : 'Hava verileri bulunamadı. Lütfen günlük giyiminize göre rahat bir kombin seçin.';
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

  // Şehrin hava durumunu al
  const weather = getWeatherForCity(userData.city);
  const clothingAdvice = weather
    ? getClothingSuggestion(weather, userData)
    : 'Hava bilgisi bulunamadı. Lütfen genel giyim önerilerine bakın.';

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

      {/* Giyim Önerisi */}
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
