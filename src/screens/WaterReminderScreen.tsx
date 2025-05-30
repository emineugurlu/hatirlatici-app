// src/screens/WaterReminderScreen.tsx

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'waterGlasses';

const WaterReminderScreen: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [glasses, setGlasses] = useState<number>(0);

  // Uygulama açıldığında önce kaydedilmiş değeri oku
  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then(value => {
      if (value) setGlasses(Number(value));
    });
  }, []);

  const handleSave = async () => {
    const num = parseInt(input, 10);
    if (isNaN(num) || num < 0) return;
    setGlasses(num);
    await AsyncStorage.setItem(STORAGE_KEY, num.toString());
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Gün içinde kaç bardak su içtiniz?</Text>

      <TextInput
        style={styles.input}
        keyboardType="number-pad"
        placeholder="Örn: 8"
        value={input}
        onChangeText={setInput}
      />

      <Button title="Kaydet" onPress={handleSave} />

      <View style={styles.iconsContainer}>
        {Array.from({ length: glasses }).map((_, i) => (
          <Text key={i} style={styles.icon}>
            💧
          </Text>
        ))}
      </View>
    </ScrollView>
  );
};

export default WaterReminderScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 20,
  },
  iconsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 30,
  },
  icon: {
    fontSize: 32,
    margin: 6,
  },
});
 