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

type Props = NativeStackScreenProps<RootStackParamList, 'WaterReminder'>;

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
    instructions: 'Malzemeleri karıştırın. En az 2 saat buzdolabında bekletip tüketin.',
  },
  {
    name: 'Salatalıklı Canlandırıcı',
    ingredients: ['1 litre su', 'Yarım salatalık', '1 limon', 'Nane'],
    instructions: 'Tüm malzemeleri ince dilimleyip sürahiye ekleyin. 3 saat soğutun.',
  },
];

const WaterReminderScreen: React.FC<Props> = ({ route }) => {
  const { userData } = route.params;
  const [glasses, setGlasses] = useState('');
  const [glassIcons, setGlassIcons] = useState<string[]>([]);
  const [recipe, setRecipe] = useState<null | {
    name: string;
    ingredients: string[];
    instructions: string;
  }>(null);

  const getRandomRecipe = () => {
    const randomIndex = Math.floor(Math.random() * detoxRecipes.length);
    return detoxRecipes[randomIndex];
  };

  const handleSave = () => {
    const count = parseInt(glasses);
    if (isNaN(count) || count < 0) {
      setGlassIcons([]);
      setRecipe(null);
      return;
    }

    const icons = Array.from({ length: Math.min(count, 10) }, () => '🥤');
    setGlassIcons(icons);

    const newRecipe = getRandomRecipe();
    setRecipe(newRecipe);
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
});
