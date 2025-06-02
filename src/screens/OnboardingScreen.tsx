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
import turkiyeIlleri from '../data/cities';
import { colors, spacing, fontSizes } from '../theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';

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
      {/* 1) Gradient Header */}
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

      {/* 2) Form Alanları */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.select({ ios: 'padding', android: undefined })}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Animatable.View animation="slideInUp" duration={800} style={styles.formContainer}>
            {/* Ad Soyad */}
            <View style={styles.inputGroup}>
              <Icon name="account" size={20} color={colors.primary} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Ad Soyad"
                placeholderTextColor={colors.textSecondary}
                value={fullName}
                onChangeText={setFullName}
                autoCapitalize="words"
              />
            </View>

            {/* Yaş */}
            <View style={styles.inputGroup}>
              <Icon name="calendar" size={20} color={colors.primary} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Yaş"
                placeholderTextColor={colors.textSecondary}
                value={age}
                onChangeText={setAge}
                keyboardType="numeric"
              />
            </View>

            {/* Cinsiyet */}
            <View style={styles.pickerLabelContainer}>
              <Icon name="gender-male-female" size={20} color={colors.primary} style={styles.inputIcon} />
              <Text style={styles.label}>Cinsiyet</Text>
            </View>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={gender}
                onValueChange={(itemValue) => setGender(itemValue)}
                style={styles.picker}
                dropdownIconColor={colors.primary}
              >
                <Picker.Item label="Cinsiyet seçiniz" value="" />
                <Picker.Item label="Erkek" value="Erkek" />
                <Picker.Item label="Kadın" value="Kadın" />
                <Picker.Item label="Diğer" value="Diğer" />
              </Picker>
            </View>

            {/* Meslek */}
            <View style={styles.inputGroup}>
              <Icon name="briefcase" size={20} color={colors.primary} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Meslek"
                placeholderTextColor={colors.textSecondary}
                value={job}
                onChangeText={setJob}
              />
            </View>

            {/* Şehir */}
            <View style={styles.pickerLabelContainer}>
              <Icon name="home-city" size={20} color={colors.primary} style={styles.inputIcon} />
              <Text style={styles.label}>Şehir</Text>
            </View>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={city}
                onValueChange={(itemValue) => setCity(itemValue)}
                style={styles.picker}
                dropdownIconColor={colors.primary}
              >
                <Picker.Item label="Şehir seçiniz" value="" />
                {turkiyeIlleri.map((il) => (
                  <Picker.Item key={il} label={il} value={il} />
                ))}
              </Picker>
            </View>
          </Animatable.View>
        </ScrollView>

        {/* 3) Buton */}
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
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  headerGradient: {
    height: 200,
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
  scrollContent: {
    flexGrow: 1,
  },
  formContainer: {
    marginTop: -50,
    backgroundColor: colors.formBackground,
    marginHorizontal: spacing.medium,
    borderRadius: 16,
    padding: spacing.medium,
    // Gölge (iOS)
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Elevation (Android)
    elevation: 4,
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.medium,
  },
  inputIcon: {
    marginRight: spacing.small,
  },
  input: {
    flex: 1,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: fontSizes.regular,
    color: colors.textPrimary,
  },
  pickerLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.small,
    marginBottom: spacing.xsmall,
  },
  label: {
    fontSize: fontSizes.label,
    color: colors.textSecondary,
    marginLeft: spacing.small,
  },
  pickerWrapper: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    marginBottom: spacing.medium,
    // Gölge
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  picker: {
    height: 50,
    width: '100%',
    color: colors.textPrimary,
  },
  buttonContainer: {
    padding: spacing.medium,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
});
