import React, { useEffect, useState, useCallback } from 'react';
import { View, ScrollView, Text, StyleSheet, RefreshControl, Dimensions } from 'react-native';
import { supabase } from '../supabaseClient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Registro { id?: string; date: string; type: string; comment: string; }

const colors = {
  card: '#FFFFFF',
  textPrimary: '#1F2933',
  textSecondary: '#6B7280',
  calmGreen: '#6FAF8E',
  trustBlue: '#6B8EF2',
  softRed: '#C97A7A',
  darkPink: '#D6336C',
};

export default function RecordScreen() {
  const [registros, setRegistros] = useState<Registro[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const insets = useSafeAreaInsets();
  const TAB_HEIGHT = 80;
  const HEADER_HEIGHT = 60 + insets.top;
  const SCREEN_HEIGHT = Dimensions.get('window').height;

  const fetchRegistros = useCallback(async () => {
    const { data, error } = await supabase
      .from<Registro>('registros')
      .select('*')
      .order('date', { ascending: false });
    if (!error) setRegistros(data || []);
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchRegistros();
    setRefreshing(false);
  }, [fetchRegistros]);

  useEffect(() => { fetchRegistros(); }, [fetchRegistros]);

  const getColor = (type: string) => {
    switch (type) {
      case 'No incómodo': return colors.calmGreen;
      case 'Sí incómodo': return colors.trustBlue;
      case 'Sí complaciente': return colors.softRed;
      default: return colors.textPrimary;
    }
  };

  return (
    <View style={[styles.clipContainer, { height: SCREEN_HEIGHT - TAB_HEIGHT }]}>
      {/* Header fijo */}
      <View style={[styles.header, { height: 50 }]}>
        <Text style={[styles.headerTitle, { color: colors.darkPink }]}>Diario</Text>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 5 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.trustBlue}
            colors={[colors.trustBlue]}
          />
        }
      >
        {registros.length === 0 && <Text style={styles.noRecords}>No hay registros aún.</Text>}

        {registros.map((r) => {
          const fecha = new Date(r.date).toLocaleDateString();
          return (
            <View key={r.id || r.date} style={styles.shadowWrapper}>
              <View style={styles.recordItem}>
                <View style={styles.recordHeader}>
                  <Text style={[styles.recordType, { color: getColor(r.type) }]}>{r.type}</Text>
                  <Text style={styles.recordDate}>{fecha}</Text>
                </View>
                {r.comment ? <Text style={styles.comment}>{r.comment}</Text> : null}
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  clipContainer: {
    flex: 1,
    overflow: 'hidden', // importante: recorta contenido que suba debajo del header
    marginBottom: 60,    // mantiene el espacio inferior
  },
  header: {
    paddingLeft: 16,
  },
  headerTitle: { fontSize: 24, fontWeight: '700', letterSpacing: 0.2 },
  noRecords: { color: colors.textSecondary, textAlign: 'center', fontSize: 14 },
  shadowWrapper: {
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  recordItem: { backgroundColor: colors.card, borderRadius: 12, paddingVertical: 12, paddingHorizontal: 16 },
  recordHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  recordType: { fontWeight: '600', fontSize: 14 },
  recordDate: { fontSize: 12, color: colors.textSecondary },
  comment: { fontSize: 13, color: colors.textPrimary, marginTop: 4, lineHeight: 18 },
});
