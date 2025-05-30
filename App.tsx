import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import OnboardingScreen from './src/screens/OnboardingScreen';
import ReminderSelectionScreen from './src/screens/ReminderSelectionScreen';

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
  const [isOnboarded, setIsOnboarded] = useState(false);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isOnboarded ? "ReminderSelection" : "Onboarding"}
        screenOptions={{ headerShown: false }}
      >
        {!isOnboarded ? (
          <Stack.Screen name="Onboarding">
            {(props) => <OnboardingScreen {...props} onComplete={() => setIsOnboarded(true)} />}
          </Stack.Screen>
        ) : (
          <>
            <Stack.Screen
              name="ReminderSelection"
              component={ReminderSelectionScreen}
              options={{ headerShown: true, title: 'Hatırlatıcı Seçimi' }}
            />
            {/* Diğer ekranlar */}
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
