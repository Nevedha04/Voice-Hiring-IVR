import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Volume2 } from 'lucide-react-native';
import Colors from '@/constants/colors';

interface VoicePromptProps {
  message: string;
  isActive?: boolean;
}

export default function VoicePrompt({ message, isActive = true }: VoicePromptProps) {
  const [animation] = useState(new Animated.Value(0));
  
  useEffect(() => {
    if (isActive) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(animation, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(animation, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      animation.setValue(0);
    }
    
    return () => {
      animation.setValue(0);
    };
  }, [isActive, message]);

  const opacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0.5, 1],
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.iconContainer, { opacity }]}>
        <Volume2 size={24} color={Colors.primary} />
      </Animated.View>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    marginVertical: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  iconContainer: {
    marginRight: 12,
  },
  message: {
    color: Colors.text,
    fontSize: 16,
    flex: 1,
    lineHeight: 24,
  },
});