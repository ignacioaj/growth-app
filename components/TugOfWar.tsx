import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Svg, { Rect, Circle } from 'react-native-svg';

interface TugOfWarProps {
  mode: 'type1' | 'type2' | 'type3';
  metric: number;
  thresholds?: [number, number];
}

const colors = {
  textSecondary: '#6B7280',
  textSecondaryLight: '#D1D5DB',
  trackBg: '#E5E7EB',
  bad: '#B00020',
  warn: '#F2C849',
  good: '#4AA96C',
};

const TugOfWar: React.FC<TugOfWarProps> = ({ mode, metric, thresholds = [0.25, 0.5] }) => {
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

  let metricColor = colors.bad;
  if (clampedMetric > thresholds[1]) {
    metricColor = colors.good;
  } else if (clampedMetric > thresholds[0]) {
    metricColor = colors.warn;
  }

  const leftColor = clampedMetric <= thresholds[1] ? colors.textSecondary : colors.textSecondaryLight;
  const rightColor = clampedMetric > thresholds[1] ? colors.textSecondary : colors.textSecondaryLight;

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.emoji}>{emoji}</Text>
        <View>
          <Svg width={width} height={ballRadius * 2 + height}>
            <Rect x={0} y={ballRadius} width={width} height={height} rx={height / 2} fill={colors.trackBg} />
            <Rect x={0} y={ballRadius} width={ballX} height={height} rx={height / 2} fill={metricColor} />
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
