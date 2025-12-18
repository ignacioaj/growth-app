import React, { useState, useRef } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'
import ConfirmModal from '../components/ConfirmModal'
import TugOfWarBox from '../components/TugOfWarBox'
import { supabase } from '../supabaseClient'

const colors = {
  bg: '#F8F9FB',
  card: '#FFFFFF',
  textPrimary: '#1F2933',
  textSecondary: '#6B7280',
  textTertiary: '#9CA3AF',
  calmGreen: '#6FAF8E',
  trustBlue: '#6B8EF2',
  softRed: '#C97A7A',
}

export default function HomeScreen() {
  const [inputText, setInputText] = useState('')
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedType, setSelectedType] = useState('')

  const contentRef = useRef<View>(null)

  const handlePress = (tipo) => {
    setSelectedType(tipo)
    setModalVisible(true)
  }

  const handleConfirm = async () => {
    if (!selectedType) return

    const newRegistro = {
      type: selectedType,
      comment: inputText,
      date: new Date().toISOString(),
    }

    await supabase.from('registros').insert([newRegistro])

    setModalVisible(false)
    setSelectedType('')
    setInputText('')
  }

  const handleCancel = () => {
    setModalVisible(false)
    setSelectedType('')
  }

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: colors.bg }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 24 : 0}
      >
        {/* Contenedor principal sin Scroll */}
        <View style={styles.container} ref={contentRef}>
          {/* Insight */}
          <View style={styles.section}>
            <TugOfWarBox />
          </View>

          {/* Reflexión */}
          <View style={styles.section}>
            <Text style={styles.label}>¿Qué te ha ocurrido hoy?</Text>
            <View style={styles.inputShadow}>
              <TextInput
                style={styles.input}
                placeholder="Puedes escribir un comentario (opcional)"
                placeholderTextColor={colors.textTertiary}
                value={inputText}
                onChangeText={setInputText}
                multiline
              />
            </View>
          </View>

          {/* Decisión */}
          <View style={styles.section}>
            <Text style={styles.label}>¿Cómo has reaccionado?</Text>
            <View style={styles.reactions}>
              <ReactionButton
                tipo="No incómodo"
                subtitle="Priorizaste tus límites"
                color={colors.calmGreen}
                onPress={handlePress}
              />
              <ReactionButton
                tipo="Sí incómodo"
                subtitle="Saliste de tu zona de confort"
                color={colors.trustBlue}
                onPress={handlePress}
              />
              <ReactionButton
                tipo="Sí complaciente"
                subtitle="Elegiste evitar el conflicto"
                color={colors.softRed}
                onPress={handlePress}
              />
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>

      <ConfirmModal
        visible={modalVisible}
        tipo={selectedType}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </>
  )
}

const ReactionButton = ({ tipo, subtitle, color, onPress }) => (
  <TouchableOpacity
    style={styles.reactionCard}
    activeOpacity={0.92}
    onPress={() => onPress(tipo)}
  >
    <View style={[styles.reactionDot, { backgroundColor: color }]} />
    <View style={{ flex: 1 }}>
      <Text style={styles.reactionTitle}>{tipo}</Text>
      <Text style={styles.reactionSubtitle}>{subtitle}</Text>
    </View>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    paddingHorizontal: 18,
    paddingTop: 28,
    paddingBottom: 56, // espacio para tab bar
  },
  section: {
    marginBottom: 28,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.textPrimary,
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
  reactions: {
    gap: 12,
  },
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
  reactionDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  reactionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  reactionSubtitle: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
})
