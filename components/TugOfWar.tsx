import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Svg, { Rect, Defs, LinearGradient, Stop, Circle } from 'react-native-svg';

interface TugOfWarProps {
  mode: 'type1' | 'type2' | 'type3';
  metric: number;
}

const colors = {
  textSecondary: '#6B7280',
  textTertiary: '#9CA3AF',
  trackBg: '#E5E7EB',

  greenSoft: '#7FB7A1',
  greenMuted: '#5F9E85',

  blueSoft: '#7A97E8',
  blueMuted: '#5E7BD6',

  amberSoft: '#E2C48F',
  amberMuted: '#C9A764',
};

const TugOfWar: React.FC<TugOfWarProps> = ({ mode, metric }) => {
  const width = 260;
  const height = 4;
  const ballRadius = 6;

  const clampedMetric = Math.min(Math.max(metric, 0), 1);
  const ballX = clampedMetric * width;

  let leftLabel = '';
  let rightLabel = '';
  let gradientColors: [string, string] = [colors.greenMuted, colors.greenSoft];

  switch (mode) {
    case 'type1':
      leftLabel = 'Complaciente';
      rightLabel = 'Asertivo';
      gradientColors = [colors.greenMuted, colors.greenSoft];
      break;
    case 'type2':
      leftLabel = 'Acomodado';
      rightLabel = 'Activo';
      gradientColors = [colors.blueMuted, colors.blueSoft];
      break;
    case 'type3':
      leftLabel = 'Estancado';
      rightLabel = 'En crecimiento';
      gradientColors = [colors.amberMuted, colors.amberSoft];
      break;
  }

  return (
    <View style={styles.container}>
      <Svg width={width} height={ballRadius * 2 + height}>
        <Defs>
          <LinearGradient id="gradient" x1="0" y1="0" x2="1" y2="0">
            <Stop offset="0%" stopColor={gradientColors[0]} />
            <Stop offset="100%" stopColor={gradientColors[1]} />
          </LinearGradient>
        </Defs>

        {/* Track */}
        <Rect
          x={0}
          y={ballRadius}
          width={width}
          height={height}
          rx={height / 2}
          fill={colors.trackBg}
        />

        {/* Progress */}
        <Rect
          x={0}
          y={ballRadius}
          width={ballX}
          height={height}
          rx={height / 2}
          fill="url(#gradient)"
        />

        {/* Indicator */}
        <Circle
          cx={ballX}
          cy={ballRadius + height / 2}
          r={ballRadius}
          fill="#FFFFFF"
          stroke="rgba(0,0,0,0.08)"
          strokeWidth={1}
        />
      </Svg>

      {/* Labels */}
      <View style={[styles.labels, { width }]}>
        <Text style={styles.labelLeft}>{leftLabel}</Text>
        <Text style={styles.labelRight}>{rightLabel}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 4, // reducido de 8 a 4
  },
  labels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4, // reducido de 8 a 4
  },
  labelLeft: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.textTertiary,
  },
  labelRight: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.textSecondary,
  },
});

export default TugOfWar;
