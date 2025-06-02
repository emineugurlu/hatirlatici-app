// src/screens/ReminderSelectionScreen.tsx

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { RootStackParamList, UserData } from '../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'ReminderSelection'> & {
  userData: UserData;
};

const ReminderSelectionScreen: React.FC<Props> = ({ navigation, userData }) => {
  const handleSelection = (screenName: keyof RootStackParamList) => {
    navigation.navigate(screenName, { userData });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Merhaba, {userData.fullName}!</Text>
      <Text style={styles.subtitle}>Bugün neyi hatırlatmak istersiniz?</Text>

      {/* Su İçmeyi */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleSelection('WaterReminder')}
      >
        <Icon name="cup-water" size={20} color="#FFF" style={{ marginRight: 8 }} />
        <Text style={styles.buttonText}>Su İçmeyi</Text>
      </TouchableOpacity>

      {/* Yemek Yemeyi */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleSelection('MealReminder')}
      >
        <Icon name="food-fork-drink" size={20} color="#FFF" style={{ marginRight: 8 }} />
        <Text style={styles.buttonText}>Yemek Yemeyi</Text>
      </TouchableOpacity>

      {/* Toplantıyı */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleSelection('MeetingReminder')}
      >
        <Icon name="calendar-check" size={20} color="#FFF" style={{ marginRight: 8 }} />
        <Text style={styles.buttonText}>Toplantıyı</Text>
      </TouchableOpacity>

      {/* Diğer */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleSelection('OtherReminder')}
      >
        <Icon name="plus-box" size={20} color="#FFF" style={{ marginRight: 8 }} />
        <Text style={styles.buttonText}>Diğer</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ReminderSelectionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333333',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    color: '#666666',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#8BC34A',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 12,
    width: '100%',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
});
