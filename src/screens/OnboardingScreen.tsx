// src/screens/OnboardingScreen.tsx

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import turkiyeIlleri from '../data/cities';

interface OnboardingScreenProps {
  onComplete: () => void;
}

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onComplete }) => {
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [job, setJob] = useState('');
  const [city, setCity] = useState('');

  const handleSubmit = () => {
    const userData = {
      fullName,
      age,
      gender,
      job,
      city,
    };
    console.log('Kullanıcı Bilgileri:', userData);
    onComplete();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.select({ ios: 'padding', android: undefined })}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Hoş geldiniz! Lütfen bilgilerinizi girin.</Text>

          <Text style={styles.label}>Ad Soyad</Text>
          <TextInput
            style={styles.input}
            placeholder="Ad Soyad"
            value={fullName}
            onChangeText={setFullName}
          />

          <Text style={styles.label}>Yaş</Text>
          <TextInput
            style={styles.input}
            placeholder="Yaş"
            value={age}
            onChangeText={setAge}
            keyboardType="numeric"
          />

          <Text style={styles.label}>Cinsiyet</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={gender}
              onValueChange={(itemValue) => setGender(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Cinsiyet seçiniz" value="" />
              <Picker.Item label="Erkek" value="Erkek" />
              <Picker.Item label="Kadın" value="Kadın" />
              <Picker.Item label="Diğer" value="Diğer" />
            </Picker>
          </View>

          <Text style={styles.label}>Meslek</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={job}
              onValueChange={(itemValue) => setJob(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Meslek seçiniz" value="" />
              <Picker.Item label="Öğrenci" value="Öğrenci" />
              <Picker.Item label="Çalışan" value="Çalışan" />
              <Picker.Item label="Emekli" value="Emekli" />
              <Picker.Item label="Diğer" value="Diğer" />
            </Picker>
          </View>

          <Text style={styles.label}>Şehir</Text>
          <View style={styles.pickerContainer}>
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
          </View>
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <Button title="Kaydet ve Devam Et" onPress={handleSubmit} color="#4A90E2" />
      </View>
    </KeyboardAvoidingView>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    flexGrow: 1,
  },
  formContainer: {
    padding: 20,
    paddingBottom: 0, // Buton kısmı ayrı olduğu için alt boşluk 0
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    marginTop: 12,
    marginBottom: 4,
    fontSize: 16,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 16,
    marginBottom: 12,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    marginBottom: 12,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    // Butonu sayfanın altına doğru itmek için:
    justifyContent: 'flex-end',
  },
});
