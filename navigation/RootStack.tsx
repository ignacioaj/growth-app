import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from '../components/TabNavigator';
import LimitScreen from '../screens/LimitScreen';
import SelfcareScreen from '../screens/SelfcareScreen';
import ComfortScreen from '../screens/ComfortScreen';

export type RootStackParamList = {
  Tabs: undefined;
  LimitScreen: undefined;
  SelfcareScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tabs" component={TabNavigator} />
      <Stack.Screen name="LimitScreen" component={LimitScreen} />
      <Stack.Screen name="SelfcareScreen" component={SelfcareScreen} />
      <Stack.Screen name="ComfortScreen" component={ComfortScreen} />
    </Stack.Navigator>
  );
}
