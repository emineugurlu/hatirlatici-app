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
  Alert,
  SafeAreaView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import turkiyeIlleri from '../data/cities'; // 81 ilin dizisidir, cities.ts (ekli olacak)
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';

// Eğer proje dizininizde bir theme dosyanız varsa, kendi renklerinizi oradan da çekebilirsiniz.
// Bu örnekte sabit hex renkler kullandım:
const colors = {
  primary: '#E91E63',       // Pembe (ikon, dropdown oku, vs)
  secondary: '#9C27B0',     // Mor (gradient’in diğer rengi)
  background: '#FFFFFF',    // Beyaz (genel arkaplan)
  formBackground: '#FFF8E1',// Krem (form kartı arkaplanı)
  border: '#DDDDDD',        // Açık gri (çerçeve çizgisi)
  textPrimary: '#333333',   // Koyu metin rengi
  textSecondary: '#888888', // Yer tutucu metin rengi
  accent: '#8BC34A',        // Kaydet butonu rengi (yeşil ton)
};

const spacing = {
  small: 12,
  medium: 16,
};

const fontSizes = {
  title: 24,
  subtitle: 16,
  regular: 14,
};

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
    onComplete();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* -------------------- */}
      {/* 1) Üstte Gradient Header */}
      {/* -------------------- */}
      <LinearGradient
        colors={[colors.primary, colors.secondary]}
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

      {/* ------------------- */}
      {/* 2) Form Alanları */}
      {/* ------------------- */}
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
            {/* --- Ad Soyad (TextInput) --- */}
            <View style={styles.inputWrapper}>
              <Icon
                name="account"
                size={20}
                color={colors.primary}
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.inputField}
                placeholder="Ad Soyad"
                placeholderTextColor={colors.textSecondary}
                value={fullName}
                onChangeText={setFullName}
                autoCapitalize="words"
              />
            </View>

            {/* --- Yaş (TextInput) --- */}
            <View style={styles.inputWrapper}>
              <Icon
                name="calendar"
                size={20}
                color={colors.primary}
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.inputField}
                placeholder="Yaş"
                placeholderTextColor={colors.textSecondary}
                value={age}
                onChangeText={setAge}
                keyboardType="numeric"
              />
            </View>

            {/* --- Cinsiyet (Picker) --- */}
            <View style={styles.inputWrapper}>
              <Icon
                name="gender-male-female"
                size={20}
                color={colors.primary}
                style={styles.inputIcon}
              />
              <View style={styles.pickerWrapper}>
                <Picker
                  selectedValue={gender}
                  onValueChange={(itemValue) => setGender(itemValue)}
                  style={styles.pickerField}
                  dropdownIconColor={colors.primary}
                >
                  <Picker.Item label="Cinsiyet seçiniz" value="" />
                  <Picker.Item label="Erkek" value="Erkek" />
                  <Picker.Item label="Kadın" value="Kadın" />
                  <Picker.Item label="Diğer" value="Diğer" />
                </Picker>
              </View>
            </View>

            {/* --- Meslek (TextInput) --- */}
            <View style={styles.inputWrapper}>
              <Icon
                name="briefcase"
                size={20}
                color={colors.primary}
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.inputField}
                placeholder="Meslek"
                placeholderTextColor={colors.textSecondary}
                value={job}
                onChangeText={setJob}
              />
            </View>

            {/* --- Şehir (Picker) --- */}
            <View style={styles.inputWrapper}>
              <Icon
                name="home-city"
                size={20}
                color={colors.primary}
                style={styles.inputIcon}
              />
              <View style={styles.pickerWrapper}>
                <Picker
                  selectedValue={city}
                  onValueChange={(itemValue) => setCity(itemValue)}
                  style={styles.pickerField}
                  dropdownIconColor={colors.primary}
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

        {/* ----------------------------------- */}
        {/* 3) Alt Kısım: “Kaydet ve Devam Et” */}
        {/* ----------------------------------- */}
        <Animatable.View animation="fadeInUp" delay={500} style={styles.buttonContainer}>
          <Button
            title="Kaydet ve Devam Et"
            onPress={handleSubmit}
            color={colors.accent}
          />
        </Animatable.View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  // 1) Genel Konteynır
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  // 2) Üstteki Gradient Header
  headerGradient: {
    height: 200, // 200px yükseklik
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTitle: {
    fontSize: fontSizes.title,
    fontWeight: '700',
    color: colors.background,
  },
  headerSubtitle: {
    fontSize: fontSizes.subtitle,
    fontWeight: '400',
    color: colors.background,
    marginTop: 8,
  },

  // 3) ScrollView içeriğini kapsayan stil
  scrollContent: {
    flexGrow: 1,
  },

  // 4) Form Kartı
  formContainer: {
    marginTop: 20,                 // Header’dan 20px aşağıda başlasın
    backgroundColor: colors.formBackground,
    marginHorizontal: spacing.medium,
    borderRadius: 16,
    padding: spacing.medium,
    // iOS gölge
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Android elevation
    elevation: 4,
  },

  // 5) Her satırın “wrapper”’ı (ikon + girdi alanı)
  inputWrapper: {
    flexDirection: 'row',       // İkon ve girdi yanyana
    alignItems: 'center',       // Dikeyde ortala
    height: 50,                 // Her satır tam 50px yüksekliğinde
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: spacing.small, // Sol-sağ 12px boşluk
    marginBottom: spacing.medium,     // Alt komşuya 16px boşluk
    // iOS gölge
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    // Android elevation
    elevation: 2,
  },

  // 6) İkona sadece sağa boşluk veriyoruz
  inputIcon: {
    marginRight: spacing.small, // Icon ile girdi alanı arasında 12px boşluk
  },

  // 7) TextInput veya Picker’ın kendisi (satırın geri kalan kısmını kaplasın)
  inputField: {
    flex: 1,
    height: '100%',             // inputWrapper’ın 50px’lik yüksekliğini aldır
    fontSize: fontSizes.regular,
    color: colors.textPrimary,
  },

  // 8) Picker’ı sarmalayan özel bir View (içindeki Picker’ı dikeyde eksiksiz ortalamak için)
  pickerWrapper: {
    flex: 1,
    justifyContent: 'center',   // Dikeyde ortala
  },

  // 9) Picker’ın kendisi: Genişlik 100%, yükseklik otomatik (sarmalayıcıdan alır)
  pickerField: {
    width: '100%',
  },

  // 10) Kaydet & Devam Et butonunun konumu
  buttonContainer: {
    padding: spacing.medium,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
});
