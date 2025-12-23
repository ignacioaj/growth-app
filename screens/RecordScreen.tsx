import React, { useEffect, useState, useCallback, useRef } from 'react';
import { View, ScrollView, Text, StyleSheet, RefreshControl, Dimensions, TouchableOpacity, Animated, Easing } from 'react-native';
import { supabase } from '../supabaseClient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import RemarkModal from '../components/RemarkModal';

interface Record {
  id?: string;
  date: string;
  type: string;
  comment: string;
  remark?: boolean;
}

const colors = {
  card: '#FFFFFF',
  textPrimary: '#1F2933',
  textSecondary: '#6B7280',
  calmGreen: '#6FAF8E',
  trustBlue: '#6B8EF2',
  softRed: '#C97A7A',
  darkPink: '#D6336C',
  grayDate: '#9CA3AF',
  goldLight: '#FFF8E1',
  buttonBg: '#FFE3EC',
  buttonActive: '#D6336C',
};

export default function RecordScreen() {
  const [records, setRecords] = useState<Record[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<Record | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [showOnlyRemarked, setShowOnlyRemarked] = useState(false);

  const insets = useSafeAreaInsets();
  const TAB_HEIGHT = 80;
  const SCREEN_HEIGHT = Dimensions.get('window').height;

  const fetchRecords = useCallback(async () => {
    const { data, error } = await supabase
      .from<Record>('records')
      .select('*')
      .order('date', { ascending: false });
    if (!error) setRecords(data || []);
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchRecords();
    setRefreshing(false);
  }, [fetchRecords]);

  useEffect(() => { fetchRecords(); }, [fetchRecords]);

  const handlePressRecord = (record: Record) => {
    if (!record.comment || record.comment.trim() === '') return;

    setSelectedRecord(record);
    setModalVisible(true);
  };

  const handleConfirm = async () => {
    if (!selectedRecord?.id) return;
    try {
      const newRemark = !selectedRecord.remark; // alterna destacado
      const { error } = await supabase
        .from('records')
        .update({ remark: newRemark })
        .eq('id', Number(selectedRecord.id));
      if (error) return;

      setModalVisible(false);
      setSelectedRecord(null);
      await fetchRecords();
    } catch (err) { console.error(err); }
  };

  const handleCancel = () => {
    setModalVisible(false);
    setSelectedRecord(null);
  };

  const toggleFilter = () => setShowOnlyRemarked(!showOnlyRemarked);

  const groupRecordsByDate = (records: Record[]) => {
    return records.reduce((acc, record) => {
      const date = new Date(record.date).toLocaleDateString();
      if (!acc[date]) acc[date] = [];
      acc[date].push(record);
      return acc;
    }, {} as Record<string, Record[]>);
  };

  const displayedRecords = showOnlyRemarked ? records.filter(r => r.remark) : records;
  const groupedRecords = groupRecordsByDate(displayedRecords);

  return (
    <View style={[styles.clipContainer, { height: SCREEN_HEIGHT - TAB_HEIGHT }]}>
      <View style={[styles.header, { height: 50 }]}>
        <Text style={[styles.headerTitle, { color: '#B22255' }]}>Mi diario</Text>
      </View>

      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[
            styles.filterButton,
            showOnlyRemarked ? { backgroundColor: colors.darkPink } : { backgroundColor: '#F5D0DC' },
          ]}
          onPress={toggleFilter}
        >
          <Text
            style={[
              styles.filterText,
              showOnlyRemarked ? { color: '#FFFFFF' } : { color: '#B22255' },
            ]}
          >
            {showOnlyRemarked ? 'Mostrar todos' : 'Mostrar hitos'}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 5 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.trustBlue} colors={[colors.trustBlue]} />
        }
      >
        {displayedRecords.length === 0 && <Text style={styles.noRecords}>No hay registros todavía.</Text>}

        {Object.entries(groupedRecords).map(([date, dailyRecords]) => (
          <View key={date}>
            <View style={styles.daySeparator}>
              <Text style={[styles.separatorText, { color: colors.darkPink }]}>• {date}</Text>
              <View style={[styles.separatorLine, { backgroundColor: colors.darkPink }]} />
            </View>

            {dailyRecords.map((r) => (
              <RecordCard key={r.id || r.date} record={r} onPress={() => handlePressRecord(r)} />
            ))}
          </View>
        ))}
      </ScrollView>

      {selectedRecord && (
        <RemarkModal
          visible={modalVisible}
          type={selectedRecord.type}
          comment={selectedRecord.comment}
          alreadyRemarked={selectedRecord.remark}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </View>
  );
}

