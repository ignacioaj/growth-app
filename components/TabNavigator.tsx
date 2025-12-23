import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import RecordScreen from '../screens/RecordScreen';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: -12, // 🔹 baja toda la barra un poco más
          left: 0,
          right: 0,
          height: 80,
          backgroundColor: 'transparent',
          borderTopWidth: 0,
          elevation: 0,
          paddingBottom: 12, // 🔹 espacio inferior para iconos
        },
        tabBarActiveTintColor: '#641621',
        tabBarInactiveTintColor: '#64162188',
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 6, // 🔹 un poco más abajo
        },
        tabBarIconStyle: {
          marginTop: 20, // 🔹 iconos más bajos
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
        name="Registros"
        component={RecordScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="menu-book" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Progreso"
        component={RecordScreen} // de momento apunta a RecordScreen
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="bar-chart" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
