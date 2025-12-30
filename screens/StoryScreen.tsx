import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions, Pressable } from 'react-native';

export interface Story {
  id: string;
  text: string;
}

interface StoryScreenProps {
  stories?: Story[];
  onClose: () => void;
}

const defaultStories: Story[] = [
  { id: '1', text: 'Esto es una historia de prueba!!!' },
];

const gradients: [string, string][] = [
  ['#FF6B6B', '#FFE66D'],
  ['#6A82FB', '#FC5C7D'],
  ['#00F260', '#0575E6'],
  ['#FF512F', '#DD2476'],
];

const STORY_DURATION = 10 * 1000;
const { width, height } = Dimensions.get('window');

const StoryScreen: React.FC<StoryScreenProps> = ({ stories = defaultStories, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const progress = useRef(new Animated.Value(0)).current;
  const textScale = useRef(new Animated.Value(1)).current;
  const animGradient = useRef(new Animated.Value(0)).current;

  const [currentGradient, setCurrentGradient] = useState<[string, string]>(
    gradients[Math.floor(Math.random() * gradients.length)]
  );
  const [nextGradient, setNextGradient] = useState<[string, string]>(currentGradient);

  const startStoryAnimation = () => {
    progress.setValue(0);
    Animated.timing(progress, {
      toValue: 1,
      duration: STORY_DURATION,
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (finished) goToNextStory();
    });

    textScale.setValue(1);
    Animated.loop(
      Animated.sequence([
        Animated.timing(textScale, { toValue: 1.05, duration: 800, useNativeDriver: true }),
        Animated.timing(textScale, { toValue: 1, duration: 800, useNativeDriver: true }),
      ])
    ).start();

    animGradient.setValue(0);
    Animated.timing(animGradient, {
      toValue: 1,
      duration: STORY_DURATION,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    if (!stories || stories.length === 0) {
      onClose();
      return;
    }

    startStoryAnimation();
  }, [currentIndex]);

  if (!stories || stories.length === 0) return null;

  const goToNextStory = () => {
    if (currentIndex < stories.length - 1) {
      setCurrentGradient(nextGradient);
      const newGradient = gradients[Math.floor(Math.random() * gradients.length)];
      setNextGradient(newGradient);
      setCurrentIndex(currentIndex + 1);
    } else {
      onClose();
    }
  };

  const goToPreviousStory = () => {
    if (currentIndex > 0) {
      setCurrentGradient(nextGradient);
      const newGradient = gradients[Math.floor(Math.random() * gradients.length)];
      setNextGradient(newGradient);
      setCurrentIndex(currentIndex - 1);
    }
  };

  const story = stories[currentIndex];

  const backgroundColor = animGradient.interpolate({
    inputRange: [0, 1],
    outputRange: [currentGradient[0], nextGradient[0]],
  });

  const backgroundColor2 = animGradient.interpolate({
    inputRange: [0, 1],
    outputRange: [currentGradient[1], nextGradient[1]],
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[StyleSheet.absoluteFill, { backgroundColor }]} />
      <Animated.View style={[StyleSheet.absoluteFill, { backgroundColor: backgroundColor2, opacity: 0.5 }]} />

      <View style={[styles.topBar, { top: 10 }]}> {/* Moved progress bar more up */}
        <View style={styles.progressContainer}>
          {stories.map((s, index) => {
            const widthAnim =
              index === currentIndex
                ? progress.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] })
                : index < currentIndex
                ? '100%'
                : '0%';
            return (
              <View key={s.id} style={styles.progressBackground}>
                <Animated.View style={[styles.progressBar, { width: widthAnim }]} />
              </View>
            );
          })}
        </View>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeText}>✕</Text>
        </TouchableOpacity>
      </View>

      <Pressable
        style={StyleSheet.absoluteFill}
        onPress={({ nativeEvent }) => {
          const x = nativeEvent.locationX;
          if (x > width / 2) {
            goToNextStory();
          } else {
            goToPreviousStory();
          }
        }}
      >
        <View style={styles.content}>
          <Animated.Text style={[styles.storyText, { transform: [{ scale: textScale }] }]}>
            {story.text}
          </Animated.Text>
        </View>
      </Pressable>
    </View>
  );
};

export default StoryScreen;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    width,
    height,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  topBar: {
    position: 'absolute',
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  progressContainer: { flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginRight: 10 },
  progressBackground: { flex: 1, height: 3, backgroundColor: 'rgba(255,255,255,0.3)', marginHorizontal: 2, borderRadius: 2 },
  progressBar: { height: 3, backgroundColor: '#fff', borderRadius: 2 },
  closeButton: { padding: 5 },
  closeText: { fontSize: 22, fontWeight: 'bold', color: '#fff' },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 },
  storyText: { fontSize: 26, fontWeight: '700', color: '#fff', textAlign: 'center' },
});
