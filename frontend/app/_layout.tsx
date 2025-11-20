import { Stack } from "expo-router";
import { JSX } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  StyleSheet,
    StatusBar,
  Platform,
  View,
} from "react-native";

export default function Layout(): JSX.Element {
  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/* Status bar tampil (jam, sinyal, baterai) */}
        <StatusBar
          barStyle={Platform.OS === "ios" ? "dark-content" : "dark-content"}
          backgroundColor="#fff"
          translucent={false}
        />

        {/* Stack Navigation */}
        <View style={styles.stackContainer}>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="splashScreen" />
            <Stack.Screen name="signIn" />
            <Stack.Screen name="signUp" />
            <Stack.Screen
              name="prior-knowledge"
              options={{ headerShown: false }}
            />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    backgroundColor: "#fff", // warna latar belakang utama
  },
  stackContainer: {
    flex: 1,
  },
});
