import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Phone } from 'lucide-react-native';
import Colors from '@/constants/colors';

interface CallButtonProps {
  onPress: () => void;
  label?: string;
}

export default function CallButton({ onPress, label = "Call" }: CallButtonProps) {
  return (
    <Pressable 
      style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]} 
      onPress={onPress}
    >
      <Phone size={24} color={Colors.text} />
      <Text style={styles.buttonText}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.callButton,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    gap: 12,
    marginVertical: 16,
  },
  buttonPressed: {
    backgroundColor: '#3A8A3D',
    transform: [{ scale: 0.98 }],
  },
  buttonText: {
    color: Colors.text,
    fontSize: 18,
    fontWeight: 'bold',
  },
});