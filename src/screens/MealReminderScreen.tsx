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

interface MealEntry {
  time: string;       // Örn. '08:00'
  description: string;// Örn. 'Yumurta, ekmek, peynir'
}

// Örnek “Ertesi gün menü önerileri” tipi
interface MealSuggestion {
  title: string;
  items: string[];    // Örn. ['Sabah: Yulaf ezmesi + meyve', 'Öğle: Izgara tavuk + salata', …]
  suitableFor: {
    minAge: number;
    maxAge: number;
    professions: string[];
  };
}

// Örnek öneri listesi. İhtiyaçlarınıza göre genişletin
const mealSuggestions: MealSuggestion[] = [
  {
    title: 'Genç Yazılımcı Dengesi',
    items: [
      'Sabah: Yulaf ezmesi + 1 adet muz',
      'Ara Öğün: 5–6 adet çiğ badem',
      'Öğle: Izgara tavuk göğsü + bol yeşillik',
      'Ara Öğün: Yoğurt + 1 tatlı kaşığı chia tohumu',
      'Akşam: Fırında somon + kuşkonmaz',
    ],
    suitableFor: {
      minAge: 18,
      maxAge: 30,
      professions: ['Bilgisayar Mühendisi', 'Yazılımcı', 'Öğrenci'],
    },
  },
  {
    title: 'Orta Yaş Ofis Çalışanı',
    items: [
      'Sabah: Tam buğday ekmek + avokado + haşlanmış yumurta',
      'Ara Öğün: 1 elma',
      'Öğle: Hindi göğsü + kahverengi pirinç + haşlanmış brokoli',
      'Ara Öğün: Havuç + humus',
      'Akşam: Sebzeli kinoa salatası + zeytinyağı',
    ],
    suitableFor: {
      minAge: 31,
      maxAge: 50,
      professions: ['Bilgisayar Mühendisi', 'Mühendis', 'Ofis Çalışanı'],
    },
  },
  {
    title: 'Dengeli 30+ Dönemi',
    items: [
      'Sabah: Karışık meyve tabağı + yulaf sütü',
      'Ara Öğün: 1 avuç fındık',
      'Öğle: Mercimek çorbası + tam buğday ekmek',
      'Ara Öğün: Kefir + 1 yemek kaşığı keten tohumu',
      'Akşam: Fırınlanmış sebzeler + ızgara hindi',
    ],
    suitableFor: {
      minAge: 30,
      maxAge: 60,
      professions: ['Bilgisayar Mühendisi', 'Proje Yöneticisi', 'Öğretmen'],
    },
  },
];

type MealProps = NativeStackScreenProps<RootStackParamList, 'MealReminder'> & {
  userData: UserData;
};

const MealReminderScreen: React.FC<MealProps> = ({ userData }) => {
  const [entries, setEntries] = useState<MealEntry[]>([
    { time: '', description: '' },
  ]);

  // Kullanıcıya uygun önerileri bulur
  const getMealSuggestionForUser = (suggestions: MealSuggestion[], user: UserData) => {
    return suggestions.find((s) => {
      return (
        user.age >= s.suitableFor.minAge &&
        user.age <= s.suitableFor.maxAge &&
        s.suitableFor.professions.includes(user.job)
      );
    });
  };

  const handleChange = (index: number, field: 'time' | 'description', value: string) => {
    const copy = [...entries];
    copy[index] = { ...copy[index], [field]: value };
    setEntries(copy);
  };

  const handleAddEntry = () => {
    setEntries((prev) => [...prev, { time: '', description: '' }]);
  };

  const handleSave = () => {
    // Burada entries’i kaydedebilir (örneğin lokal state veya async storage vb.)
    console.log('Bugünkü öğünler:', entries);
  };

  const userSuggestion = getMealSuggestionForUser(mealSuggestions, userData);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Bugün Yedikleriniz</Text>

      {entries.map((item, idx) => (
        <View key={idx} style={styles.entryRow}>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Zaman (08:00)"
            placeholderTextColor="#888888"
            value={item.time}
            onChangeText={(val) => handleChange(idx, 'time', val)}
          />
          <TextInput
            style={[styles.input, { flex: 2, marginLeft: 8 }]}
            placeholder="Öğün Açıklaması"
            placeholderTextColor="#888888"
            value={item.description}
            onChangeText={(val) => handleChange(idx, 'description', val)}
          />
        </View>
      ))}

      <Button title="+ Yeni Öğün Ekle" onPress={handleAddEntry} color="#E91E63" />
      <View style={{ height: 12 }} />
      <Button title="Kaydet" onPress={handleSave} color="#8BC34A" />

      {/* Kullanıcıya Uygun Öneriyi Göster */}
      {userSuggestion ? (
        <View style={styles.suggestionContainer}>
          <Text style={styles.suggestionTitle}>Yarınki Menü Önerisi:</Text>
          {userSuggestion.items.map((menuItem, i) => (
            <Text key={i} style={styles.menuItem}>
              • {menuItem}
            </Text>
          ))}
        </View>
      ) : (
        <View style={styles.suggestionContainer}>
          <Text style={styles.suggestionTitle}>
            Size uygun bir menü önerisi bulunamadı.
          </Text>
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
    fontWeight: '600',
    marginBottom: 12,
  },
  entryRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 8,
    height: 50,
    paddingHorizontal: 12,
    fontSize: 14,
  },
  suggestionContainer: {
    marginTop: 24,
    padding: 12,
    backgroundColor: '#FFF3E0',
    borderRadius: 8,
  },
  suggestionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#E91E63',
  },
  menuItem: {
    fontSize: 14,
    color: '#555555',
    marginBottom: 4,
  },
});
