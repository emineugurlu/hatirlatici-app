// src/screens/ReminderSelectionScreen.tsx

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../App';
import { colors, spacing, fontSizes } from '../theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';

type ReminderSelectionNavProp = NativeStackNavigationProp<
  RootStackParamList,
  'ReminderSelection'
>;

const SCREEN_WIDTH = Dimensions.get('window').width;
const BUTTON_WIDTH = SCREEN_WIDTH - spacing.large * 2;
const BUTTON_HEIGHT = 55;

const ReminderSelectionScreen: React.FC = () => {
  const navigation = useNavigation<ReminderSelectionNavProp>();

  const handleSelection = (screen: keyof RootStackParamList) => {
    navigation.navigate(screen);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Gradient’li Transparan Arka Plan */}
      <LinearGradient
        colors={[colors.secondary, colors.primary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientBackground}
      />

      {/* Animasyonlu Başlık */}
      <Animatable.Text
        animation="fadeInDown"
        duration={800}
        style={styles.title}
      >
        Hatırlatıcı Seçimi
      </Animatable.Text>
      <Animatable.Text
        animation="fadeInUp"
        duration={1000}
        style={styles.subtitle}
      >
        Bugün neyi hatırlamak istersiniz?
      </Animatable.Text>

      {/* Buton grubu */}
      <View style={styles.buttonsContainer}>
        {/* Su İçme Butonu: Arada pulse efekti */}
        <Animatable.View animation="pulse" iterationCount="infinite" iterationDelay={3000}>
          <TouchableOpacity
            style={[styles.button, styles.shadow]}
            onPress={() => handleSelection('WaterReminder')}
            activeOpacity={0.8}
          >
            <Icon name="cup-water" size={24} color={colors.background} />
            <Text style={styles.buttonText}>Su İçmeyi</Text>
          </TouchableOpacity>
        </Animatable.View>

        <TouchableOpacity
          style={[styles.button, styles.shadow]}
          onPress={() => handleSelection('MealReminder')}
          activeOpacity={0.8}
        >
          <Icon name="silverware-fork-knife" size={24} color={colors.background} />
          <Text style={styles.buttonText}>Yemek Yemeyi</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.shadow]}
          onPress={() => handleSelection('MeetingReminder')}
          activeOpacity={0.8}
        >
          <Icon name="calendar-check" size={24} color={colors.background} />
          <Text style={styles.buttonText}>Toplantıyı</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.shadow]}
          onPress={() => handleSelection('OtherReminder')}
          activeOpacity={0.8}
        >
          <Icon name="plus-box" size={24} color={colors.background} />
          <Text style={styles.buttonText}>Diğer</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ReminderSelectionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  gradientBackground: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.2, // yarı transparan gradient
  },
  title: {
    fontSize: fontSizes.title,
    fontWeight: '700',
    color: colors.primary,
    marginTop: spacing.large * 1.5,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: fontSizes.subtitle,
    fontWeight: '400',
    color: colors.textSecondary,
    marginTop: spacing.small,
    marginBottom: spacing.large,
    textAlign: 'center',
  },
  buttonsContainer: {
    alignItems: 'center',
    paddingHorizontal: spacing.large,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.accent,
    width: BUTTON_WIDTH,
    height: BUTTON_HEIGHT,
    borderRadius: 12,
    justifyContent: 'center',
    marginVertical: spacing.small,
  },
  buttonText: {
    color: colors.background,
    fontSize: fontSizes.button,
    fontWeight: '500',
    marginLeft: spacing.small,
  },
  shadow: {
    // iOS için gölge
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Android için elevation
    elevation: 5,
  },
});
