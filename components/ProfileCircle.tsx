import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import StoryScreen, { Story } from '../screens/StoryScreen';

interface ProfileCircleProps {
  initial?: string;
  hasStories?: boolean;
  size?: number;
}

const defaultStories: Story[] = [
  { id: '1', text: 'Esto es una historia de prueba!'},
];

const ProfileCircle: React.FC<ProfileCircleProps> = ({ initial = 'N', hasStories = false, size = 40 }) => {
  const [isStoryOpen, setIsStoryOpen] = useState(false);

  const backgroundColor = '#E5E7EB';
  const borderColor = hasStories ? '#C2185B' : 'transparent';
  const borderWidth = hasStories ? 2 : 0;
  const padding = hasStories ? 2 : 0;

  const handlePress = () => {
    if (hasStories) setIsStoryOpen(true);
  };

  return (
    <>
      <TouchableOpacity onPress={handlePress}>
        <View
          style={[
            styles.outerCircle,
            {
              width: size + padding * 2 + borderWidth * 2,
              height: size + padding * 2 + borderWidth * 2,
              borderRadius: (size + padding * 2 + borderWidth * 2) / 2,
              borderWidth,
              borderColor,
              padding,
            },
          ]}
        >
          <View
            style={[
              styles.innerCircle,
              {
                width: size,
                height: size,
                borderRadius: size / 2,
                backgroundColor,
              },
            ]}
          >
            <Text style={styles.initial}>{initial}</Text>
          </View>
        </View>
      </TouchableOpacity>

      {isStoryOpen && (
        <Modal visible={isStoryOpen} animationType="slide" transparent={false}>
          <StoryScreen
            stories={defaultStories}
            onClose={() => setIsStoryOpen(false)}
          />
        </Modal>
      )}
    </>
  );
};

export default ProfileCircle;

const styles = StyleSheet.create({
  outerCircle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCircle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  initial: {
    color: '#1F2933',
    fontWeight: '600',
    fontSize: 16,
  },
});
