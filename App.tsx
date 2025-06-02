// App.tsx

import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps
} from '@react-navigation/native-stack';

import OnboardingScreen from './src/screens/OnboardingScreen';
import ReminderSelectionScreen from './src/screens/ReminderSelectionScreen';
import WaterReminderScreen from './src/screens/WaterReminderScreen';
import MealReminderScreen from './src/screens/MealReminderScreen';
import MeetingReminderScreen from './src/screens/MeetingReminderScreen';
import OtherReminderScreen from './src/screens/OtherReminderScreen';

// 1) Kullanıcı verileri tipi
export interface UserData {
  fullName: string;
  age: number;
  gender: 'Erkek' | 'Kadın' | 'Diğer';
  job: string;
  city: string;
}

// 2) Navigation parametre listesi (hepsi undefined, çünkü ek “userData” prop’u kullanıyoruz)
export type RootStackParamList = {
  Onboarding: undefined;
  ReminderSelection: undefined;
  WaterReminder: undefined;
  MealReminder: undefined;
  MeetingReminder: undefined;
  OtherReminder: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  // Onboarding tamamlanana kadar null. Tamamlandığında UserData objesi.
  const [userData, setUserData] = useState<UserData | null>(null);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Eğer henüz onboarding yapılmadıysa */}
        {!userData ? (
          <Stack.Screen name="Onboarding" options={{ headerShown: false }}>
            {props => (
              <OnboardingScreen
                {...props}
                onComplete={(data) => setUserData(data)}
              />
            )}
          </Stack.Screen>
        ) : (
          // Onboarding tamamlandıysa diğer ekranlara geç
          <>
            <Stack.Screen
              name="ReminderSelection"
              options={{ title: 'Hatırlatıcı Seçimi' }}
            >
              {props => (
                <ReminderSelectionScreen
                  {...props}
                  userData={userData}
                />
              )}
            </Stack.Screen>

            <Stack.Screen
              name="WaterReminder"
              options={{ title: 'Su Hatırlatıcı' }}
            >
              {props => (
                <WaterReminderScreen
                  {...props}
                  userData={userData}
                />
              )}
            </Stack.Screen>

            <Stack.Screen
              name="MealReminder"
              options={{ title: 'Yemek Hatırlatıcı' }}
            >
              {props => (
                <MealReminderScreen
                  {...props}
                  userData={userData}
                />
              )}
            </Stack.Screen>

            <Stack.Screen
              name="MeetingReminder"
              options={{ title: 'Toplantı Hatırlatıcı' }}
            >
              {props => (
                <MeetingReminderScreen
                  {...props}
                  userData={userData}
                />
              )}
            </Stack.Screen>

            <Stack.Screen
              name="OtherReminder"
              options={{ title: 'Diğer Hatırlatıcı' }}
            >
              {props => (
                <OtherReminderScreen
                  {...props}
                  userData={userData}
                />
              )}
            </Stack.Screen>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
