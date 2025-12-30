import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import ConfirmModal from '../components/ConfirmModal';
import TugOfWarBox from '../components/TugOfWarBox';
import GrowthRow from '../components/GrowthRow';
import { supabase } from '../supabaseClient';

const colors = {
  bg: 'transparent',
  card: '#FFFFFF',
  textPrimary: '#1F2933',
  textSecondary: '#6B7280',
  textTertiary: '#9CA3AF',
  calmGreen: '#6BD17F', // verde TugOfWar
  trustBlue: '#6B8EF2',
  softRed: '#B00020',   // rojo TugOfWar
  darkPink: '#8B1E3F',
};

export default function HomeScreen() {
  const [inputText, setInputText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedType, setSelectedType] = useState('');

  const handlePress = (type: string) => {
    setSelectedType(type);
    setModalVisible(true);
  };

  const handleConfirm = async () => {
    if (!selectedType) return;

    await supabase.from('registros').insert([
      {
        type: selectedType,
        comment: inputText,
        date: new Date().toISOString(),
      },
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
    <>
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: colors.bg }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 24 : 0}
      >
        <View style={styles.container}>
          {/* Tug of War Box */}
          <View style={styles.section}>
            <TugOfWarBox />
          </View>

          <View style={styles.section}>
            <GrowthRow />
          </View>

          {/* Comentario
          <View style={styles.section}>
            <Text style={styles.label}>¿Qué te ha ocurrido hoy?</Text>
            <View style={styles.inputShadow}>
              <TextInput
                style={styles.input}
                placeholder="Escribe un breve comentario (opcional)"
                placeholderTextColor={colors.textTertiary}
                value={inputText}
                onChangeText={setInputText}
                multiline={false}
                blurOnSubmit={true}
                returnKeyType="done"
              />
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>¿Cómo has reaccionado?</Text>
            <View style={styles.reactions}>
              <ReactionButton
                type="No incómodo"
                subtitle="Priorizaste tus límites"
                color={colors.calmGreen}
                onPress={handlePress}
              />
              <ReactionButton
                type="Sí incómodo"
                subtitle="Saliste de tu zona de comfort"
                color={colors.trustBlue}
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
          */}
        </View>
      </KeyboardAvoidingView>

      <ConfirmModal
        visible={modalVisible}
        type={selectedType}
        message={inputText}  // <-- pasamos el comentario aquí
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </>
  );
}

const ReactionButton = ({ type, subtitle, color, onPress }) => (
  <TouchableOpacity
    style={styles.reactionCard}
    activeOpacity={0.92}
    onPress={() => onPress(type)}
  >
    <View style={[styles.reactionDot, { backgroundColor: color }]} />
    <View style={{ flex: 1 }}>
      <Text style={styles.reactionTitle}>{type}</Text>
      <Text style={styles.reactionSubtitle}>{subtitle}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    paddingHorizontal: 18,
    paddingTop: 16,
    paddingBottom: 56,
  },
  section: {
    marginBottom: 20,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.darkPink,
    marginBottom: 12,
  },
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
  reactions: { gap: 12 },
  reactionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
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
  reactionDot: { width: 8, height: 8, borderRadius: 4 },
  reactionTitle: { fontSize: 15, fontWeight: '600', color: colors.textPrimary },
  reactionSubtitle: { fontSize: 12, color: colors.textSecondary, marginTop: 2 },
});
