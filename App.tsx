// App.tsx

import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps
} from '@react-navigation/native-stack';
import ReminderSelectionScreen from './src/screens/ReminderSelectionScreen';

// 1) Stack parametre listesini tanımlıyoruz:
export type RootStackParamList = {
  ReminderSelection: undefined;
  // ileride ekleyeceğin diğer ekranlar buraya:
  // WaterReminder: undefined;
  // MealReminder: undefined;
  // MeetingReminder: { /* parametren varsa */ };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

// 2) App bileşeni:
const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ReminderSelection">
        <Stack.Screen
          name="ReminderSelection"
          component={ReminderSelectionScreen}
          options={{
            // headerShown: false,   // başlığı tamamen gizlemek istersen yorumdan çıkar
            title: 'Hatırlatıcı Seçimi'
          }}
        />
        {/*
          Diğer ekranlar buraya eklenebilir:
          <Stack.Screen name="WaterReminder" component={WaterReminderScreen} />
        */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
