import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useState, useRef } from "react";
// Removed duplicate TextInput import; use the TextInput that's already imported above for refs/typing
import { Ionicons } from '@expo/vector-icons';

export default function EnterOtp() {
  const router = useRouter();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [focused, setFocused] = useState([false, false, false, false]);
  const inputRefs = useRef<(TextInput | null)[]>([]);

  const handleOtpChange = (text: string, index: number) => {
    if (text.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    if (text && index < 3) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0)
      inputRefs.current[index - 1]?.focus();
  };

  const isValid = otp.every(digit => digit !== "");

  const resendOtp = () => {
    Alert.alert("OTP resent to your registered Email/Phone number", "", [{ text: "OK" }]);
    setOtp(["", "", "", ""]);
    inputRefs.current[0]?.focus();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#007AFF" />
        </TouchableOpacity>

        <Text style={styles.title}>Enter OTP</Text>
        <Text style={styles.subtitle}>
          Enter the OTP code sent to your registered Email/Phone number
        </Text>

        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => { inputRefs.current[index] = ref || null; }}
              style={[
                styles.otpInput,
                (digit || focused[index]) && styles.otpInputFocused,
              ]}
              value={digit}
              onChangeText={(text) => handleOtpChange(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              keyboardType="numeric"
              maxLength={1}
              textAlign="center"
              selectionColor="#007AFF"
              onFocus={() => setFocused((prev) => prev.map((f, i) => i === index))}
              onBlur={() => setFocused([false, false, false, false])}
            />
          ))}
        </View>

        <TouchableOpacity
          style={[styles.button, !isValid && styles.disabledButton]}
          onPress={() => isValid && router.push("/resetPassword")}
          disabled={!isValid}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Reset Password</Text>
        </TouchableOpacity>

        <View style={styles.resendContainer}>
          <Text style={styles.resendTextRegular}>Didn't get OTP? </Text>
          <TouchableOpacity onPress={resendOtp} activeOpacity={0.7}>
            <Text style={styles.resendTextLink}>Resend OTP</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#fff" },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    backgroundColor: "#fff",
  },
  backButton: {
    marginBottom: 16,
    alignSelf: "flex-start",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#007AFF",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: "#7B8BB2",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 40,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  otpInput: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    fontSize: 24,
    fontWeight: "600",
    color: "#007AFF",
    backgroundColor: "#fff",
  },
  otpInputFocused: { borderColor: "#007AFF" },
  button: {
    backgroundColor: "#007AFF",
    height: 48,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#007AFF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 5,
  },
  disabledButton: { backgroundColor: "#ccc", shadowOpacity: 0, elevation: 0 },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "600" },
  resendContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
  },
  resendTextRegular: { fontSize: 14, color: "#374151" },
  resendTextLink: {
    fontSize: 14,
    color: "#007AFF",
    textDecorationLine: "underline",
    fontWeight: "500",
  },
});
