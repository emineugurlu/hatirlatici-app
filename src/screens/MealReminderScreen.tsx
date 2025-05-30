import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MealReminderScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Yemek Hatırlatıcı</Text>
      <Text>Burada yediğiniz öğünleri girebileceksiniz.</Text>
    </View>
  );
};

export default MealReminderScreen;

const styles = StyleSheet.create({
  container: { flex:1, padding: 20, backgroundColor: '#fff' },
  title: { fontWeight: 'bold', fontSize: 20, marginBottom: 10 },
});
