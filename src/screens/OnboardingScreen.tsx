// src/screens/OnboardingScreen.tsx

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  SafeAreaView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import turkiyeIlleri from '../data/cities';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, UserData } from '../../App';

type OnboardingProps = NativeStackScreenProps<RootStackParamList, 'Onboarding'> & {
  onComplete: (data: UserData) => void;
};

const OnboardingScreen: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [job, setJob] = useState('');
  const [city, setCity] = useState('');

  const handleSubmit = () => {
    // Boş kontrolleri
    if (!fullName.trim()) {
      Alert.alert('Eksik Bilgi', 'Lütfen Ad Soyad kısmını doldurun.');
      return;
    }
    if (!age.trim() || isNaN(Number(age))) {
      Alert.alert('Geçersiz Bilgi', 'Lütfen geçerli bir yaş girin.');
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

    // Tüm veriler tamamsa, UserData objesini oluşturup yukarıya gönder
    const data: UserData = {
      fullName: fullName.trim(),
      age: Number(age),
      gender: gender as 'Erkek' | 'Kadın' | 'Diğer',
      job: job.trim(),
      city: city,
    };
    onComplete(data);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Gradient Header */}
      <LinearGradient
        colors={['#E91E63', '#9C27B0']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.headerGradient}
      >
        <Animatable.Text
          animation="fadeInDown"
          duration={800}
          style={styles.headerTitle}
        >
          Hoş Geldiniz!
        </Animatable.Text>
        <Animatable.Text
          animation="fadeInUp"
          duration={1000}
          style={styles.headerSubtitle}
        >
          Bilgilerinizi Paylaşın
        </Animatable.Text>
      </LinearGradient>

      {/* Form */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.select({ ios: 'padding', android: undefined })}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Animatable.View
            animation="slideInUp"
            duration={800}
            style={styles.formContainer}
          >
            {/* Ad Soyad */}
            <View style={styles.inputWrapper}>
              <Icon
                name="account"
                size={20}
                color="#E91E63"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.inputField}
                placeholder="Ad Soyad"
                placeholderTextColor="#888888"
                value={fullName}
                onChangeText={setFullName}
                autoCapitalize="words"
              />
            </View>

            {/* Yaş */}
            <View style={styles.inputWrapper}>
              <Icon
                name="calendar"
                size={20}
                color="#E91E63"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.inputField}
                placeholder="Yaş"
                placeholderTextColor="#888888"
                value={age}
                onChangeText={setAge}
                keyboardType="numeric"
              />
            </View>

            {/* Cinsiyet */}
            <View style={styles.inputWrapper}>
              <Icon
                name="gender-male-female"
                size={20}
                color="#E91E63"
                style={styles.inputIcon}
              />
              <View style={styles.pickerWrapper}>
                <Picker
                  selectedValue={gender}
                  onValueChange={(itemValue) => setGender(itemValue)}
                  style={styles.pickerField}
                  dropdownIconColor="#E91E63"
                >
                  <Picker.Item label="Cinsiyet seçiniz" value="" />
                  <Picker.Item label="Erkek" value="Erkek" />
                  <Picker.Item label="Kadın" value="Kadın" />
                  <Picker.Item label="Diğer" value="Diğer" />
                </Picker>
              </View>
            </View>

            {/* Meslek */}
            <View style={styles.inputWrapper}>
              <Icon
                name="briefcase"
                size={20}
                color="#E91E63"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.inputField}
                placeholder="Meslek"
                placeholderTextColor="#888888"
                value={job}
                onChangeText={setJob}
              />
            </View>

            {/* Şehir */}
            <View style={styles.inputWrapper}>
              <Icon
                name="home-city"
                size={20}
                color="#E91E63"
                style={styles.inputIcon}
              />
              <View style={styles.pickerWrapper}>
                <Picker
                  selectedValue={city}
                  onValueChange={(itemValue) => setCity(itemValue)}
                  style={styles.pickerField}
                  dropdownIconColor="#E91E63"
                >
                  <Picker.Item label="Şehir seçiniz" value="" />
                  {turkiyeIlleri.map((il) => (
                    <Picker.Item key={il} label={il} value={il} />
                  ))}
                </Picker>
              </View>
            </View>
          </Animatable.View>
        </ScrollView>

        {/* Kaydet Butonu */}
        <Animatable.View animation="fadeInUp" delay={500} style={styles.buttonContainer}>
          <Button
            title="Kaydet ve Devam Et"
            onPress={handleSubmit}
            color="#8BC34A"
          />
        </Animatable.View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerGradient: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 16,
    fontWeight: '400',
    color: '#FFFFFF',
    marginTop: 8,
  },
  scrollContent: {
    flexGrow: 1,
  },
  formContainer: {
    marginTop: 20,
    backgroundColor: '#FFF8E1',
    marginHorizontal: 16,
    borderRadius: 16,
    padding: 16,
    // iOS gölge
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Android elevation
    elevation: 4,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    // iOS gölge
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    // Android elevation
    elevation: 2,
  },
  inputIcon: {
    marginRight: 12,
  },
  inputField: {
    flex: 1,
    height: '100%',
    fontSize: 14,
    color: '#333333',
  },
  pickerWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  pickerField: {
    width: '100%',
  },
  buttonContainer: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#DDDDDD',
  },
});
