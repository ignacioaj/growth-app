// components/GrowthRow.tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import GrowthBox from './GrowthBox';

const colors = {
  softRed: '#B00020',
  calmGreen: '#6BD17F',
  trustBlue: '#6B8EF2',
  darkPink: '#8B1E3F',
};

export default function GrowthRow() {
  return (
    <View style={styles.container}>
      {/* Título grande y en negrita */}
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
        />

        <GrowthBox
          icon="heart"
          color={colors.calmGreen}
          label="Cuidarme a mí mismo"
        />

        <GrowthBox
          icon="shoe-print" // alternativa visible a barefoot
          color={colors.trustBlue}
          label="Salir de mi zona de comfort"
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
    fontSize: 20,      // más grande para un título
    fontWeight: '700',  // bold
    color: colors.darkPink,
    marginBottom: 12,
  },
  row: {
    paddingRight: 8,
    gap: 16,
  },
});
