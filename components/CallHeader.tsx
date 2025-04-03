import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Phone, PhoneOff } from 'lucide-react-native';
import { useIVRStore } from '@/store/ivr-store';
import Colors from '@/constants/colors';

interface CallHeaderProps {
  duration?: number;
}

export default function CallHeader({ duration = 0 }: CallHeaderProps) {
  const { isCallActive, endCall } = useIVRStore();
  
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isCallActive) return null;

  return (
    <View style={styles.container}>
      <View style={styles.callInfo}>
        <Phone size={20} color={Colors.success} />
        <Text style={styles.callText}>Voice Hiring Service</Text>
        <Text style={styles.durationText}>{formatDuration(duration)}</Text>
      </View>
      <View style={styles.endCallButton} onTouchEnd={endCall}>
        <PhoneOff size={24} color={Colors.text} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  callInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  callText: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: '500',
  },
  durationText: {
    color: Colors.textSecondary,
    fontSize: 14,
    marginLeft: 8,
  },
  endCallButton: {
    backgroundColor: Colors.endCallButton,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});