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
};

export default function RecordScreen() {
  const [registros, setRegistros] = useState<Registro[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const insets = useSafeAreaInsets();
  const TAB_HEIGHT = 80;

  const SCREEN_HEIGHT = Dimensions.get('window').height;

  const fetchRegistros = useCallback(async () => {
    const { data, error } = await supabase
      .from<Registro>('registros')
      .select('*')
      .order('date', { ascending: false });
    if (error) console.log('Error al leer registros:', error.message);
    else setRegistros(data || []);
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
    // Contenedor limitado en altura para recortar scroll
    <View style={[styles.clipContainer, { height: SCREEN_HEIGHT - TAB_HEIGHT - insets.bottom }]}>
      <ScrollView
        contentContainerStyle={styles.container}
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
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Registros</Text>
        </View>

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
  clipContainer: { overflow: 'hidden', flex: 1 }, // recorta cualquier contenido que exceda
  container: { paddingHorizontal: 18, paddingTop: 28, paddingBottom: 16 },
  header: { marginBottom: 24 },
  headerTitle: { fontSize: 28, fontWeight: '700', color: colors.textPrimary, letterSpacing: 0.3 },
  noRecords: { color: colors.textSecondary, textAlign: 'center', marginTop: 32, fontSize: 16 },
  shadowWrapper: {
    borderRadius: 18,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.035,
    shadowRadius: 12,
    elevation: 2,
    backgroundColor: 'transparent',
  },
  recordItem: { backgroundColor: colors.card, borderRadius: 18, paddingVertical: 14, paddingHorizontal: 16 },
  recordHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  recordType: { fontWeight: '600', fontSize: 15 },
  recordDate: { fontSize: 12, color: colors.textSecondary },
  comment: { fontSize: 14, color: colors.textPrimary, marginTop: 6, lineHeight: 20 },
});
