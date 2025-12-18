import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { View, StyleSheet } from 'react-native';
import TabNavigator from './components/TabNavigator';

const AppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#F8F9FB', // fondo premium suave
    card: '#FFFFFF',        // tarjetas y barras blancas
    text: '#1F2933',        // texto principal oscuro y elegante
    border: 'transparent',  // sin bordes duros
    notification: '#5E7BD6', // acento premium
  },
};

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        <NavigationContainer theme={AppTheme}>
          <StatusBar style="dark" />
          <View style={styles.wrapper}>
            <TabNavigator />
          </View>
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F9FB', // coincide con theme
  },
  wrapper: {
    flex: 1,
    backgroundColor: '#F8F9FB',
    paddingHorizontal: 16,       // margen lateral premium
  },
});
