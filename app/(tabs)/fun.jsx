import { coding_lessons, digital_literacy_lessons } from '@/app/data/lessons';
import Header from '@/components/ui/header';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { List } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle } from 'react-native-svg';

export default function FunScreen() {
  const [activeTab, setActiveTab] = useState('Coding');
  const [activeSection, setActiveSection] = useState('Roadmap');

  const ProgressCircle = ({ size = 32, strokeWidth = 4, percentage = 75 }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <Svg width={size} height={size}>
        <Circle
          stroke="#e0e0e0"
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
        <Circle
          stroke="#6C63FF"
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          rotation="-90"
          origin={`${size / 2}, ${size / 2}`}
        />
      </Svg>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* Top Tabs */}

      <Header/>
      <LinearGradient
        colors={['#F0698B', '#3626EF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.bannerContainer}
      >
        <View style={styles.topTabs}>
          <Pressable onPress={() => setActiveTab('Coding')} style={[styles.topTab, activeTab === 'Coding' && styles.activeTopTab]}>
            <Text style={[styles.topTabText, activeTab === 'Coding' && styles.activeTopTabText]}>Coding</Text>
          </Pressable>
          <Pressable onPress={() => setActiveTab('Digital Literacy')} style={[styles.topTab, activeTab === 'Digital Literacy' && styles.activeTopTab]}>
            <Text style={[styles.topTabText, activeTab === 'Digital Literacy' && styles.activeTopTabText]}>Digital Literacy</Text>
          </Pressable>
        </View>
        <Image
          source={require('@/assets/images/Learn the Filipino Way.png')}
          style={styles.bannerImage}
          resizeMode="cover"
        />
      </LinearGradient>

      {/* Section Tabs */}
      <View style={styles.sectionTabs}>
        <Pressable onPress={() => setActiveSection('Roadmap')} style={[styles.sectionTab, activeSection === 'Roadmap' && styles.activeSectionTab]}>
          <Text style={[styles.sectionTabText, activeSection === 'Roadmap' && styles.activeSectionTabText]}>Roadmap</Text>
        </Pressable>
        <Pressable onPress={() => setActiveSection('Progress')} style={[styles.sectionTab, activeSection === 'Progress' && styles.activeSectionTab]}>
          <Text style={[styles.sectionTabText, activeSection === 'Progress' && styles.activeSectionTabText]}>Progress</Text>
        </Pressable>
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {activeSection === 'Roadmap' ? (
          <View style={styles.roadmapContainer}>
            {(activeTab === 'Coding' ? coding_lessons : digital_literacy_lessons).map((lesson, index, array) => (
              <React.Fragment key={index}>
                <View style={styles.roadmapStep}>
                  {index === 0 && (
                    <View style={styles.avatarCircle}>
                      <Text style={styles.avatarText}>👤</Text>
                    </View>
                  )}

                  <View style={styles.roadmapCard}>
                    <Text style={styles.roadmapTitle}>{lesson.stage}</Text>
                    <Pressable style={index === 0 ? styles.continueBtn : styles.viewBtn}>
                      <Text style={index === 0 ? styles.continueBtnText : styles.viewBtnText}>
                        {index === 0 ? 'Continue' : 'View'}
                      </Text>
                    </Pressable>
                  </View>
                </View>

                {index !== array.length - 1 && (
                  <View style={styles.dottedLine} />
                )}
              </React.Fragment>
            ))}
          </View>
        ) : (
          <View style={styles.progressContainer}>
            {
              <List.Section>
                {(activeTab==='Coding' ? coding_lessons : digital_literacy_lessons

                ).map((lesson, index) => (
                  <List.Accordion
                    key={index}
                    left={() => (
                      <View style={styles.progressItem}>
                        <ProgressCircle percentage={lesson.percentage || 0} />
                        <Text style={[styles.stageTitle, { marginLeft: 12 }] }>{lesson.stage}</Text>
                      </View>
                    )}

                    style={styles.dropdownTopicItem}
                  >
                    <View style={styles.dropdownContent}>
                      <Text style={styles.dropdownDescription}>{lesson.description}</Text>
                      <Text style={styles.dropdownTopicsLabel}>Topics:</Text>
                      {lesson.topics?.map((topic, i) => (
                        <TouchableOpacity key={i} onPress={() => console.log(`Navigating to ${topic.title}`)}>
                          <View style={[styles.dropdownTopicItem, { borderColor: '#4C43AE'}]}>
                            <Text key={i} style={styles.dropdownTopicItemTitle}>{topic.title}</Text>
                          </View>
                        
                        </TouchableOpacity>
                      ))}
                    </View>
                  </List.Accordion>
                ))}
              </List.Section>
            }
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  topTabs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    marginBottom:40
  },
  topTab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8, 
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTopTab: {
    borderBottomColor: '#fff',
  },
  topTabText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '300',
  },
  activeTopTabText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  bannerContainer: {
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  bannerImage: {
    width: 260,
    height: 120,
    borderRadius: 12,
    marginBottom: 8,
  },
  bannerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6C63FF',
    marginBottom: 4,
  },
  sectionTabs: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
  },
  sectionTab: {
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
    marginHorizontal: 8,
  },
  activeSectionTab: {
    borderBottomColor: '#FF5A5F',
  },
  sectionTabText: {
    fontSize: 16,
    color: '#888',
    fontWeight: '500',
  },
  activeSectionTabText: {
    color: '#FF5A5F',
    fontWeight: 'bold',
  },
  roadmapContainer: {
    alignItems: 'center',
    paddingVertical: 24,
    backgroundColor: '#fff',
    flex: 1,
  },
  roadmapStep: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  avatarCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#6C63FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 22,
    color: '#fff',
  },
  roadmapCard: {
    backgroundColor: '#fff',
    display: 'flex',
    borderRadius: 10,
    padding: 12,
    minWidth: 180,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    borderWidth: 1,
    borderColor: '#eee',
  },
  roadmapTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 6,
    color: '#222',
  },
  continueBtn: {
    backgroundColor: '#6C63FF',
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 14,
    alignSelf: 'flex-start',
  },
  continueBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
  },
  viewBtn: {
    backgroundColor: '#222',
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 14,
    alignSelf: 'flex-start',
  },
  viewBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
  },
  dottedLine: {
    width: 4,
    height: 32,
    borderLeftWidth: 2,
    borderColor: '#bbb',
    borderStyle: 'dotted',
    alignSelf: 'center',
    marginVertical: 0,
    marginLeft: 20,
  },
  progressContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  accordion: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
    elevation: 1,
    padding: 12,
    shadowColor: '#000',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',

  },
  progressItem: {
    flexDirection: 'row', 
    alignItems: 'center', 
  },
  stageTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
    flexShrink: 1,      // allow shrinking
    flexWrap: 'wrap'
  },
  dropdownContent: {
    backgroundColor: '#fff',
    borderColor: '#eee',
    marginBottom: 8,
    padding: 12,
    shadowColor: '#000',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    elevation: 1,
  },

  dropdownTitle: {
    fontWeight: 'semibold',
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },

  dropdownTopicsLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#555',
    marginBottom: 10,
  },
  dropdownDescription: {
    fontSize: 14, 
    color: '#666',
    marginBottom: 10,
  },
  dropdownTopicItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 10,
    paddingHorizontal: 14,
    backgroundColor: '#fff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginBottom: 8,
    elevation: 2, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },

  dropdownTopicItemTitle: {
    fontSize: 14,
    color: '#4C43AE',
  }
  });




