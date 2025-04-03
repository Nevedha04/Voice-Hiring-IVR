import React from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Phone, Users, Briefcase, HelpCircle, Info } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '@/constants/colors';

export default function HomeScreen() {
  const router = useRouter();

  const navigateToIVR = () => {
    router.push('/ivr');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Voice Hiring</Text>
          <Text style={styles.subtitle}>For Illiterate Job Seekers</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Info size={24} color={Colors.primary} />
            <Text style={styles.cardTitle}>About the Service</Text>
          </View>
          <Text style={styles.cardText}>
            Our voice hiring service helps illiterate job seekers find employment opportunities through a simple phone call. 
            No reading or writing required - just listen and press numbers to navigate.
          </Text>
        </View>

        <Pressable 
          style={({ pressed }) => [styles.callCard, pressed && styles.cardPressed]} 
          onPress={navigateToIVR}
        >
          <Phone size={32} color={Colors.text} />
          <Text style={styles.callCardTitle}>Start Voice Hiring</Text>
          <Text style={styles.callCardSubtitle}>Tap to simulate a call</Text>
        </Pressable>

        <Text style={styles.sectionTitle}>How It Works</Text>
        
        <View style={styles.stepCard}>
          <View style={styles.stepNumber}>
            <Text style={styles.stepNumberText}>1</Text>
          </View>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Call the Service</Text>
            <Text style={styles.stepText}>Dial our number to start the voice hiring process</Text>
          </View>
        </View>
        
        <View style={styles.stepCard}>
          <View style={styles.stepNumber}>
            <Text style={styles.stepNumberText}>2</Text>
          </View>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Select Your Language</Text>
            <Text style={styles.stepText}>Press a number to choose your preferred language</Text>
          </View>
        </View>
        
        <View style={styles.stepCard}>
          <View style={styles.stepNumber}>
            <Text style={styles.stepNumberText}>3</Text>
          </View>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Choose a Job Category</Text>
            <Text style={styles.stepText}>Press a number to select the type of job you're looking for</Text>
          </View>
        </View>
        
        <View style={styles.stepCard}>
          <View style={styles.stepNumber}>
            <Text style={styles.stepNumberText}>4</Text>
          </View>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Get Confirmation</Text>
            <Text style={styles.stepText}>Your details will be registered and employers will contact you</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginLeft: 12,
  },
  cardText: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
  callCard: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    padding: 24,
    marginBottom: 32,
    alignItems: 'center',
  },
  cardPressed: {
    backgroundColor: Colors.primaryDark,
    transform: [{ scale: 0.98 }],
  },
  callCardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  callCardSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 16,
  },
  stepCard: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  stepNumber: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  stepNumberText: {
    color: Colors.text,
    fontSize: 18,
    fontWeight: 'bold',
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 8,
  },
  stepText: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
});