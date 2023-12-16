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

  // windows api ip: 192.168.29.226
  // 506 ip: 192.168.0.111

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerBlock1}>
          <Image
            source={require("./assets/revanth-sir.jpg")}
            style={styles.pic}
            resizeMode="contain"
          />
          <Image
            source={require("./assets/mallu-sir.jpeg")}
            style={styles.pic}
            resizeMode="contain"
          />
          <Image
            source={require("./assets/damodar-sir.jpeg")}
            style={styles.pic}
            resizeMode="contain"
          />
        </View>
        <View style={styles.headerBlock2}>
          <Image
            source={require("./assets/logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <Image
            source={require("./assets/nam.jpeg")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
      </View>
      <NavigationContainer style={styles.container}>
        <AppNavigator />
        <StatusBar hidden={true} />
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 170,
    backgroundColor: "#2E475D",
    paddingHorizontal: 20,
  },
  headerBlock1: {
    flexDirection: "row",
  },
  headerBlock2: {
    flexDirection: "row",
  },
  logo: {
    width: 90,
    height: 90,
    marginRight: 10,
  },
  pic: {
    width: 120,
    height: 120,
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
