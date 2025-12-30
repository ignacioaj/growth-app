// components/GrowthBox.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type GrowthBoxProps = {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  color: string;
  label: string;
};

export default function GrowthBox({ icon, color, label }: GrowthBoxProps) {
  return (
    <View style={styles.wrapper}>
      <View style={[styles.box, { backgroundColor: color }]}>
        <View style={styles.overlay} />
        <MaterialCommunityIcons
          name={icon}
          size={36}
          color="rgba(255,255,255,0.96)"
        />
      </View>

      <Text style={styles.label} numberOfLines={2}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: 110,
    alignItems: 'flex-start',
  },
  box: {
    width: 110,
    height: 110,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.14,
    shadowRadius: 28,
    elevation: 8,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 10,
  },
  label: {
    marginTop: 4,
    fontSize: 13,
    fontWeight: '500',
    letterSpacing: 0,
    textAlign: 'left',
    lineHeight: 16,
    color: '#8B1E3F',
  },
});
