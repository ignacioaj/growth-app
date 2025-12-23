// TabNavigator.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import HomeScreen from '../screens/HomeScreen';
import RecordScreen from '../screens/RecordScreen';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#444',
        tabBarInactiveTintColor: '#AAA',
        tabBarStyle: {
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: 50,
          paddingBottom: insets.bottom,
          backgroundColor: 'transparent',
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarItemStyle: { paddingVertical: 4 },
        tabBarIcon: ({ focused, color }) => {
          let iconName: keyof typeof Feather.glyphMap =
            route.name === 'Home' ? 'home' :
            route.name === 'Record' ? 'file' : 'circle';
          return (
            <Feather
              name={iconName}
              size={20}
              color={color}
              style={{ opacity: focused ? 1 : 0.6 }}
            />
          );
        },
        cardStyle: { backgroundColor: 'transparent' },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Record" component={RecordScreen} />
    </Tab.Navigator>
  );
}
