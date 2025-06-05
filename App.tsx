import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import OnboardingScreen from './src/screens/OnboardingScreen';
import ReminderSelectionScreen from './src/screens/ReminderSelectionScreen';
import WaterReminderScreen from './src/screens/WaterReminderScreen';
import MealReminderScreen from './src/screens/MealReminderScreen';
import MeetingReminderScreen from './src/screens/MeetingReminderScreen';
import OtherReminderScreen from './src/screens/OtherReminderScreen';
import DetoxListScreen from './src/screens/DetoxListScreen'; // ✅ Eklendi

// 1) Kullanıcı verileri tipi
export interface UserData {
  fullName: string;
  age: number;
  gender: 'Erkek' | 'Kadın' | 'Diğer';
  job: string;
  city: string;
}

// 2) Navigation parametre listesi
export type RootStackParamList = {
  Onboarding: undefined;
  ReminderSelection: { userData: UserData };
  WaterReminder: { userData: UserData };
  MealReminder: { userData: UserData };
  MeetingReminder: { userData: UserData };
  OtherReminder: { userData: UserData };
  DetoxList: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!userData ? (
          <Stack.Screen
            name="Onboarding"
            options={{ headerShown: false }}
          >
            {props => (
              <OnboardingScreen
                {...props}
                onComplete={(data) => setUserData(data)}
              />
            )}
          </Stack.Screen>
        ) : (
          <>
            <Stack.Screen
              name="ReminderSelection"
              options={{ title: 'Hatırlatıcı Seçimi' }}
              initialParams={{ userData }}
              component={ReminderSelectionScreen}
            />

            <Stack.Screen
              name="WaterReminder"
              options={{ title: 'Su Hatırlatıcı' }}
              initialParams={{ userData }}
              component={WaterReminderScreen}
            />

            <Stack.Screen
              name="MealReminder"
              options={{ title: 'Yemek Hatırlatıcı' }}
              initialParams={{ userData }}
              component={MealReminderScreen}
            />

            <Stack.Screen
              name="MeetingReminder"
              options={{ title: 'Toplantı Hatırlatıcı' }}
              initialParams={{ userData }}
              component={MeetingReminderScreen}
            />

            <Stack.Screen
              name="OtherReminder"
              options={{ title: 'Diğer Hatırlatıcı' }}
              initialParams={{ userData }}
              component={OtherReminderScreen}
            />

            <Stack.Screen
              name="DetoxList"
              options={{ title: 'Detoks Tarifleri' }}
              component={DetoxListScreen}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
