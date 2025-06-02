// src/screens/ReminderSelectionScreen.tsx

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { RootStackParamList, UserData } from '../../App';

// 1) Bu ekrana gelen props tipi:
type Props = NativeStackScreenProps<RootStackParamList, 'ReminderSelection'>;

// 2) Sadece “param bekleyen ekran adları”nı içeren bir tip oluşturduk.
//    Böylece “Onboarding” burada **kullanılamayacak**, çünkü Onboarding: undefined
type ParamScreens =
  | 'ReminderSelection'
  | 'WaterReminder'
  | 'MealReminder'
  | 'MeetingReminder'
  | 'OtherReminder';

const ReminderSelectionScreen: React.FC<Props> = ({ navigation, route }) => {
  // 3) Kesin: route.params.userData mevcuttur.
  const userData: UserData = route.params.userData;

  // 4) Param bekleyen ekran adlarını tuşa basınca kullanıyoruz:
  const handleSelection = (screenName: ParamScreens) => {
    // navigation.navigate<ParamScreens> ile TS’e “param bekleyen ekranlardan birini seçeceğim”
    navigation.navigate<ParamScreens>(screenName, { userData });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Merhaba, {userData.fullName}!</Text>
      <Text style={styles.subtitle}>Bugün neyi hatırlatmak istersiniz?</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => handleSelection('WaterReminder')}
      >
        <Icon name="cup-water" size={20} color="#FFF" style={{ marginRight: 8 }} />
        <Text style={styles.buttonText}>Su İçmeyi</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => handleSelection('MealReminder')}
      >
        <Icon
          name="food-fork-drink"
          size={20}
          color="#FFF"
          style={{ marginRight: 8 }}
        />
        <Text style={styles.buttonText}>Yemek Yemeyi</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => handleSelection('MeetingReminder')}
      >
        <Icon
          name="calendar-check"
          size={20}
          color="#FFF"
          style={{ marginRight: 8 }}
        />
        <Text style={styles.buttonText}>Toplantıyı</Text>
      </TouchableOpacity>

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
    backgroundColor: '#F5F5F5',
    padding: 16
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333333'
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    color: '#666666'
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
    justifyContent: 'center'
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500'
  }
});
