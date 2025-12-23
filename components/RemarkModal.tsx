import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Platform, StatusBar, ScrollView } from 'react-native';

const colors = {
  overlay: 'rgba(0,0,0,0.28)',
  card: '#FFFFFF',
  textPrimary: '#1F2933',
  textSecondary: '#6B7280',
  calmGreen: '#6FAF8E',
  trustBlue: '#6B8EF2',
  softRed: '#C97A7A',
  neutralButton: '#F2F3F7',
  commentBackground: '#F9F9F9',
};

interface RemarkModalProps {
  visible: boolean;
  type: string;
  comment?: string;
  alreadyRemarked?: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
}

const getTypeColor = (type: string) => {
  switch (type) {
    case 'No incómodo': return colors.calmGreen;
    case 'Sí incómodo': return colors.trustBlue;
    case 'Sí complaciente': return colors.softRed;
    default: return colors.textPrimary;
  }
};

export default function RemarkModal({ visible, type, comment, alreadyRemarked = false, onConfirm, onCancel }: RemarkModalProps) {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onCancel}
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.title}>{alreadyRemarked ? 'Quitar de destacados' : 'Recordar este suceso'}</Text>
          <Text style={styles.subtitle}>
            {alreadyRemarked
              ? '¿Quieres quitar este suceso de tus hitos?'
              : '¿Quieres destacar este\nsuceso en tu diario?'}
          </Text>

          <Text style={[styles.typeLabel, { color: getTypeColor(type) }]}>{type}</Text>

          {comment ? (
            <View style={styles.commentBox}>
              <ScrollView>
                <Text style={styles.comment}>{comment}</Text>
              </ScrollView>
            </View>
          ) : null}

          <View style={styles.actions}>
            <TouchableOpacity style={styles.secondaryButton} onPress={onCancel}>
              <Text style={styles.secondaryText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.primaryButton} onPress={onConfirm}>
              <Text style={styles.primaryText}>
                {alreadyRemarked ? 'Sí, quitar' : 'Sí, destacar'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({ android: { paddingTop: StatusBar.currentHeight } }),
  },
  card: {
    width: '85%',
    maxHeight: '80%',
    backgroundColor: colors.card,
    borderRadius: 20,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 20,
    alignItems: 'center',
  },
  title: { fontSize: 18, fontWeight: '600', color: colors.textPrimary, marginBottom: 6 },
  subtitle: { fontSize: 14, color: colors.textSecondary, textAlign: 'center', marginBottom: 12 },
  typeLabel: { fontSize: 17, fontWeight: '600', marginBottom: 12, textAlign: 'center' },
  commentBox: {
    backgroundColor: colors.commentBackground,
    borderRadius: 12,
    padding: 12,
    width: '100%',
    marginBottom: 20,
    maxHeight: 80,
  },
  comment: { fontSize: 14, color: colors.textPrimary },
  actions: { flexDirection: 'row', gap: 12, width: '100%' },
  secondaryButton: {
    flex: 1,
    backgroundColor: colors.neutralButton,
    paddingVertical: 14,
    borderRadius: 999,
    alignItems: 'center',
  },
  secondaryText: { fontSize: 15, fontWeight: '600', color: colors.textPrimary },
  primaryButton: {
    flex: 1,
    backgroundColor: colors.textPrimary,
    paddingVertical: 14,
    borderRadius: 999,
    alignItems: 'center',
  },
  primaryText: { fontSize: 15, fontWeight: '600', color: '#FFFFFF' },
});
