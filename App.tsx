import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { View, StyleSheet, ImageBackground } from 'react-native';
import RootStack from './navigation/RootStack'; // <- usamos el stack raíz

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

const SafeAreaWrapper: React.FC = ({ children }) => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={[
        styles.overlay,
        {
          paddingTop: insets.top + 24,
          paddingBottom: insets.bottom,
        },
      ]}
    >
      {children}
    </View>
  );
};

export default function App() {
  return (
    <SafeAreaProvider>
      <ImageBackground
        source={require('./assets/background.jpg')}
        style={styles.background}
        resizeMode="cover"
      >
        <SafeAreaWrapper>
          <NavigationContainer theme={AppTheme}>
            <StatusBar style="dark" />
            <RootStack /> {/* Ahora toda la app está dentro del stack */}
          </NavigationContainer>
        </SafeAreaWrapper>
      </ImageBackground>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  overlay: {
    flex: 1,
    backgroundColor: 'transparent',
    paddingHorizontal: 16,
  },
});
