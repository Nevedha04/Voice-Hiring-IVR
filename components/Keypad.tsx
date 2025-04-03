import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Colors from '@/constants/colors';

interface KeypadProps {
  onKeyPress: (key: string) => void;
  disabled?: boolean;
}

export default function Keypad({ onKeyPress, disabled = false }: KeypadProps) {
  const keys = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['*', '0', '#']
  ];

  const handleKeyPress = (key: string) => {
    if (!disabled) {
      onKeyPress(key);
    }
  };

  return (
    <View style={styles.container}>
      {keys.map((row, rowIndex) => (
        <View key={`row-${rowIndex}`} style={styles.row}>
          {row.map((key) => (
            <Pressable
              key={key}
              style={({ pressed }) => [
                styles.key,
                pressed && !disabled && styles.keyPressed,
                disabled && styles.keyDisabled
              ]}
              onPress={() => handleKeyPress(key)}
              disabled={disabled}
            >
              <Text style={[styles.keyText, disabled && styles.keyTextDisabled]}>{key}</Text>
            </Pressable>
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 16,
    backgroundColor: Colors.surface,
    borderRadius: 12,
    marginVertical: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  key: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: Colors.keypad,
    justifyContent: 'center',
    alignItems: 'center',
  },
  keyPressed: {
    backgroundColor: Colors.keypadPressed,
  },
  keyDisabled: {
    opacity: 0.5,
  },
  keyText: {
    fontSize: 24,
    color: Colors.text,
    fontWeight: 'bold',
  },
  keyTextDisabled: {
    color: Colors.textSecondary,
  },
});