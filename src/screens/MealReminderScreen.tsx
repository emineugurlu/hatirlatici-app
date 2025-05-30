// src/screens/MealReminderScreen.tsx

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MealReminderScreen: React.FC = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Yemek Hatırlatıcı</Text>
    <Text>Burada yediğiniz öğünleri girebileceksiniz.</Text>
  </View>
);

export default MealReminderScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
});
