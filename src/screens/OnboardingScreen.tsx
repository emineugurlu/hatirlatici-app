// src/screens/OnboardingScreen.tsx

import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
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
    // Boşluk veya tamamen boş girilmiş alanları kontrol et
    if (!fullName.trim()) {
      Alert.alert('Eksik Bilgi', 'Lütfen Ad Soyad kısmını doldurun.');
      return;
    }
    if (!age.trim()) {
      Alert.alert('Eksik Bilgi', 'Lütfen Yaş kısmını doldurun.');
      return;
    }
    if (!gender.trim()) {
      Alert.alert('Eksik Bilgi', 'Lütfen Cinsiyet seçin.');
      return;
    }
    if (!job.trim()) {
      Alert.alert('Eksik Bilgi', 'Lütfen Meslek kısmını doldurun.');
      return;
    }
    if (!city.trim()) {
      Alert.alert('Eksik Bilgi', 'Lütfen Şehir seçin.');
      return;
    }

    // Eğer buraya geldiysek, tüm alanlar dolu
    const userData = {
      fullName: fullName.trim(),
      age: age.trim(),
      gender,
      job: job.trim(),
      city,
    };
    console.log('Kullanıcı Bilgileri:', userData);

    // Onboarding tamamlandı bilgisi
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

          {/* Ad Soyad */}
          <Text style={styles.label}>Ad Soyad</Text>
          <TextInput
            style={styles.input}
            placeholder="Ad Soyad"
            value={fullName}
            onChangeText={setFullName}
            autoCapitalize="words"
          />

          {/* Yaş */}
          <Text style={styles.label}>Yaş</Text>
          <TextInput
            style={styles.input}
            placeholder="Yaş"
            value={age}
            onChangeText={setAge}
            keyboardType="numeric"
          />

          {/* Cinsiyet */}
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

          {/* Meslek */}
          <Text style={styles.label}>Meslek</Text>
          <TextInput
            style={styles.input}
            placeholder="Mesleğinizi yazın"
            value={job}
            onChangeText={setJob}
          />

          {/* Şehir */}
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
        <Button
          title="Kaydet ve Devam Et"
          onPress={handleSubmit}
          color="#4A90E2"
        />
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
    paddingBottom: 0,
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
    justifyContent: 'flex-end',
  },
});
