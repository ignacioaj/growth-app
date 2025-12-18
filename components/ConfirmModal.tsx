import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Platform,
  StatusBar,
} from 'react-native';

/* ──────────────────────────────
   Design tokens
────────────────────────────── */
const colors = {
  overlay: 'rgba(0,0,0,0.28)',

  card: '#FFFFFF',

  textPrimary: '#1F2933',
  textSecondary: '#6B7280',

  calmGreen: '#6FAF8E',
  trustBlue: '#6B8EF2',
  softRed: '#C97A7A',

  neutralButton: '#F2F3F7',
};

interface ConfirmModalProps {
  visible: boolean;
  tipo: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

const getTipoColor = (tipo: string) => {
  switch (tipo) {
    case 'No incómodo':
      return colors.calmGreen;
    case 'Sí incómodo':
      return colors.trustBlue;
    case 'Sí complaciente':
      return colors.softRed;
    default:
      return colors.textPrimary;
  }
};

export default function ConfirmModal({
  visible,
  tipo,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onCancel}
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        {/* Shadow wrapper */}
        <View style={styles.shadowWrapper}>
          <View style={styles.card}>
            {/* Copy */}
            <Text style={styles.title}>Confirmar elección</Text>

            <Text style={styles.subtitle}>
              Esto es lo que has decidido hacer
            </Text>

            <Text
              style={[
                styles.choice,
                { color: getTipoColor(tipo) },
              ]}
            >
              {tipo}
            </Text>

            {/* Actions */}
            <View style={styles.actions}>
              <TouchableOpacity
                style={styles.secondaryButton}
                activeOpacity={0.9}
                onPress={onCancel}
              >
                <Text style={styles.secondaryText}>
                  Volver atrás
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.primaryButton}
                activeOpacity={0.9}
                onPress={onConfirm}
              >
                <Text style={styles.primaryText}>
                  Confirmar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

/* ──────────────────────────────
   Styles
────────────────────────────── */
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      android: {
        paddingTop: StatusBar.currentHeight,
      },
    }),
  },

  /* Sombra separada (anti-picos) */
  shadowWrapper: {
    borderRadius: 20,
    backgroundColor: 'transparent',

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.08,
    shadowRadius: 28,
    elevation: 6,
  },

  /* Card real */
  card: {
    width: '82%',
    backgroundColor: colors.card,
    borderRadius: 20,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 20,
    alignItems: 'center',
  },

  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 6,
  },

  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 18,
  },

  choice: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 28,
  },

  actions: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },

  secondaryButton: {
    flex: 1,
    backgroundColor: colors.neutralButton,
    paddingVertical: 14,
    borderRadius: 999,
    alignItems: 'center',
  },

  secondaryText: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.textPrimary,
  },

  primaryButton: {
    flex: 1,
    backgroundColor: colors.textPrimary,
    paddingVertical: 14,
    borderRadius: 999,
    alignItems: 'center',
  },

  primaryText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
