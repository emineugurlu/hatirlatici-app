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

// ------------------------------
// 1) Kullanıcı verileri tipi
// ------------------------------
export interface UserData {
  fullName: string;
  age: number;
  gender: 'Erkek' | 'Kadın' | 'Diğer';
  job: string;
  city: string;
}

// ----------------------------------------------------------------
// 2) Navigation parametre listesi
//    - Onboarding: undefined (param beklemiyor)
//    - Diğer tüm ekranlar: { userData: UserData }
// ----------------------------------------------------------------
export type RootStackParamList = {
  Onboarding: undefined;
  ReminderSelection: { userData: UserData };
  WaterReminder:      { userData: UserData };
  MealReminder:       { userData: UserData };
  MeetingReminder:    { userData: UserData };
  OtherReminder:      { userData: UserData };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  // Onboarding tamamlanana kadar null. Tamamlandığında UserData objesi olacak:
  const [userData, setUserData] = useState<UserData | null>(null);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/** Eğer henüz userData null ise (onboarding yapılmadıysa) */}
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
            {/** Onboarding tamamlandı; artık diğer ekranlar görünsün */}
            <Stack.Screen
              name="ReminderSelection"
              options={{ title: 'Hatırlatıcı Seçimi' }}
              initialParams={{ userData }} // Route parametresi olarak userData veriyoruz
            >
              {props => <ReminderSelectionScreen {...props} />}
            </Stack.Screen>

            <Stack.Screen
              name="WaterReminder"
              options={{ title: 'Su Hatırlatıcı' }}
              initialParams={{ userData }}
            >
              {props => <WaterReminderScreen {...props} />}
            </Stack.Screen>

            <Stack.Screen
              name="MealReminder"
              options={{ title: 'Yemek Hatırlatıcı' }}
              initialParams={{ userData }}
            >
              {props => <MealReminderScreen {...props} />}
            </Stack.Screen>

            <Stack.Screen
              name="MeetingReminder"
              options={{ title: 'Toplantı Hatırlatıcı' }}
              initialParams={{ userData }}
            >
              {props => <MeetingReminderScreen {...props} />}
            </Stack.Screen>

            <Stack.Screen
              name="OtherReminder"
              options={{ title: 'Diğer Hatırlatıcı' }}
              initialParams={{ userData }}
            >
              {props => <OtherReminderScreen {...props} />}
            </Stack.Screen>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
