import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import AppLoading from "expo-app-loading";

import AppNavigator from "./navigation/AppNavigator";

import {
  useFonts,
  DMSans_400Regular,
  DMSans_700Bold,
} from "@expo-google-fonts/dm-sans";

export default function App() {
  const [fontsLoaded] = useFonts({
    "DM-Sans-Regular": DMSans_400Regular,
    "DM-Sans-Bold": DMSans_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("./assets/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.appName}>Ayush HMS</Text>
      </View>
      <NavigationContainer style={styles.container}>
        <AppNavigator />
        <StatusBar style="auto" />
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 170,
    backgroundColor: "#2E475D",
    paddingHorizontal: 20,
  },
  logo: {
    width: 120,
    height: 120,
    marginRight: 10,
  },
  appName: {
    fontSize: 36,
    fontFamily: "DM-Sans-Bold",
    color: "#FFF",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    fontFamily: "DM-Sans-Regular",
  },
});
