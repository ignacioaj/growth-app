import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Svg, { Rect, Defs, LinearGradient, Stop, Circle } from 'react-native-svg';

interface TugOfWarProps {
  mode: 'type1' | 'type2' | 'type3';
  metric: number;
}

const colors = {
  textSecondary: '#6B7280',
  textSecondaryLight: '#D1D5DB',
  trackBg: '#E5E7EB',
  pinkDark: '#D63384',
  orangeSoft: '#E2C48F',
  orangeMuted: '#C9A764',
};

const TugOfWar: React.FC<TugOfWarProps> = ({ mode, metric }) => {
  const width = 220;
  const height = 3;
  const ballRadius = 5;

  const clampedMetric = Math.min(Math.max(metric, 0), 1);
  const ballX = clampedMetric * width;

  let leftLabel = '';
  let rightLabel = '';
  let emoji = '';

  switch (mode) {
    case 'type1':
      leftLabel = 'Complaciente';
      rightLabel = 'Asertivo';
      emoji = '💖';
      break;
    case 'type2':
      leftLabel = 'Acomodado';
      rightLabel = 'Activo';
      emoji = '🦥';
      break;
    case 'type3':
      leftLabel = 'Estancado';
      rightLabel = 'En crecimiento';
      emoji = '🌱';
      break;
  }

  const gradientColors: [string, string] =
    clampedMetric <= 0.5
      ? [colors.orangeMuted, colors.orangeSoft]
      : [colors.pinkDark, colors.pinkDark];

  const leftColor =
    clampedMetric <= 0.5 ? colors.pinkDark : colors.textSecondaryLight;
  const rightColor =
    clampedMetric > 0.5 ? colors.pinkDark : colors.textSecondaryLight;

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.emoji}>{emoji}</Text>
        <View>
          <Svg width={width} height={ballRadius * 2 + height}>
            <Defs>
              <LinearGradient id="gradient" x1="0" y1="0" x2="1" y2="0">
                <Stop offset="0%" stopColor={gradientColors[0]} />
                <Stop offset="100%" stopColor={gradientColors[1]} />
              </LinearGradient>
            </Defs>
            <Rect x={0} y={ballRadius} width={width} height={height} rx={height / 2} fill={colors.trackBg} />
            <Rect x={0} y={ballRadius} width={ballX} height={height} rx={height / 2} fill="url(#gradient)" />
            <Circle cx={ballX} cy={ballRadius + height / 2} r={ballRadius} fill="#FFF" stroke="rgba(0,0,0,0.08)" strokeWidth={1} />
          </Svg>
          <View style={[styles.labels, { width }]}>
            <Text style={[styles.label, { color: leftColor }]}>{leftLabel}</Text>
            <Text style={[styles.label, { color: rightColor }]}>{rightLabel}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 18,
    marginRight: 10,
    marginTop: -6,
  },
  labels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 2,
  },
  label: {
    fontSize: 11,
    fontWeight: '500',
  },
});

export default TugOfWar;
