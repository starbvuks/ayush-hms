import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import {
  useFonts,
  DMSans_400Regular,
  DMSans_700Bold,
} from "@expo-google-fonts/dm-sans";

export default function AdminLogin({ navigation }) {
  let [fontsLoaded] = useFonts({
    DMSans_400Regular,
    DMSans_700Bold,
  });

  if (!fontsLoaded) {
    return <View />;
  }

  const handleAdminRoute = () => {
    navigation.navigate("Dispensary Dashboard");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.adminTitle}>Admin Login</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Account</Text>
        <TextInput style={styles.input} placeholder="xyz" />
      </View>

      <View style={styles.passwordContainer}>
        <Text style={styles.inputLabel}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="••••••••••"
          secureTextEntry={true}
        />
        <MaterialCommunityIcons
          name="eye-outline"
          size={24}
          color="black"
          style={styles.icon}
        />
      </View>

      <View style={styles.checkboxContainer}>
        <MaterialCommunityIcons
          name="checkbox-blank-outline"
          size={24}
          color="black"
        />
        <Text style={styles.rememberText}>Remember me</Text>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </View>

      <TouchableOpacity style={styles.signInButton} onPress={handleAdminRoute}>
        <Text style={styles.buttonText}>SIGN IN</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20 * (2560 / 1600),
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  adminTitle: {
    fontFamily: "DMSans_700Bold",
    fontSize: 30 * (2560 / 1600),
    marginBottom: 40 * (2560 / 1600),
    alignSelf: "center",
  },
  inputContainer: {
    marginBottom: 20 * (2560 / 1600),
  },
  passwordContainer: {
    marginBottom: 20 * (2560 / 1600),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  inputLabel: {
    fontFamily: "DMSans_400Regular",
    fontSize: 16 * (2560 / 1600),
    marginBottom: 10 * (2560 / 1600),
  },
  input: {
    fontFamily: "DMSans_400Regular",
    fontSize: 16 * (2560 / 1600),
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    flex: 1,
  },
  icon: {
    marginLeft: 10,
  },
  signInButton: {
    backgroundColor: "#4A90E2",
    padding: 15 * (2560 / 1600),
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 20 * (2560 / 1600),
  },
  buttonText: {
    fontFamily: "DMSans_700Bold",
    fontSize: 16 * (2560 / 1600),
    color: "#fff",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20 * (2560 / 1600),
  },
  rememberText: {
    fontFamily: "DMSans_400Regular",
    fontSize: 14 * (2560 / 1600),
    marginLeft: 10,
  },
  forgotPassword: {
    fontFamily: "DMSans_400Regular",
    fontSize: 14 * (2560 / 1600),
    marginLeft: "auto",
    color: "#4A90E2",
  },
});
