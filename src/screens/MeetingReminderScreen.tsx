// src/screens/MeetingReminderScreen.tsx

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MeetingReminderScreen: React.FC = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Toplantı Hatırlatıcı</Text>
    <Text>Burada toplantı detayları yer alacak.</Text>
  </View>
);

export default MeetingReminderScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
});
