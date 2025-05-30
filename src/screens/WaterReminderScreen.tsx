import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const WaterReminderScreen = () => {
  const [glassCount, setGlassCount] = useState('');
  const [displayCount, setDisplayCount] = useState(0);

  const handleSave = () => {
    const count = parseInt(glassCount, 10);
    if (!isNaN(count)) {
      setDisplayCount(count);
    } else {
      setDisplayCount(0);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Gün içinde kaç bardak su içtiniz?</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={glassCount}
        onChangeText={setGlassCount}
        placeholder="0"
      />
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>KAYDET</Text>
      </TouchableOpacity>

      <View style={styles.iconContainer}>
        {Array.from({ length: displayCount }).map((_, i) => (
          <Text key={i} style={styles.icon}>🥤</Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, padding: 20, backgroundColor: '#fff'
  },
  input: {
    borderWidth: 1, borderColor: '#ccc', padding: 10, marginVertical: 10, borderRadius: 5
  },
  button: {
    backgroundColor: '#4A90E2', padding: 15, borderRadius: 10, alignItems: 'center'
  },
  buttonText: {
    color: 'white', fontWeight: 'bold'
  },
  iconContainer: {
    flexDirection: 'row', marginTop: 20, flexWrap: 'wrap'
  },
  icon: {
    fontSize: 30, marginRight: 10
  }
});

export default WaterReminderScreen;
