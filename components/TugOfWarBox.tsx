import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TugOfWar from './TugOfWar';

const colors = {
  card: '#FFFFFF',
  textPrimary: '#1F2933',
  textSecondary: '#6B7280',
};

const TugOfWarBox = () => {
  const fecha = new Date();
  const mes = fecha.toLocaleString('es-ES', { month: 'long' });
  const año = fecha.getFullYear();
  const title = mes.charAt(0).toUpperCase() + mes.slice(1) + ' ' + año;

  return (
    <View style={styles.shadowWrapper}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.eyebrow}>Resumen del mes</Text>
          <Text style={styles.title}>{title}</Text>
        </View>

        <View style={styles.metrics}>
          <TugOfWar mode="type1" metric={0.25} />
          <TugOfWar mode="type2" metric={0.7} />
          <TugOfWar mode="type3" metric={0.5} />
        </View>
      </View>
    </View>
  );
};

export default TugOfWarBox;

const styles = StyleSheet.create({
  shadowWrapper: {
    borderRadius: 16,
    backgroundColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 3,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 16,
  },
  header: {
    marginBottom: 12,
  },
  eyebrow: {
    fontSize: 11,
    fontWeight: '500',
    color: colors.textSecondary,
    marginBottom: 2,
    letterSpacing: 0.4,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  metrics: {
    gap: 12,
  },
});
