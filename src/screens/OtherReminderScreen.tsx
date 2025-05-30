// src/screens/OtherReminderScreen.tsx

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const OtherReminderScreen: React.FC = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Diğer Hatırlatıcı</Text>
    <Text>Burada diğer hatırlatma seçenekleri yer alacak.</Text>
  </View>
);

export default OtherReminderScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
});
