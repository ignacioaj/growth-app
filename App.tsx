import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { View, StyleSheet, ImageBackground } from 'react-native';
import TabNavigator from './components/TabNavigator';

const AppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent',
    card: '#FFFFFF',
    text: '#1F2933',
    border: 'transparent',
    notification: '#5E7BD6',
  },
};

export default function App() {
  return (
    <SafeAreaProvider>
      <ImageBackground
        source={require('./assets/background.jpg')}
        style={styles.background}
        resizeMode="cover"
      >
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.overlay}>
            <NavigationContainer theme={AppTheme}>
              <StatusBar style="dark" />
              <TabNavigator />
            </NavigationContainer>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  safeArea: { flex: 1 },
  overlay: {
    flex: 1,
    backgroundColor: 'transparent',
    paddingHorizontal: 16,
    paddingTop: 24,
    // paddingBottom: 16, <-- eliminamos este padding para que los labels se vean
  },
});
