import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import GrowthBox from './GrowthBox';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/RootStack'; // tu stack

const colors = {
  softRed: '#B00020',
  calmGreen: '#6BD17F',
  trustBlue: '#6B8EF2',
  darkPink: '#8B1E3F',
};

export default function GrowthRow() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mi crecimiento personal</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.row}
      >
        <GrowthBox
          icon="hand-back-left"
          color={colors.softRed}
          label="Proteger mis límites"
          onPress={() => navigation.replace('LimitScreen')} // pantalla por defecto
        />

        <GrowthBox
          icon="heart"
          color={colors.calmGreen}
          label="Cuidarme a mí mismo"
          onPress={() => navigation.replace('SelfcareScreen')}
        />

        <GrowthBox
          icon="foot-print"
          color={colors.trustBlue}
          label="Salir de mi zona de comfort"
          onPress={() => navigation.replace('ComfortScreen')}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.darkPink,
    marginBottom: 12,
  },
  row: {
    paddingRight: 8,
    gap: 16,
  },
});
