import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const colors = {
  card: '#FFFFFF',
  textPrimary: '#C97A7A',
  textSecondary: '#6B7280',
  textTertiary: '#9CA3AF',
  darkPink: '#8B1E3F',
  softRed: '#F28B82',
};

const SelfcareHelp = ({ label }) => {
  const [helpVisible, setHelpVisible] = useState(false);

  return (
    <View style={{ marginBottom: 12 }}>
      {/* Label con icono */}
      <View style={styles.labelRow}>
        <Text style={styles.label}>{label}</Text>
        <TouchableOpacity onPress={() => setHelpVisible(true)}>
          <Ionicons
            name="help-circle-outline"
            size={18}
            color={colors.textTertiary}
            style={{ marginLeft: 6 }}
          />
        </TouchableOpacity>
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
              <Text style={styles.tooltipClose}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default SelfcareHelp;

const styles = StyleSheet.create({
  labelRow: { flexDirection: 'row', alignItems: 'center' },
  label: { fontSize: 15, fontWeight: '600', color: colors.darkPink },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.25)',
    justifyContent: 'center',
    paddingHorizontal: 24,
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
