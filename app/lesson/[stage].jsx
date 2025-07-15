import { miniGameMap } from '@/components/mini-games/map';
import Header from '@/components/ui/header';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { coding_lessons, digital_literacy_lessons } from '../data/lessons';

export default function LessonDetail() {
  const { stage, type } = useLocalSearchParams();
  const router = useRouter();
  const [headerHeight, setHeaderHeight] = useState(60); // fallback value

  // Find the lesson from static data (future: fetch from backend)
  const lessons = type === 'Coding' ? coding_lessons : digital_literacy_lessons;
  const lesson = lessons.find(l => l.stage === stage);
  const lessonIndex = lessons.findIndex(l => l.stage === stage);
  const hasNextLesson = lessonIndex < lessons.length - 1;
  const nextLesson = hasNextLesson ? lessons[lessonIndex + 1] : null;

  if (!lesson) {
    return (
      <View style={styles.centered}>
        <Text style={styles.notFound}>Lesson not found.</Text>
      </View>
    );
  }

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedTopicIndex, setSelectedTopicIndex] = useState(null);
  const [stageIndex, setStageIndex] = useState(0);
  // Quiz state
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [showCompletion, setShowCompletion] = useState(false);

  // Reset quiz state when stage/topic changes
  React.useEffect(() => {
    setSelectedAnswer(null);
    setIsCorrect(null);
  }, [stageIndex, selectedTopic]);

  // Helper to open a topic modal
  const openTopicModal = (topic, idx) => {
    setSelectedTopic(topic);
    setSelectedTopicIndex(idx);
    setStageIndex(0);
    setModalVisible(true);
  };

  // Helper to render the current stage
  const renderStage = (stage) => {
    if (!stage) return null;
    switch (stage.type) {
      case 'lecture':
        return (
          <View>
            <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 8 }}>Lecture</Text>
            <Text style={{ fontSize: 16, marginBottom: 8 }}>{stage.content.text}</Text>
            <Text style={{ fontStyle: 'italic', color: '#6C63FF' }}>Trivia: {stage.content.trivia}</Text>
          </View>
        );
      case 'quiz': {
        const q = stage.content.questions[0];
        return (
          <View>
            <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 8 }}>Quiz</Text>
            <Text style={{ fontSize: 16, marginBottom: 12 }}>{q.question}</Text>
            {q.options.map((opt, j) => {
              let bg = '#f5f5fa';
              let color = '#4C43AE';
              if (selectedAnswer !== null) {
                if (opt === q.answer) bg = '#b6e7c9'; // correct = green
                if (opt === selectedAnswer && opt !== q.answer) bg = '#f7b6b6'; // wrong = red
                if (opt === selectedAnswer && opt === q.answer) color = '#228B22';
                if (opt === selectedAnswer && opt !== q.answer) color = '#B22222';
              }
              return (
                <Pressable
                  key={j}
                  onPress={() => {
                    if (selectedAnswer === null) {
                      setSelectedAnswer(opt);
                      setIsCorrect(opt === q.answer);
                    }
                  }}
                  style={{
                    backgroundColor: bg,
                    borderRadius: 8,
                    padding: 12,
                    marginBottom: 8,
                    borderWidth: 1,
                    borderColor: selectedAnswer === opt ? '#6C63FF' : '#eee',
                  }}
                  disabled={selectedAnswer !== null}
                >
                  <Text style={{ color, fontSize: 16 }}>{opt}</Text>
                </Pressable>
              );
            })}
            {selectedAnswer !== null && (
              <Text style={{ marginTop: 8, color: isCorrect ? '#228B22' : '#B22222', fontWeight: 'bold' }}>
                {isCorrect ? 'Correct!' : 'Incorrect.'}
              </Text>
            )}
          </View>
        );
      }
      case 'recap':
        return (
          <View>
            <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 8 }}>Recap</Text>
            <Text style={{ fontSize: 16 }}>{stage.content.summary}</Text>
          </View>
        );
      case 'game': {
        const GameComponent = miniGameMap[stage.content.file];
        return (
          <View>
            <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 8 }}>Game</Text>
            {GameComponent ? (
              <GameComponent />
            ) : (
              <Text style={{ fontSize: 16, color: '#B22222' }}>Game not found or not implemented yet.</Text>
            )}
          </View>
        );
      }
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <Header onLayout={e => setHeaderHeight(e.nativeEvent.layout.height)} />
        {headerHeight > 0 && (
          <ScrollView contentContainerStyle={[styles.container, { paddingTop: headerHeight }]}> 
            <Text style={styles.title}>{lesson.stage}</Text>
            <Text style={styles.description}>{lesson.description}</Text>
            <Text style={styles.sectionTitle}>Topics</Text>
            {lesson.topics?.map((topic, i) => (
              <Pressable
                key={i}
                style={styles.topicCard}
                onPress={() => openTopicModal(topic, i)}
              >
                <Text style={styles.topicTitle}>{topic.title}</Text>
                <Text style={styles.topicDescription}>{topic.description}</Text>
              </Pressable>
            ))}
            {/* Topic Stage Modal */}
            <Modal
              visible={modalVisible}
              animationType="slide"
              transparent={true}
              onRequestClose={() => setModalVisible(false)}
            >
              <View style={styles.modalOverlay}>
                <SafeAreaView style={styles.modalContent} edges={['top', 'bottom']}>
                  {/* Topic progress */}
                  {selectedTopicIndex !== null && (
                    <Text style={{ color: '#888', fontSize: 13, marginBottom: 6 }}>
                      Topic {selectedTopicIndex + 1} of {lesson.topics.length}
                    </Text>
                  )}
                  {/* Stage progress bar */}
                  {selectedTopic && selectedTopic.stages && (
                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 12 }}>
                      {selectedTopic.stages.map((s, idx) => (
                        <View
                          key={idx}
                          style={{
                            paddingVertical: 4,
                            paddingHorizontal: 12,
                            borderRadius: 16,
                            marginHorizontal: 4,
                            backgroundColor: idx === stageIndex ? '#6C63FF' : '#eee',
                          }}
                        >
                          <Text style={{
                            color: idx === stageIndex ? '#fff' : '#6C63FF',
                            fontWeight: idx === stageIndex ? 'bold' : 'normal',
                            fontSize: 13,
                            textTransform: 'capitalize'
                          }}>
                            {s.type}
                          </Text>
                        </View>
                      ))}
                    </View>
                  )}
                  {selectedTopic && selectedTopic.stages && selectedTopic.stages[stageIndex] ? (
                    <>
                      {renderStage(selectedTopic.stages[stageIndex])}
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 24 }}>
                        <Pressable
                          onPress={() => setModalVisible(false)}
                          style={{ padding: 8 }}
                        >
                          <Text style={{ color: '#FF5A5F', fontWeight: 'bold' }}>Close</Text>
                        </Pressable>
                        {stageIndex < selectedTopic.stages.length - 1 ? (
                          <Pressable
                            onPress={() => setStageIndex(stageIndex + 1)}
                            style={{ padding: 8 }}
                            disabled={selectedTopic.stages[stageIndex].type === 'quiz' && selectedAnswer === null}
                          >
                            <Text style={{ color: '#6C63FF', fontWeight: 'bold', opacity: selectedTopic.stages[stageIndex].type === 'quiz' && selectedAnswer === null ? 0.5 : 1 }}>
                              Next
                            </Text>
                          </Pressable>
                        ) : (
                          <Pressable
                            onPress={() => {
                              // If not last topic, open next topic modal
                              if (selectedTopicIndex < lesson.topics.length - 1) {
                                openTopicModal(lesson.topics[selectedTopicIndex + 1], selectedTopicIndex + 1);
                              } else {
                                setModalVisible(false);
                                setShowCompletion(true);
                                // Removed setTimeout to auto-hide overlay
                              }
                            }}
                            style={{ padding: 8 }}
                          >
                            <Text style={{ color: '#6C63FF', fontWeight: 'bold' }}>
                              {selectedTopicIndex < lesson.topics.length - 1 ? 'Proceed to Next Topic' : 'Finish Lesson'}
                            </Text>
                          </Pressable>
                        )}
                      </View>
                    </>
                  ) : (
                    <>
                      <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 8 }}>Topic</Text>
                      <Text style={{ fontSize: 16 }}>No stages for this topic yet.</Text>
                      <Pressable onPress={() => setModalVisible(false)} style={{ marginTop: 18 }}>
                        <Text style={{ color: '#6C63FF', fontWeight: 'bold', fontSize: 15 }}>Close</Text>
                      </Pressable>
                    </>
                  )}
                </SafeAreaView>
              </View>
            </Modal>
          </ScrollView>
        )}
        {/* Lesson Complete Message - moved outside ScrollView */}
        {showCompletion && (
          <View style={styles.completionOverlay} pointerEvents="box-none">
            <View style={styles.completionBox}>
              <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#6C63FF', marginBottom: 8, textAlign: 'center' }}>🎉 Lesson Complete! 🎉</Text>
              <Text style={{ fontSize: 16, color: '#333', marginBottom: 18, textAlign: 'center' }}>Great job finishing all topics!</Text>
              {/* Summary of what was learned */}
              <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#222', marginBottom: 8, textAlign: 'center' }}>Summary:</Text>
              <ScrollView style={{ marginBottom: 16, maxHeight: 180, width: '100%' }} contentContainerStyle={{ paddingHorizontal: 4 }}>
                {lesson.topics.map((topic, i) => (
                  <View key={i} style={{ marginBottom: 10 }}>
                    <Text style={{ fontWeight: 'bold', color: '#4C43AE', fontSize: 15 }}>{topic.title}</Text>
                    <Text style={{ color: '#555', fontSize: 14 }}>
                      {topic.stages?.find(s => s.type === 'recap')?.content.summary || topic.description}
                    </Text>
                  </View>
                ))}
              </ScrollView>
              {hasNextLesson && (
                <Pressable
                  style={{ backgroundColor: '#6C63FF', borderRadius: 8, paddingVertical: 10, paddingHorizontal: 20, marginBottom: 12, width: '100%' }}
                  onPress={() => {
                    setShowCompletion(false);
                    router.replace({
                      pathname: '/lesson/[stage]',
                      params: { stage: nextLesson.stage, type },
                    });
                  }}
                >
                  <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16, textAlign: 'center' }}>Proceed to Next Lesson</Text>
                </Pressable>
              )}
              <Pressable
                style={{ borderColor: '#6C63FF', borderWidth: 2, borderRadius: 8, paddingVertical: 10, paddingHorizontal: 20, width: '100%' }}
                onPress={() => {
                  setShowCompletion(false);
                  router.replace('/(tabs)/fun');
                }}
              >
                <Text style={{ color: '#6C63FF', fontWeight: 'bold', fontSize: 16, textAlign: 'center' }}>Back to Fun Section</Text>
              </Pressable>
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#4C43AE',
  },
  description: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#222',
  },
  topicCard: {
    backgroundColor: '#f5f5fa',
    borderRadius: 10,
    padding: 16,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
  },
  topicTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6C63FF',
    marginBottom: 4,
  },
  topicDescription: {
    fontSize: 14,
    color: '#444',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  notFound: {
    fontSize: 18,
    color: '#FF5A5F',
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    width: 320,
    maxWidth: '90%',
  },
  completionOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  completionBox: {
    backgroundColor: '#fff',
    borderRadius: 18,
    paddingVertical: 28,
    paddingHorizontal: 18,
    alignItems: 'stretch',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    width: 340,
    maxWidth: '95%',
  },
}); 