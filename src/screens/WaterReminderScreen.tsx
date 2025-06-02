// src/screens/WaterReminderScreen.tsx

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

interface DetoxRecipe {
  title: string;
  description: string;
  minAge: number;
  maxAge: number;
  professions: string[];
}

const detoxRecipes: DetoxRecipe[] = [
  {
    title: 'Yeşil Çay + Limonlu Su',
    description:
      'Günde 2 fincan yeşil çay ve limonlu su metabolizmayı hızlandırır. Bilgisayar başında uzun oturanlar için hafif bir enerji kaynağıdır.',
    minAge: 18,
    maxAge: 35,
    professions: ['Bilgisayar Mühendisi', 'Yazılımcı', 'Öğrenci'],
  },
  {
    title: 'Salatalık ve Nane Kürü',
    description:
      '1 dilim salatalık + birkaç yaprak taze nane + 1 litre su. Özellikle uzun süre oturarak çalışanlara rahatlık verir.',
    minAge: 25,
    maxAge: 50,
    professions: ['Bilgisayar Mühendisi', 'Tasarımcı', 'Ofis Çalışanı'],
  },
  {
    title: 'Elmalı Tarçınlı Detoks',
    description:
      '1 adet elma dilimlenip üzerine tarçın serpilip ılık suyla karıştırılır. 30 yaş ve üzeri ofis çalışanları için ideal.',
    minAge: 30,
    maxAge: 60,
    professions: ['Bilgisayar Mühendisi', 'Yazılımcı', 'Proje Yöneticisi'],
  },
];

type Props = NativeStackScreenProps<RootStackParamList, 'WaterReminder'>;

const WaterReminderScreen: React.FC<Props> = ({ route }) => {
  const userData: UserData = route.params.userData; // Kesin var
  const [glassCount, setGlassCount] = useState('');

  // Kullanıcının yaş ve mesleğine uygun tarifleri süz
  const getDetoxForUser = (
    recipes: DetoxRecipe[],
    user: UserData
  ): DetoxRecipe[] => {
    return recipes.filter((r) => {
      return (
        user.age >= r.minAge &&
        user.age <= r.maxAge &&
        r.professions.includes(user.job)
      );
    });
  };

  const handleSave = () => {
    console.log('Kaç bardak: ', glassCount);
  };

  const userDetox = getDetoxForUser(detoxRecipes, userData);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.questionText}>
        Gün içinde kaç bardak su içtiniz?
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Ör. 6"
        placeholderTextColor="#888"
        keyboardType="numeric"
        value={glassCount}
        onChangeText={setGlassCount}
      />
      <Button title="Kaydet" onPress={handleSave} color="#8BC34A" />

      {userDetox.length > 0 ? (
        <View style={styles.suggestionContainer}>
          <Text style={styles.suggestionTitle}>Detoks Önerileri:</Text>
          {userDetox.map((item, idx) => (
            <View key={idx} style={styles.recipeCard}>
              <Text style={styles.recipeTitle}>{item.title}</Text>
              <Text style={styles.recipeDesc}>{item.description}</Text>
            </View>
          ))}
        </View>
      ) : (
        <View style={styles.suggestionContainer}>
          <Text style={styles.suggestionTitle}>
            Sizin için uygun detoks tarifi bulunamadı.
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

export default WaterReminderScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  questionText: {
    fontSize: 18,
    marginBottom: 12,
    color: '#333333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 8,
    height: 50,
    paddingHorizontal: 12,
    marginBottom: 12,
    fontSize: 16,
    color: '#333333',
  },
  suggestionContainer: {
    marginTop: 20,
  },
  suggestionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
    color: '#E91E63',
  },
  recipeCard: {
    backgroundColor: '#FFF3E0',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  recipeTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    color: '#333333',
  },
  recipeDesc: {
    fontSize: 14,
    color: '#555555',
  },
});
