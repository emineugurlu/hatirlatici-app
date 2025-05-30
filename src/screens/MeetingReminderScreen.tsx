import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MeetingReminderScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Toplantı Hatırlatıcı</Text>
      <Text>Burada toplantı detayları yer alacak.</Text>
    </View>
  );
};

export default MeetingReminderScreen;

const styles = StyleSheet.create({
  container: { flex:1, padding: 20, backgroundColor: '#fff' },
  title: { fontWeight: 'bold', fontSize: 20, marginBottom: 10 },
});
