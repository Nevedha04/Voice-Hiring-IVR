import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useIVRStore } from './../../store/ivr-store';
import CallButton from './../../components/CallButton';
import CallHeader from './../../components/CallHeader';
import VoicePrompt from './../../components/VoicePrompt';
import Keypad from './../../components/Keypad';
import LanguageOption from './../../components/LanguageOption';
import JobOption from './../../components/JobOption'
import { languages } from '@/constants/languages';
import { jobs } from '@/constants/jobs';
import Colors from '@/constants/colors';

export default function IVRScreen() {
  const { 
    stage, 
    isCallActive, 
    selectedLanguage, 
    selectedJob, 
    error,
    startCall, 
    endCall, 
    selectLanguage, 
    selectJob, 
    setStage 
  } = useIVRStore();
  
  const [callDuration, setCallDuration] = useState(0);
  
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (isCallActive) {
      timer = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    } else {
      setCallDuration(0);
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isCallActive]);
  
  const handleKeyPress = (key: string) => {
    const numKey = parseInt(key, 10);
    
    if (isNaN(numKey)) return;
    
    if (stage === 'welcome') {
      setStage('language');
    } else if (stage === 'language') {
      if (numKey >= 1 && numKey <= languages.length) {
        selectLanguage(numKey);
      }
    } else if (stage === 'job') {
      selectJob(numKey);
    }
  };
  
  const renderContent = () => {
    if (!isCallActive) {
      return (
        <View style={styles.startCallContainer}>
          <Text style={styles.startCallTitle}>Voice Hiring IVR</Text>
          <Text style={styles.startCallSubtitle}>
            Tap the call button below to start the voice hiring process
          </Text>
          <CallButton onPress={startCall} label="Start Call" />
        </View>
      );
    }
    
    switch (stage) {
      case 'welcome':
        return (
          <>
            <VoicePrompt message="Welcome to Voice Hiring for illiterate job seekers. Please select your language by pressing a number." />
            <Text style={styles.instructionText}>Press any key to continue</Text>
            <Keypad onKeyPress={handleKeyPress} />
          </>
        );
        
      case 'language':
        return (
          <>
            <VoicePrompt message="Please select your preferred language by pressing the corresponding number." />
            <ScrollView style={styles.optionsContainer}>
              {languages.map(language => (
                <LanguageOption
                  key={language.id}
                  id={language.id}
                  name={language.name}
                  code={language.code}
                  onSelect={selectLanguage}
                />
              ))}
            </ScrollView>
            <Keypad onKeyPress={handleKeyPress} />
          </>
        );
        
      case 'job':
        return (
          <>
            <VoicePrompt message={`You selected ${languages.find(l => l.id === selectedLanguage)?.name}. Now please select a job category by pressing the corresponding number.`} />
            <ScrollView style={styles.optionsContainer}>
              {jobs.map(job => (
                <JobOption
                  key={job.id}
                  id={job.id}
                  title={job.title}
                  icon={job.icon}
                  onSelect={selectJob}
                />
              ))}
            </ScrollView>
            <Keypad onKeyPress={handleKeyPress} />
          </>
        );
        
      case 'confirmation':
        const selectedJobTitle = jobs.find(j => j.id === selectedJob)?.title;
        return (
          <>
            <VoicePrompt message={`Thank you for calling. Your details have been updated for ${selectedJobTitle}. Employers will contact you soon.`} />
            <View style={styles.confirmationContainer}>
              <Text style={styles.confirmationTitle}>Registration Successful</Text>
              <View style={styles.confirmationDetails}>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Language:</Text>
                  <Text style={styles.detailValue}>{languages.find(l => l.id === selectedLanguage)?.name}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Job Category:</Text>
                  <Text style={styles.detailValue}>{selectedJobTitle}</Text>
                </View>
              </View>
              <Text style={styles.confirmationMessage}>
                Your information has been registered in our system. Potential employers will contact you soon.
              </Text>
            </View>
          </>
        );
        
      case 'error':
        return (
          <>
            <VoicePrompt message={error || "Invalid number pressed. Please try again."} />
            <View style={styles.errorContainer}>
              <Text style={styles.errorTitle}>Error</Text>
              <Text style={styles.errorMessage}>{error || "Invalid number pressed"}</Text>
              <CallButton onPress={() => setStage('welcome')} label="Try Again" />
            </View>
          </>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <CallHeader duration={callDuration} />
      <View style={styles.content}>
        {renderContent()}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  startCallContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  startCallTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 16,
    textAlign: 'center',
  },
  startCallSubtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 32,
  },
  instructionText: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginVertical: 16,
  },
  optionsContainer: {
    flex: 1,
    marginBottom: 16,
  },
  confirmationContainer: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 20,
    marginVertical: 16,
    borderWidth: 1,
    borderColor: Colors.success,
  },
  confirmationTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.success,
    marginBottom: 16,
    textAlign: 'center',
  },
  confirmationDetails: {
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 16,
    color: Colors.textSecondary,
    width: 120,
  },
  detailValue: {
    fontSize: 16,
    color: Colors.text,
    fontWeight: '500',
    flex: 1,
  },
  confirmationMessage: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
  errorContainer: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 20,
    marginVertical: 16,
    borderWidth: 1,
    borderColor: Colors.error,
    alignItems: 'center',
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.error,
    marginBottom: 16,
  },
  errorMessage: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginBottom: 24,
    textAlign: 'center',
  },
});