// src/screens/OtherReminderScreen.tsx

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, UserData } from '../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'OtherReminder'>;

const OtherReminderScreen: React.FC<Props> = ({ route }) => {
  const userData: UserData = route.params.userData;
  const [customReminder, setCustomReminder] = useState('');

  // Mesleğe göre basit tavsiye metni oluştur
  const getAdviceForJob = (job: string): string => {
    switch (job) {
      case 'Öğrenci':
        return 'Unutmayın, düzenli olarak kısa molalar vermek verimliliği artırır.';
      case 'Bilgisayar Mühendisi':
        return 'Monitöre fazla bakmamak için her 45 dakikada gözlerinizi dinlendirin.';
      case 'Çalışan':
        return 'Masanızın başında doğru oturma pozisyonu alarak sırtınızı koruyun.';
      case 'Emekli':
        return 'Gün içinde hafif yürüyüşler ekleyerek enerjinizi yüksek tutun.';
      default:
        return 'Düzenli molalar ve kısa egzersizler gün boyunca motivasyonunuzu artırır.';
    }
  };

  const adviceText = getAdviceForJob(userData.job);

  const handleSave = () => {
    if (!customReminder.trim()) {
      Alert.alert('Eksik Bilgi', 'Lütfen hatırlatmak istediğiniz şeyi yazın.');
      return;
    }
    console.log('Kullanıcı Özel Hatırlatma:', customReminder);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Diğer Hatırlatma</Text>

      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Buraya hatırlatmak istediğiniz metni girin"
        placeholderTextColor="#888888"
        multiline
        value={customReminder}
        onChangeText={setCustomReminder}
      />
      <View style={{ height: 12 }} />
      <Button title="Kaydet" onPress={handleSave} color="#8BC34A" />

      <View style={styles.adviceContainer}>
        <Text style={styles.adviceTitle}>Meslek Bazlı Öneri:</Text>
        <Text style={styles.adviceText}>{adviceText}</Text>
      </View>
    </ScrollView>
  );
};

export default OtherReminderScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 14,
    color: '#333333',
    textAlignVertical: 'top',
  },
  adviceContainer: {
    marginTop: 24,
    padding: 12,
    backgroundColor: '#E8F5E9',
    borderRadius: 8,
  },
  adviceTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#388E3C',
  },
  adviceText: {
    fontSize: 14,
    color: '#333333',
  },
});
