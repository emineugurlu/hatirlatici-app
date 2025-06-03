import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

interface ContentItem {
  id: string;
  title: string;
  items: string[];
  instructions: string;
  category: string;
  level: number;
  type: string;
}

const DetoxListScreen = () => {
  const [recipes, setRecipes] = useState<ContentItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await getDocs(collection(db, 'content'));
      const list = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as ContentItem[];
      setRecipes(list);
    };

    fetchData();
  }, []);

  const renderItem = ({ item }: { item: ContentItem }) => (
    <View style={styles.card}>
      <Text style={styles.title}>🥤 {item.title}</Text>
      {item.items.map((i, index) => (
        <Text key={index}>• {i}</Text>
      ))}
      <Text style={styles.instruction}>📘 {item.instructions}</Text>
    </View>
  );

  return (
    <FlatList
      data={recipes}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  card: {
    backgroundColor: '#fffbea',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  instruction: {
    marginTop: 8,
    fontStyle: 'italic',
    color: '#444',
  },
});

export default DetoxListScreen;
