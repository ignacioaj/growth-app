import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  Modal,
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import type { RootStackParamList } from '../navigation/RootStack';
import ConfirmModal from '../components/ConfirmModal';
import { supabase } from '../supabaseClient';
import { Ionicons } from '@expo/vector-icons';

const colors = {
  bg: 'transparent',
  card: '#FFFFFF',
  textPrimary: '#C97A7A',
  textSecondary: '#6B7280',
  textTertiary: '#9CA3AF',
  darkPink: '#8B1E3F',
  calmGreen: '#8BC34A',
  trustBlue: '#2196F3',
  softRed: '#F28B82',
};

interface SelfcareEntry {
  id: number;
  comment: string;
  type: string;
}

export default function SelfcareScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [inputText, setInputText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedType, setSelectedType] = useState('');
  const [entries, setEntries] = useState<SelfcareEntry[]>([]);
  const [helpVisible, setHelpVisible] = useState(false);

  const handlePress = (type: string) => {
    setSelectedType(type);
    setModalVisible(true);
  };

  const handleConfirm = async () => {
    if (!selectedType) return;

    const newEntry = {
      id: Date.now(),
      type: selectedType,
      comment: inputText,
    };

    setEntries(prev => [newEntry, ...prev]);

    await supabase.from('selfcare').insert([
      { type: selectedType, comment: inputText, date: new Date().toISOString() },
    ]);

    setModalVisible(false);
    setSelectedType('');
    setInputText('');
  };

  const handleCancel = () => {
    setModalVisible(false);
    setSelectedType('');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <TouchableOpacity onPress={() => navigation.replace('Tabs')} style={styles.backButton}>
            <Ionicons name="chevron-back" size={28} color={colors.darkPink} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Mi autocuidado</Text>
        </View>
        <Text style={styles.subtitle}>Pon tu bienestar en primer lugar y cuídate.</Text>
      </View>

      <View style={styles.content}>
        {/* Comentario */}
        <View style={styles.section}>
          <Text style={styles.label}>¿Qué te ha ocurrido hoy?</Text>
          <View style={styles.inputShadow}>
            <TextInput
              style={styles.input}
              placeholder="Escribe un breve comentario (opcional)"
              placeholderTextColor={colors.textTertiary}
              value={inputText}
              onChangeText={setInputText}
              multiline
              blurOnSubmit
              returnKeyType="done"
            />
          </View>
        </View>

        {/* Botones grandes */}
        <View style={styles.section}>
          <Text style={styles.label}>¿Has reaccionado ante una situación?</Text>
          <View style={styles.reactionsColumn}>
            <ReactionButton
              type="No incómodo"
              subtitle="Priorizaste tus límites"
              color={colors.calmGreen}
              onPress={handlePress}
            />
            <ReactionButton
              type="Sí complaciente"
              subtitle="Elegiste evitar el conflicto"
              color={colors.softRed}
              onPress={handlePress}
            />
          </View>
        </View>

        {/* Botones pequeños con icono alineado */}
        <View style={styles.section}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
            <Text style={styles.label}>¿Has realizado algún tipo de cuidado?</Text>
            <TouchableOpacity
              onPress={() => setHelpVisible(true)}
              style={{ marginLeft: 'auto', marginTop: -2 }}
            >
              <Ionicons
                name="information-circle"
                size={20}
                color={colors.darkPink}
              />
            </TouchableOpacity>
          </View>

          <ReactionButton
            type="Autocuidado"
            subtitle="Tomaste acción para mejorar tu bienestar."
            color={colors.softRed}
            onPress={handlePress}
          />
        </View>

        {/* Modal de aclaración */}
        <Modal
          transparent
          visible={helpVisible}
          animationType="fade"
          onRequestClose={() => setHelpVisible(false)}
        >
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPressOut={() => setHelpVisible(false)}
          >
            <View style={styles.tooltip}>
              <Text style={styles.tooltipText}>
                Puede incluir actividades como hacer deporte, meditar, descansar, cuidar tu estética o higiene,
                ordenar tu espacio, o simplemente darte un capricho.
              </Text>
              <TouchableOpacity onPress={() => setHelpVisible(false)}>
                <Text style={[styles.tooltipClose, { marginRight: 8, paddingTop: 12 }]}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>

        {/* Lista de entradas */}
        {entries.length > 0 && (
          <FlatList
            data={entries}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.entryCard}>
                <Text style={styles.entryType}>{item.type}</Text>
                {item.comment ? <Text style={styles.entryComment}>{item.comment}</Text> : null}
              </View>
            )}
            contentContainerStyle={{ paddingBottom: 60 }}
          />
        )}
      </View>

      <ConfirmModal
        visible={modalVisible}
        type={selectedType}
        message={inputText}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </KeyboardAvoidingView>
  );
}

const ReactionButton = ({ type, subtitle, color, onPress }) => (
  <TouchableOpacity
    style={[styles.reactionCard, { width: '100%', marginBottom: 12 }]}
    activeOpacity={0.92}
    onPress={() => onPress(type)}
  >
    <View style={[styles.reactionDot, { backgroundColor: color }]} />
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Text style={styles.reactionTitle}>{type}</Text>
      <Text style={styles.reactionSubtitle}>{subtitle}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg, paddingHorizontal: 16 },
  header: { paddingTop: 20 },
  titleRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  backButton: { marginRight: 6, marginLeft: -4 },
  headerTitle: { fontSize: 24, fontWeight: '700', letterSpacing: 0.2, color: colors.darkPink },
  subtitle: { fontSize: 14, color: colors.textSecondary, marginBottom: 16 },
  content: { flex: 1 },
  section: { marginBottom: 20 },
  label: { fontSize: 15, fontWeight: '600', color: colors.darkPink, marginBottom: 8 },
  inputShadow: {
    borderRadius: 14,
    backgroundColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.035,
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
    minHeight: 50,
    lineHeight: 20,
  },
  reactionsColumn: { flexDirection: 'column' },
  reactionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 2,
  },
  reactionDot: { width: 8, height: 8, borderRadius: 4, marginRight: 10 },
  reactionTitle: { fontSize: 15, fontWeight: '600', color: colors.textPrimary },
  reactionSubtitle: { fontSize: 12, color: colors.textSecondary, marginTop: 2 },
  entryCard: {
    backgroundColor: colors.card,
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 2,
  },
  entryType: { fontSize: 15, fontWeight: '700', color: colors.textPrimary, marginBottom: 4 },
  entryComment: { fontSize: 14, color: colors.textSecondary },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.25)',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  tooltip: {
    backgroundColor: colors.card,
    padding: 16,
    borderRadius: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    marginHorizontal: 16
  },
  tooltipText: { fontSize: 13, color: colors.textSecondary, lineHeight: 18 },
  tooltipClose: {
    color: colors.darkPink,
    marginTop: 12,
    fontWeight: '600',
    textAlign: 'right',
    fontSize: 14,
  },
});
