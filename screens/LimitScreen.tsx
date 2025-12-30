import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  Dimensions,
} from 'react-native';

const colors = {
  card: '#FFFFFF',
  textPrimary: '#C97A7A', // nombre del límite
  textSecondary: '#6B7280',
  textTertiary: '#9CA3AF',
  alertRed: '#C97A7A',
  darkPink: '#8B1E3F',
};

interface Limit {
  id: number;
  text: string;
  defendedCount?: number;
  notDefendedCount?: number;
}

export default function LimitsScreen() {
  const [input, setInput] = useState('');
  const [limits, setLimits] = useState<Limit[]>([]);
  const [search, setSearch] = useState('');

  const TAB_HEIGHT = 80;
  const SCREEN_HEIGHT = Dimensions.get('window').height;

  const addLimit = () => {
    if (!input.trim()) return;
    setLimits(prev => [
      ...prev,
      { id: Date.now(), text: input.trim(), defendedCount: 0, notDefendedCount: 0 },
    ]);
    setInput('');
  };

  const incrementCount = (id: number, defended: boolean) => {
    setLimits(prev =>
      prev.map(l =>
        l.id === id
          ? {
              ...l,
              defendedCount: defended ? (l.defendedCount || 0) + 1 : l.defendedCount,
              notDefendedCount: !defended ? (l.notDefendedCount || 0) + 1 : l.notDefendedCount,
            }
          : l
      )
    );
  };

  const filteredLimits = useMemo(() => {
    return limits.filter(limit =>
      limit.text.toLowerCase().includes(search.toLowerCase())
    );
  }, [limits, search]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={[styles.clipContainer, { height: SCREEN_HEIGHT - TAB_HEIGHT }]}>
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Mis límites</Text>
          <Text style={styles.subtitle}>Define tus líneas rojas que nadie debe cruzar.</Text>

          {/* Sección compacta: primer input + botón añadir + segundo input */}
          <View style={{ marginBottom: 16 }}>
            <View style={styles.inputShadow}>
              <TextInput
                style={styles.input}
                placeholder="Ej: No dejar que me interrumpan"
                placeholderTextColor={colors.textTertiary}
                value={input}
                onChangeText={setInput}
                returnKeyType="done"
                onSubmitEditing={addLimit}
              />
            </View>

            <TouchableOpacity style={[styles.addButton, { marginTop: 8 }]} onPress={addLimit}>
              <Text style={styles.addButtonText}>Añadir límite</Text>
            </TouchableOpacity>

            <View style={[styles.searchContainer, { marginTop: 8 }]}>
              <TextInput
                style={[styles.input, { flex: 1 }]}
                placeholder="Buscar límite..."
                placeholderTextColor={colors.textTertiary}
                value={search}
                onChangeText={setSearch}
              />
              {search.length > 0 && (
                <TouchableOpacity onPress={() => setSearch('')} style={styles.clearButton}>
                  <Text style={styles.clearButtonText}>×</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>

        {/* LISTA */}
        <FlatList
          data={filteredLimits}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.scrollContent}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Aún no has añadido ningún límite.</Text>
          }
          ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
          renderItem={({ item }) => (
            <View style={styles.limitCard}>
              {/* Nombre del límite + alerta a la derecha */}
              <View style={styles.limitHeader}>
                <Text style={styles.limitText}>{item.text}</Text>
                <View style={styles.alertBox}>
                  <Text style={styles.alertText}>!</Text>
                </View>
              </View>

              {/* Contador compacto */}
              <Text style={styles.counterText}>
                Defendido: {item.defendedCount || 0} · No defendido: {item.notDefendedCount || 0}
              </Text>

              <View style={styles.actions}>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => incrementCount(item.id, true)}
                >
                  <Text style={styles.actionText}>Lo defendí</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => incrementCount(item.id, false)}
                >
                  <Text style={styles.actionText}>No lo defendí</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  clipContainer: { flex: 1, overflow: 'hidden', marginBottom: 60 },
  header: {
    paddingHorizontal: 16,
    paddingTop: 20,
    marginBottom: 12,
    flexDirection: 'column', // mantiene flujo vertical
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    letterSpacing: 0.2,
    color: '#B22255', // nuevo color
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  inputShadow: {
    borderRadius: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 2,
  },
  input: {
    backgroundColor: colors.card,
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 14,
    fontSize: 15,
  },
  addButton: {
    backgroundColor: colors.darkPink,
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 14,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    backgroundColor: colors.card,
    paddingHorizontal: 12,
  },
  clearButton: {
    marginLeft: 8,
    padding: 4,
  },
  clearButtonText: {
    fontSize: 18,
    color: colors.textSecondary,
  },
  scrollContent: {
    paddingHorizontal: 18,
    paddingTop: 20,
    paddingBottom: 40,
  },
  emptyText: {
    textAlign: 'center',
    color: colors.textSecondary,
    fontSize: 14,
  },
  limitCard: {
    backgroundColor: colors.card,
    borderRadius: 14,
    padding: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 2,
  },
  limitHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  limitText: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  alertBox: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.alertRed,
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 14,
  },
  counterText: {
    fontSize: 12,
    color: colors.textTertiary,
    marginBottom: 8,
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
  },
  actionButton: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
  },
  actionText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textSecondary,
  },
});
