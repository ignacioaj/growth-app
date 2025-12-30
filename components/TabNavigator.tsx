import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import RecordScreen from '../screens/RecordScreen';
import LimitScreen from '../screens/LimitScreen';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: -12,
          left: 0,
          right: 0,
          height: 80,
          backgroundColor: 'transparent',
          borderTopWidth: 0,
          elevation: 0,
          paddingBottom: 12,
        },
        tabBarActiveTintColor: '#641621',
        tabBarInactiveTintColor: '#64162188',
        tabBarLabelStyle: {
          fontSize: 11,
          marginBottom: 6,
        },
        tabBarIconStyle: {
          marginTop: 20,
        },
      }}
    >
      <Tab.Screen
        name="Inicio"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home-filled" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Límites"
        component={LimitScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="pan-tool" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Objetivos"
        component={RecordScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="track-changes" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Diario"
        component={RecordScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="menu-book" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Progreso"
        component={RecordScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="bar-chart" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
