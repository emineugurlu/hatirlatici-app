// src/screens/ReminderSelectionScreen.tsx

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
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
    <View style={styles.container}>
      {/* 1) Gradient Background */}
      <LinearGradient
        colors={[colors.secondary, colors.primary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientBackground}
      />

      {/* 2) Başlık */}
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

      {/* 3) Butonlar */}
      <View style={styles.buttonsContainer}>
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
    </View>
  );
};

export default ReminderSelectionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  gradient
