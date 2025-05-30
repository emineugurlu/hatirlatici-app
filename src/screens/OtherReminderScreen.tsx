import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const OtherReminderScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Diğer Hatırlatıcı</Text>
      <Text>Burada diğer hatırlatma seçenekleri yer alacak.</Text>
    </View>
  );
};

export default OtherReminderScreen;

const styles = StyleSheet.create({
  container: { flex:1, padding: 20, backgroundColor: '#fff' },
  title: { fontWeight: 'bold', fontSize: 20, marginBottom: 10 },
});
