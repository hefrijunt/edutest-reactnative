import React, { useEffect } from "react";
import { Text, StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";

// Matikan splash default Expo
SplashScreen.preventAutoHideAsync();

export default function Splash() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(async () => {
      // Sembunyikan splash bawaan Expo
      await SplashScreen.hideAsync();

      // Setelah 3 detik → pindah ke halaman SignIn
      router.replace("/signIn");
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require("../assets/images/logo-edutest.png")}
        style={styles.logo}
      />
      <Text style={styles.text}>EduTest</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
    resizeMode: "contain",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#001A49",
  },
});
