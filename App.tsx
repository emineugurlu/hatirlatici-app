// App.tsx

import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import OnboardingScreen from './src/screens/OnboardingScreen';
import ReminderSelectionScreen from './src/screens/ReminderSelectionScreen';
import WaterReminderScreen from './src/screens/WaterReminderScreen';
import MealReminderScreen from './src/screens/MealReminderScreen';
import MeetingReminderScreen from './src/screens/MeetingReminderScreen';
import OtherReminderScreen from './src/screens/OtherReminderScreen';
import DetoxListScreen from './src/screens/DetoxListScreen';

// Kullanıcı bilgileri tipi
export interface UserData {
  fullName: string;
  age: number;
  gender: 'Erkek' | 'Kadın' | 'Diğer';
  job: string;
  city: string;
}

// Navigation için parametre listesi
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
              component={ReminderSelectionScreen}
              initialParams={{ userData }}
              options={{ title: 'Hatırlatıcı Seçimi' }}
            />

            <Stack.Screen
              name="WaterReminder"
              component={WaterReminderScreen}
              initialParams={{ userData }}
              options={{ title: 'Su Hatırlatıcı' }}
            />

            <Stack.Screen
              name="MealReminder"
              component={MealReminderScreen}
              initialParams={{ userData }}
              options={{ title: 'Yemek Hatırlatıcı' }}
            />

            <Stack.Screen
              name="MeetingReminder"
              component={MeetingReminderScreen}
              initialParams={{ userData }}
              options={{ title: 'Hatırlatıcı' }} // Başlık güncellendi
            />

            <Stack.Screen
              name="OtherReminder"
              component={OtherReminderScreen}
              initialParams={{ userData }}
              options={{ title: 'Diğer Hatırlatıcı' }}
            />

            <Stack.Screen
              name="DetoxList"
              component={DetoxListScreen}
              options={{ title: 'Detoks Tarifleri' }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
