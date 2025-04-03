import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Globe } from 'lucide-react-native';
import Colors from '@/constants/colors';

interface LanguageOptionProps {
  id: number;
  name: string;
  code: string;
  onSelect: (id: number) => void;
}

export default function LanguageOption({ id, name, code, onSelect }: LanguageOptionProps) {
  return (
    <Pressable 
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
      onPress={() => onSelect(id)}
    >
      <View style={styles.iconContainer}>
        <Globe size={24} color={Colors.primary} />
        <Text style={styles.keyNumber}>{id}</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.code}>{code.toUpperCase()}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  pressed: {
    backgroundColor: Colors.keypadPressed,
    borderColor: Colors.primary,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.keypad,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    position: 'relative',
  },
  keyNumber: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    backgroundColor: Colors.primary,
    width: 20,
    height: 20,
    borderRadius: 10,
    textAlign: 'center',
    color: Colors.text,
    fontSize: 12,
    fontWeight: 'bold',
    lineHeight: 20,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: '500',
  },
  code: {
    color: Colors.textSecondary,
    fontSize: 12,
    marginTop: 4,
  },
});