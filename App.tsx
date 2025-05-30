// App.tsx

import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ReminderSelectionScreen from './src/screens/ReminderSelectionScreen';
import WaterReminderScreen from './src/screens/WaterReminderScreen';
import MealReminderScreen from './src/screens/MealReminderScreen';
import MeetingReminderScreen from './src/screens/MeetingReminderScreen';
import OtherReminderScreen from './src/screens/OtherReminderScreen';

// 1) Stack parametre listesini tanımlıyoruz:
export type RootStackParamList = {
  ReminderSelection: undefined;
  WaterReminder: undefined;
  MealReminder: undefined;
  MeetingReminder: undefined;
  OtherReminder: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

// 2) App bileşeni:
const App: React.FC = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="ReminderSelection">
      <Stack.Screen
        name="ReminderSelection"
        component={ReminderSelectionScreen}
        options={{ title: 'Hatırlatıcı Seçimi' }}
      />
      <Stack.Screen
        name="WaterReminder"
        component={WaterReminderScreen}
        options={{ title: 'Su Hatırlatıcı' }}
      />
      <Stack.Screen
        name="MealReminder"
        component={MealReminderScreen}
        options={{ title: 'Yemek Hatırlatıcı' }}
      />
      <Stack.Screen
        name="MeetingReminder"
        component={MeetingReminderScreen}
        options={{ title: 'Toplantı Hatırlatıcı' }}
      />
      <Stack.Screen
        name="OtherReminder"
        component={OtherReminderScreen}
        options={{ title: 'Diğer Hatırlatıcı' }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;
