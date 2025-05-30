import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface OnboardingScreenProps {
  onComplete: () => void;
}

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onComplete }) => {
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');
  const [city, setCity] = useState('');
  const [job, setJob] = useState('');
  const [gender, setGender] = useState('');
  const [schoolLevel, setSchoolLevel] = useState('');

  const handleSubmit = () => {
    const userData = {
      fullName,
      age,
      city,
      job,
      gender,
      schoolLevel,
    };
    console.log('Kullanıcı Bilgileri:', userData);

    onComplete();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>
        Hoş geldiniz! Lütfen bilgilerinizi girin.
      </Text>

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
      <TextInput
        style={styles.input}
        placeholder="Yaşadığınız şehir"
        value={city}
        onChangeText={setCity}
      />

      <Text>Meslek</Text>
      <TextInput
        style={styles.input}
        placeholder="Mesleğiniz"
        value={job}
        onChangeText={setJob}
      />

      <Text>Cinsiyet</Text>
      <TextInput
        style={styles.input}
        placeholder="Cinsiyetiniz"
        value={gender}
        onChangeText={setGender}
      />

      <Text>Okul Derecesi</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={schoolLevel}
          onValueChange={(itemValue) => setSchoolLevel(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Seçiniz" value="" />
          <Picker.Item label="İlkokul" value="ilkokul" />
          <Picker.Item label="Ortaokul" value="ortaokul" />
          <Picker.Item label="Lise" value="lise" />
          <Picker.Item label="Üniversite" value="universite" />
        </Picker>
      </View>

      <Button title="Kaydet ve Devam Et" onPress={handleSubmit} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginBottom: 15,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    marginBottom: 15,
  },
  picker: {
    height: 50,
    width: '100%',
  },
});

export default OnboardingScreen;