const RecordCard = ({ record, onPress }: { record: Record; onPress: () => void }) => {
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (record.remark) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(animation, { toValue: 1, duration: 1200, easing: Easing.inOut(Easing.ease), useNativeDriver: false }),
          Animated.timing(animation, { toValue: 0, duration: 1200, easing: Easing.inOut(Easing.ease), useNativeDriver: false }),
        ])
      ).start();
    }
  }, [record.remark]);

  const borderColor = record.remark
    ? animation.interpolate({ inputRange: [0, 1], outputRange: [colors.darkPink, colors.softRed] })
    : '#FFFFFF';
  const shadowColor = record.remark
    ? animation.interpolate({ inputRange: [0, 1], outputRange: [colors.darkPink, colors.softRed] })
    : '#000';
  const backgroundColor = record.remark ? '#F5D0DC' : '#FFFFFF';

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={1}>
      <Animated.View style={[styles.shadowWrapper, { shadowColor }]}>
        <Animated.View style={[styles.recordItem, { borderColor, borderWidth: record.remark ? 2 : 0, backgroundColor }]}>
          <View style={styles.recordHeaderCard}>
            <Text style={[styles.recordType, { color: getColor(record.type) }]}>{record.type}</Text>
            <Text style={styles.recordDateCard}>{new Date(record.date).toLocaleDateString()}</Text>
          </View>
          {record.comment ? <Text style={styles.comment}>{record.comment}</Text> : null}
          {record.remark && (
            <View style={styles.remarkContainer}>
              <Text style={[styles.remarkLabel, { color: colors.darkPink }]}>Hito</Text>
            </View>
          )}
        </Animated.View>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  clipContainer: { flex: 1, overflow: 'hidden', marginBottom: 60 },
  header: { paddingLeft: 16 },
  headerTitle: { fontSize: 24, fontWeight: '700', letterSpacing: 0.2 },
  filterContainer: { paddingHorizontal: 16, marginVertical: 8, flexDirection: 'row' },
  filterButton: { paddingVertical: 6, paddingHorizontal: 14, borderRadius: 12 },
  filterText: { fontSize: 14, fontWeight: '500' },
  noRecords: { color: colors.textSecondary, textAlign: 'center', fontSize: 14 },
  shadowWrapper: { borderRadius: 12, marginBottom: 12, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.15, shadowRadius: 6, elevation: 2 },
  recordItem: { borderRadius: 12, paddingVertical: 12, paddingHorizontal: 16 },
  recordHeaderCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  recordType: { fontWeight: '600', fontSize: 14 },
  recordDateCard: { fontSize: 12, color: colors.grayDate },
  comment: { fontSize: 13, color: colors.textPrimary, marginTop: 4, lineHeight: 18 },
  remarkContainer: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: 8 },
  remarkLabel: { fontSize: 12, fontWeight: '600' },
  daySeparator: { flexDirection: 'row', alignItems: 'center', marginVertical: 16 },
  separatorLine: { flex: 1, height: 0.8, marginLeft: 8 },
  separatorText: { fontSize: 12, fontWeight: '600', textAlign: 'left' },
});

function getColor(type: string) {
  switch (type) {
    case 'No incómodo': return colors.calmGreen;
    case 'Sí incómodo': return colors.trustBlue;
    case 'Sí complaciente': return colors.softRed;
    default: return colors.textPrimary;
  }
}
