import React, { useState } from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const ForgetPasswordScreen: React.FC = () => {
  const router = useRouter();
  const [input, setInput] = useState<string>('');
  const [isInputFocused, setIsInputFocused] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Back Button */}
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#007AFF" />
        </TouchableOpacity>

        {/* Title */}
        <Text style={styles.title}>Forgot Password</Text>

        {/* Subtitle */}
        <Text style={styles.subtitle}>Enter your Email ID or Mobile Number</Text>

        {/* Input Field */}
        <TextInput
          style={[styles.input, isInputFocused && styles.inputFocused]}
          placeholder="Email / Mobile number"
          placeholderTextColor="#7B8BB2"
          value={input}
          onChangeText={setInput}
          keyboardType="email-address"
          autoCapitalize="none"
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setIsInputFocused(false)}
        />

        {/* Continue Button */}
        <TouchableOpacity
          style={[styles.button, !input.trim() && styles.buttonDisabled]}
          onPress={() => input.trim() && router.push('/enterOtp')}
          disabled={!input.trim()}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ForgetPasswordScreen;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  container: {
    flex: 1,
    paddingHorizontal: 24, 
    backgroundColor: '#fff',
  },
  backButton: {
    marginBottom: 16,
    alignSelf: "flex-start",
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#007AFF',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#7B8BB2',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 22,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 14,
    color: '#000',
    backgroundColor: '#f9f9f9',
    marginBottom: 24,
  },
  inputFocused: {
    backgroundColor: '#fff',
    borderColor: '#007AFF',
  },
  button: {
    backgroundColor: '#007AFF',
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 5,
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
    shadowOpacity: 0,
    elevation: 0,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
