import Header from '@/components/ui/header';
import { Image } from 'expo-image';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle } from 'react-native-svg';

const ProgressCircle = ({ percent }) => {
  const size = 48;
  const strokeWidth = 4;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = circumference * (1 - percent / 100);

  return (
    <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center', marginLeft: 8 }}>
      <Svg width={size} height={size}>
        <Circle
          stroke="#eee"
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
        <Circle
          stroke="#6366F1"
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={progress}
          strokeLinecap="round"
          rotation="-90"
          origin={`${size / 2}, ${size / 2}`}
        />
      </Svg>
      <Text style={styles.progressText}>{percent}%</Text>
    </View>
  );
};

const RoadmapCard = ({ title, subtitle, progress, module, onView }) => (
  <View style={styles.card}>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
      <View style={{ flex: 1 }}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardSubtitle}>{subtitle}</Text>
        <Text style={styles.cardProgress}>Progress: {progress}%</Text>
      </View>
      <ProgressCircle percent={progress} />
    </View>
    <View style={styles.moduleRow}>
      <View style={styles.moduleDot} />
      <Text style={styles.moduleText}>{module}</Text>
      <TouchableOpacity style={styles.viewBtn} onPress={onView}>
        <Text style={styles.viewBtnText}>View</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const PROGRESS_COLORS = [
  '#fff',      // 0 - no progress
  '#A5B4FC',  // 1 - in progress
  '#6366F1',  // 2 - completed
];

const ProgressTracker = ({
  data = [], // 2D array: rows x cols, each cell is 0-2
  days = ['Mon', 'Wed', 'Fri'],
  months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  cols = 12,
  rows = 3,
}) => {
  const [containerWidth, setContainerWidth] = useState(0);
  const dayLabelWidth = 2;
  const minCell = 16;
  const margin = 1;
  // Calculate cell size so grid always fits inside container
  const availableWidth = Math.max(0, containerWidth - dayLabelWidth - (cols * margin * 2));
  const cellWidth = cols > 0 ? Math.max(minCell, Math.floor(availableWidth / cols)) : minCell;
  const gridWidth = cellWidth * cols + cols * margin * 2;
  const gridHeight = cellWidth * rows + rows * margin * 3;

  return (
    <View
      style={[styles.trackerOuter, { minHeight: gridHeight + 32 }]}
      onLayout={e => setContainerWidth(e.nativeEvent.layout.width)}
    >
      <View style={{ flexDirection: 'row', marginLeft: dayLabelWidth }}>
        {months.slice(0, cols).map((m, i) => (
          <View key={i} style={{ width: cellWidth, alignItems: 'center' }}>
            <Text style={[styles.trackerMonth, { fontSize: cellWidth < 18 ? 8 : 10 }]} numberOfLines={1} ellipsizeMode="tail">{m}</Text>
          </View>
        ))}
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
        <View style={{ justifyContent: 'center', height: gridHeight, marginRight: -4, width: dayLabelWidth }}>
          {days.slice(0, rows).map((d, i) => (
            <View key={i} style={{ height: cellWidth + margin * 2, justifyContent: 'center' }}>
              <Text style={styles.trackerDay}>{d}</Text>
            </View>
          ))}
        </View>
        <View style={{ flexDirection: 'column' }}>
          {Array.from({ length: rows }).map((_, row) => (
            <View key={row} style={{ flexDirection: 'row' }}>
              {Array.from({ length: cols }).map((_, col) => {
                const level = data[row] && data[row][col] !== undefined ? data[row][col] : 0;
                return (
                  <View
                    key={col}
                    style={[
                      styles.trackerCell,
                      {
                        width: cellWidth,
                        height: cellWidth,
                        margin: margin,
                        backgroundColor: PROGRESS_COLORS[level],
                        borderColor: level === 2 ? '#6366F1' : (level === 1 ? '#A5B4FC' : '#bbb'),
                      },
                    ]}
                  />
                );
              })}
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default function HomeScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F5F5F5' }}>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.greetingRow}>
          <View>
            <Text style={styles.greeting}>Kumusta, <Text style={styles.greetingName}>Juan!</Text></Text>
            <Text style={styles.greetingSub}>Let's continue your tech journey today!</Text>
          </View>
          <TouchableOpacity>
            <Image source={require('@/assets/images/BansAI Bot.png')} style={styles.profileIcon} />
          </TouchableOpacity>
        </View>
        <RoadmapCard
          title="Digital Literacy Roadmap"
          subtitle="Master basic tech and online tools."
          progress={20}
          module="Setting up an Email"
          onView={() => {}}
        />
        <RoadmapCard
          title="Coding Roadmap"
          subtitle="Start learning to code from zero."
          progress={80}
          module="Intro to Web Development"
          onView={() => {}}
        />
        <View style={styles.cardP}>
          <Text style={styles.cardTitle}>Progress Tracker</Text>
          <ProgressTracker
            data={[
              [0, 1, 2, 2, 1, 0, 0, 1, 2, 2, 1, 0],
              [1, 2, 2, 0, 1, 2, 2, 0, 1, 2, 2, 0],
              [2, 2, 1, 0, 2, 2, 1, 0, 2, 2, 1, 0],
            ]}
            months={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']}
            days={['Mon', 'Wed', 'Fri']}
            cols={12}
            rows={5}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  greetingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  greeting: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
  },
  greetingName: {
    color: '#FBBF24',
    fontWeight: 'bold',
  },
  greetingSub: {
    fontSize: 13,
    color: '#888',
    marginTop: 2,
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#eee',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
   cardP: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 20,
    paddingLeft: 35,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#222',
    marginBottom: 2,
  },
  cardSubtitle: {
    fontSize: 13,
    color: '#888',
    marginBottom: 2,
  },
  cardProgress: {
    fontSize: 12,
    color: '#6366F1',
    marginBottom: 4,
  },
  moduleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  moduleDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#6366F1',
    marginRight: 8,
  },
  moduleText: {
    fontWeight: '600',
    fontSize: 15,
    color: '#222',
    flex: 1,
  },
  viewBtn: {
    backgroundColor: '#6366F1',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 18,
  },
  viewBtnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  progressText: {
    fontSize: 12,
    color: '#6366F1',
    fontWeight: 'bold',
    position: 'absolute',
    alignSelf: 'center',
    top: 14,
    left: 0,
    right: 0,
    textAlign: 'center',
  },
  trackerOuter: {
    borderWidth: 1,
    borderColor: '#6366F1',
    borderRadius: 6,
    padding: 8,
    marginTop: 8,
    marginBottom: 4,
    backgroundColor: '#fff',
    alignSelf: 'stretch',
    minWidth: 260,
  },
  trackerMonth: {
    fontSize: 10,
    color: '#444',
    textAlign: 'center',
    marginBottom: 2,
    paddingHorizontal: 1,
  },
  trackerDay: {
    fontSize: 10,
    color: '#444',
    textAlign: 'right',
    marginRight: 2,
  },
  trackerCell: {
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 2,
    backgroundColor: '#fff',
  },
});
