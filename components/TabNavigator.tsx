import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import RecordScreen from '../screens/RecordScreen';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#444',   // gris oscuro
        tabBarInactiveTintColor: '#AAA', // gris suave
        tabBarStyle: {
          backgroundColor: 'rgba(255,255,255,0.95)',
          borderTopWidth: 0,
          elevation: 0,
          shadowColor: 'transparent', // elimina sombra en iOS
          height: 50,
        },
        tabBarItemStyle: {
          paddingVertical: 4,
        },
        tabBarIcon: ({ focused, color }) => {
          let iconName;
          if (route.name === 'Home') iconName = 'home';
          else if (route.name === 'Record') iconName = 'file';

          return (
            <Feather
              name={iconName}
              size={20}
              color={color}
              style={{ opacity: focused ? 1 : 0.6 }}
            />
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Record" component={RecordScreen} />
    </Tab.Navigator>
  );
}