import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import turkiyeIlleri from '../data/cities';

interface OnboardingScreenProps {
  onComplete: () => void;
}

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onComplete }) => {
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');
  const [city, setCity] = useState('');

  const handleSubmit = () => {
    const userData = {
      fullName,
      age,
      city,
    };
    console.log('Kullanıcı Bilgileri:', userData);
    onComplete();  // Onboarding tamamlandı bildir
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hoş geldiniz! Lütfen bilgilerinizi girin.</Text>

      <Text>Ad Soyad</Text>
      <TextInput
        style={styles.input}
        placeholder="Ad Soyad"
        value={fullName}
        onChangeText={setFullName}
      />

      <Text>Yaş</Text>
      <TextInput
        style={styles.input}
        placeholder="Yaş"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
      />

      <Text>Şehir</Text>
      <Picker
        selectedValue={city}
        onValueChange={(itemValue) => setCity(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Şehir seçiniz" value="" />
        {turkiyeIlleri.map((il) => (
          <Picker.Item key={il} label={il} value={il} />
        ))}
      </Picker>

      <Button title="Kaydet ve Devam Et" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 15 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginVertical: 8,
    borderRadius: 6,
  },
  picker: { marginVertical: 8 },
});

export default OnboardingScreen;
