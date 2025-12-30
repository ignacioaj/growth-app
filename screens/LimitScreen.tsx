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
  textPrimary: '#1F2933',
  textSecondary: '#6B7280',
  textTertiary: '#9CA3AF',
  calmGreen: '#6BD17F',
  softRed: '#C97A7A',
  darkPink: '#8B1E3F',
};

interface Limit {
  id: number;
  text: string;
  respected?: boolean;
}

export default function LimitsScreen() {
  const [input, setInput] = useState('');
  const [limits, setLimits] = useState<Limit[]>([]);
  const [search, setSearch] = useState('');

  const TAB_HEIGHT = 80;
  const SCREEN_HEIGHT = Dimensions.get('window').height;

  const addLimit = () => {
    if (!input.trim()) return;
    setLimits(prev => [...prev, { id: Date.now(), text: input.trim() }]);
    setInput('');
  };

  const markLimit = (id: number, defended: boolean) => {
    setLimits(prev =>
      prev.map(l => (l.id === id ? { ...l, respected: defended } : l))
    );
  };

  const filteredLimits = useMemo(() => {
    return limits
      .filter(limit =>
        limit.text.toLowerCase().includes(search.toLowerCase())
      )
      .sort((a, b) => {
        if (a.respected === b.respected) return 0;
        if (a.respected === true) return -1;
        if (a.respected === false) return 1;
        return 0;
      });
  }, [limits, search]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={[styles.clipContainer, { height: SCREEN_HEIGHT - TAB_HEIGHT }]}>
        {/* HEADER FIJO */}
        <View style={styles.fixedHeader}>
          <Text style={styles.title}>Mis límites</Text>
          <Text style={styles.subtitle}>
            Define tus líneas rojas que nadie debe pasar.
          </Text>

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

          <TouchableOpacity style={styles.addButton} onPress={addLimit}>
            <Text style={styles.addButtonText}>Añadir límite</Text>
          </TouchableOpacity>

          {/* Barra de búsqueda con botón de limpiar */}
          <View style={styles.searchContainer}>
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

        {/* LISTA OPTIMIZADA */}
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
              <Text style={styles.limitText}>{item.text}</Text>
              <View style={styles.actions}>
                <TouchableOpacity
                  style={[
                    styles.actionButton,
                    item.respected === true && { backgroundColor: colors.calmGreen },
                  ]}
                  onPress={() => markLimit(item.id, true)}
                >
                  <Text
                    style={[
                      styles.actionText,
                      item.respected === true && { color: '#FFF' },
                    ]}
                  >
                    Lo defendí
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.actionButton,
                    item.respected === false && { backgroundColor: colors.softRed },
                  ]}
                  onPress={() => markLimit(item.id, false)}
                >
                  <Text
                    style={[
                      styles.actionText,
                      item.respected === false && { color: '#FFF' },
                    ]}
                  >
                    No lo defendí
                  </Text>
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
  clipContainer: {
    flex: 1,
    overflow: 'hidden',
    marginBottom: 60,
  },
  fixedHeader: {
    paddingHorizontal: 18,
    paddingTop: 20,
    marginBottom: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.darkPink,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 16,
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
    paddingVertical: 12,
    paddingHorizontal: 14,
    fontSize: 15,
    color: colors.textPrimary,
  },
  addButton: {
    marginTop: 12,
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
    marginTop: 16,
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
  limitText: {
    fontSize: 15,
    color: colors.textPrimary,
    marginBottom: 12,
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
