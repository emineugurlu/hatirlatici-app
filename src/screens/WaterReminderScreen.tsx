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
    name: 'Limonlu Canlandırıcı 🍋',
    ingredients: ['1 bardak ılık su', 'Yarım limon suyu'],
    instructions: 'Suyu hafif ısıtın. Limon suyunu ekleyip sabah aç karnına için.',
    color: '#D0F0C0',
  },
  {
    name: 'Çilekli Detoks 🍓',
    ingredients: ['1 litre su', '6 çilek', 'Yarım limon', '2-3 nane yaprağı'],
    instructions: 'Malzemeleri karıştırın. En az 2 saat buzdolabında bekletip tüketin.',
    color: '#FFEBEE',
  },
  {
    name: 'Salatalıklı Ferahlık 🥒',
    ingredients: ['1 litre su', 'Yarım salatalık', '1 limon', 'Nane'],
    instructions: 'Malzemeleri ince doğrayın, sürahiye koyun. 3 saat soğutun.',
    color: '#E0F2F1',
  },
  {
    name: 'Ananaslı Arındırıcı 🍍',
    ingredients: ['1 litre su', '3 dilim ananas', '1 limon', 'Birkaç nane yaprağı'],
    instructions: 'Tüm malzemeleri karıştırın. Buzdolabında 2 saat bekletin.',
    color: '#FFF3E0',
  },
  {
    name: 'Yeşil Güç 💪',
    ingredients: ['1 litre su', 'Yarım yeşil elma', 'Bir tutam maydanoz', 'Yarım salatalık'],
    instructions: 'Malzemeleri karıştırın, 1-2 saat buzdolabında bekletin.',
    color: '#D0F8CE',
  },
  {
    name: 'Portakallı C Vitamini Bombası 🍊',
    ingredients: ['1 litre su', '1 portakal dilimlenmiş', '1 limon', 'Taze zencefil dilimleri'],
    instructions: 'Malzemeleri ekleyin ve 2 saat buzdolabında bekletin.',
    color: '#FFF8E1',
  },
];

const WaterReminderScreen = () => {
  const [glasses, setGlasses] = useState('');
  const [icons, setIcons] = useState<string[]>([]);
  const [recipe, setRecipe] = useState<any>(null);
  const [message, setMessage] = useState('');
  const [fadeAnim] = useState(new Animated.Value(0));

  const getFeedbackMessage = (count: number) => {
    if (count < 4) return '⚠️ Daha fazla su içmelisin!';
    if (count < 8) return '😊 İyi gidiyorsun! Biraz daha su içersen harika olacak!';
    if (count < 15) return '🎉 Harika! Su hedefini başarıyla tamamladın.';
    return '🚨 Çok fazla su tüketimi zararlı olabilir!';
  };

  const handleSave = () => {
    const count = parseInt(glasses);
    if (isNaN(count) || count < 0) {
      setIcons([]);
      setRecipe(null);
      setMessage('');
      return;
    }

    setIcons(Array.from({ length: Math.min(count, 15) }, () => '🥤'));

    const randomIndex = Math.floor(Math.random() * detoxRecipes.length);
    setRecipe(detoxRecipes[randomIndex]);

    const newMsg = getFeedbackMessage(count);
    setMessage(newMsg);

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
        placeholder="Örn. 6"
        keyboardType="numeric"
        value={glasses}
        onChangeText={setGlasses}
      />
      <Button title="KAYDET" onPress={handleSave} color="#4CAF50" />

      <View style={styles.iconContainer}>
        {icons.map((icon, i) => (
          <Text key={i} style={styles.icon}>{icon}</Text>
        ))}
      </View>

      {message && (
        <Animated.View style={[styles.messageContainer, { opacity: fadeAnim }]}>
          <Text style={styles.feedbackText}>{message}</Text>
        </Animated.View>
      )}

      {recipe && (
        <View style={[styles.card, { backgroundColor: recipe.color }]}>
          <Text style={styles.cardTitle}>{recipe.name}</Text>
          <Text style={styles.subtitle}>Malzemeler:</Text>
          {recipe.ingredients.map((item: string, i: number) => (
            <Text key={i} style={styles.item}>• {item}</Text>
          ))}
          <Text style={styles.subtitle}>Yapılışı:</Text>
          <Text style={styles.instructions}>{recipe.instructions}</Text>
        </View>
      )}
    </ScrollView>
  );
};

export default WaterReminderScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F9F9F9',
    flexGrow: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    backgroundColor: '#FFF',
    fontSize: 16,
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
  messageContainer: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#E8F5E9',
    borderRadius: 8,
  },
  feedbackText: {
    fontSize: 16,
    color: '#2E7D32',
    textAlign: 'center',
  },
  card: {
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    width: '100%',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
  },
  item: {
    fontSize: 14,
    marginLeft: 8,
    marginBottom: 2,
  },
  instructions: {
    fontSize: 14,
    marginTop: 4,
  },
});
