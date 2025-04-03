import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import * as Icons from 'lucide-react-native';
import Colors from '@/constants/colors';

interface JobOptionProps {
  id: number;
  title: string;
  icon: string;
  onSelect: (id: number) => void;
}

export default function JobOption({ id, title, icon, onSelect }: JobOptionProps) {
  // @ts-ignore - Dynamic icon import
  const IconComponent = Icons[icon.charAt(0).toUpperCase() + icon.slice(1)];

  return (
    <Pressable 
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
      onPress={() => onSelect(id)}
    >
      <View style={styles.iconContainer}>
        {IconComponent && <IconComponent size={24} color={Colors.primary} />}
        <Text style={styles.keyNumber}>{id}</Text>
      </View>
      <Text style={styles.title}>{title}</Text>
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
  title: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: '500',
  },
});