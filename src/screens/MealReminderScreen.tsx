// src/screens/MealReminderScreen.tsx

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, UserData } from '../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'MealReminder'>;

interface MealEntry {
  time: string;
  description: string;
}

const badFoods = ['cips', 'kola', 'şeker', 'hamburger', 'fast food'];
const calories = {
  yumurta: 78,
  peynir: 90,
  ekmek: 70,
  domates: 10,
  salatalık: 5,
  zeytin: 15,
  çay: 0,
  cips: 150,
  kola: 210,
  elma: 52,
  muz: 89,
  'yeşil çay': 0,
};

const getTimeEmoji = (time: string): string => {
  const hour = parseInt(time.split(':')[0]);
  if (hour >= 5 && hour < 11) return '🌅 Sabah';
  if (hour >= 11 && hour < 16) return '☀️ Öğle';
  if (hour >= 16 && hour < 22) return '🌙 Akşam';
  return '🌃 Gece';
};

const MealReminderScreen: React.FC<Props> = ({ route }) => {
  const userData: UserData = route.params.userData;
  const [entries, setEntries] = useState<MealEntry[]>([
    { time: '08:00', description: '' },
  ]);
  const [totalCalories, setTotalCalories] = useState<number>(0);
  const [warning, setWarning] = useState('');
  const [advice, setAdvice] = useState('');

  const handleChange = (index: number, field: keyof MealEntry, value: string) => {
    const updated = [...entries];
    updated[index] = { ...updated[index], [field]: value };
    setEntries(updated);
  };

  const handleAddEntry = () => {
    setEntries([...entries, { time: '08:00', description: '' }]);
  };

  const handleSave = () => {
    let calorieSum = 0;
    let hasBadFood = false;

    entries.forEach((entry) => {
      const desc = entry.description.toLowerCase();
      Object.keys(calories).forEach((food) => {
        if (desc.includes(food)) calorieSum += calories[food];
      });
      badFoods.forEach((bad) => {
        if (desc.includes(bad)) hasBadFood = true;
      });
    });

    setTotalCalories(calorieSum);
    setAdvice(
      calorieSum < 600
        ? '🍽️ Biraz daha beslenmelisin!'
        : calorieSum < 1500
        ? '✅ Dengeli bir gün geçiriyorsun.'
        : '⚠️ Bugün fazla kalori almış olabilirsin!'
    );
    setWarning(hasBadFood ? '🚫 Zararlı yiyecekler tespit edildi.' : '');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Bugün Yedikleriniz</Text>

      {entries.map((entry, idx) => (
        <View key={idx} style={styles.card}>
          <Text style={styles.cardHeader}>{getTimeEmoji(entry.time)}</Text>
          <TextInput
            style={styles.input}
            placeholder="08.00"
            value={entry.time}
            onChangeText={(val) => handleChange(idx, 'time', val)}
          />
          <TextInput
            style={styles.input}
            placeholder="Öğün açıklaması"
            value={entry.description}
            onChangeText={(val) => handleChange(idx, 'description', val)}
          />
        </View>
      ))}

      <Button title="+ YENİ ÖĞÜN EKLE" onPress={handleAddEntry} color="#E91E63" />
      <View style={{ height: 10 }} />
      <Button title="KAYDET" onPress={handleSave} color="#8BC34A" />

      {totalCalories > 0 && (
        <View style={styles.feedbackBox}>
          <Text style={styles.calorieText}>Toplam Kalori: {totalCalories} kcal</Text>
          <Text style={styles.advice}>{advice}</Text>
          {warning !== '' && <Text style={styles.warning}>{warning}</Text>}
        </View>
      )}
    </ScrollView>
  );
};

export default MealReminderScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 16,
  },
  card: {
    borderWidth: 1,
    borderColor: '#EEE',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    backgroundColor: '#FAFAFA',
  },
  cardHeader: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 44,
    marginTop: 4,
    backgroundColor: '#FFF',
  },
  feedbackBox: {
    marginTop: 16,
    padding: 14,
    backgroundColor: '#FFF3E0',
    borderRadius: 8,
    alignItems: 'center',
  },
  calorieText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },
  advice: {
    fontSize: 15,
    color: '#333',
  },
  warning: {
    fontSize: 14,
    marginTop: 6,
    color: '#C62828',
    fontWeight: 'bold',
  },
});
