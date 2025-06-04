// src/screens/WaterReminderScreen.tsx

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Animated,
} from 'react-native';

const detoxRecipes = [
  {
    name: 'Limonlu Canlandırıcı',
    ingredients: ['1 bardak ılık su', 'Yarım limon suyu'],
    instructions: 'Suyu hafif ısıtın. Limon suyunu ekleyip sabah aç karnına için.',
  },
  {
    name: 'Naneli Ferahlık',
    ingredients: ['1 litre su', '1 limon dilimleri', '5-6 nane yaprağı'],
    instructions: 'Tüm malzemeleri sürahiye koyun. 1 saat buzdolabında bekletin.',
  },
  {
    name: 'Çilekli Detoks',
    ingredients: ['1 litre su', '6 çilek', 'Yarım limon', '2-3 nane yaprağı'],
    instructions: 'Malzemeleri karıştırın. 2 saat soğutup tüketin.',
  },
  {
    name: 'Salatalıklı Ferahlık',
    ingredients: ['1 litre su', 'Yarım salatalık', '1 limon', 'Nane'],
    instructions: 'Malzemeleri dilimleyip 3 saat soğutun.',
  },
  {
    name: 'Elmalı Tarçınlı Detoks',
    ingredients: ['1 litre su', '1 yeşil elma dilimleri', '1 çubuk tarçın'],
    instructions: 'Karıştırıp buzdolabında 2 saat bekletin.',
  },
  {
    name: 'Ananaslı Detoks',
    ingredients: ['1 litre su', '3 dilim ananas', '1 tatlı kaşığı zencefil'],
    instructions: 'Malzemeleri ekleyip 2 saat bekletin.',
  },
];

const WaterReminderScreen = () => {
  const [glasses, setGlasses] = useState('');
  const [glassIcons, setGlassIcons] = useState<string[]>([]);
  const [recipe, setRecipe] = useState<null | typeof detoxRecipes[0]>(null);
  const [message, setMessage] = useState('');
  const fadeAnim = useState(new Animated.Value(0))[0];

  const handleSave = () => {
    const count = parseInt(glasses);
    if (isNaN(count) || count < 0) {
      setGlassIcons([]);
      setRecipe(null);
      setMessage('');
      return;
    }

    const icons = Array.from({ length: Math.min(count, 10) }, () => '🥤');
    setGlassIcons(icons);

    // Random detox
    const randomRecipe = detoxRecipes[Math.floor(Math.random() * detoxRecipes.length)];
    setRecipe(randomRecipe);

    // Hydration feedback
    let reminder = '';
    if (count < 4) reminder = `Bugün çok az su içtin. En az ${8 - count} bardak daha içmelisin.`;
    else if (count < 8) reminder = `İyi gidiyorsun! Hedefe ulaşmak için ${8 - count} bardak daha iç!`;
    else reminder = 'Harika! Günlük su ihtiyacını karşıladın.';

    setMessage(reminder);

    // Fade in message
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Gün içinde kaç bardak su içtiniz?</Text>
      <TextInput
        style={styles.input}
        placeholder="Ör. 6"
        keyboardType="numeric"
        value={glasses}
        onChangeText={setGlasses}
      />
      <Button title="KAYDET" onPress={handleSave} color="#8BC34A" />

      <View style={styles.iconContainer}>
        {glassIcons.map((icon, index) => (
          <Text key={index} style={styles.icon}>{icon}</Text>
        ))}
      </View>

      {recipe && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>{recipe.name}</Text>
          <Text style={styles.cardSubtitle}>Malzemeler:</Text>
          {recipe.ingredients.map((item, idx) => (
            <Text key={idx} style={styles.cardItem}>• {item}</Text>
          ))}
          <Text style={styles.cardSubtitle}>Yapılışı:</Text>
          <Text style={styles.cardText}>{recipe.instructions}</Text>
        </View>
      )}

      <Animated.View style={{ opacity: fadeAnim, marginTop: 16 }}>
        <Text style={styles.feedbackText}>{message}</Text>
      </Animated.View>
    </ScrollView>
  );
};

export default WaterReminderScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    marginBottom: 12,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginVertical: 10,
  },
  icon: {
    fontSize: 24,
    margin: 4,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    width: '100%',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 8,
  },
  cardSubtitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 4,
  },
  cardItem: {
    fontSize: 14,
    marginLeft: 8,
    marginBottom: 2,
  },
  cardText: {
    fontSize: 14,
    marginTop: 4,
  },
  feedbackText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2196F3',
    textAlign: 'center',
  },
});
