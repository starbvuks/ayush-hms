import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import {
  useFonts,
  DMSans_400Regular,
  DMSans_700Bold,
} from "@expo-google-fonts/dm-sans";

export default function LoginScreen({ navigation }) {
  let [fontsLoaded] = useFonts({
    DMSans_400Regular,
    DMSans_700Bold,
  });

  if (!fontsLoaded) {
    return <View />;
  }

  const handleSignIn = () => {
    navigation.navigate("Main");
  };

  const handleAdminRoute = () => {
    navigation.navigate("Admin Login");
  };

  return (
    <View style={styles.container}>
      {/* Ayush HMS screen */}
      <View style={styles.hmsContainer}>
        <Text style={styles.hmsTitle}>Ayush HMS</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Dispensary ID</Text>
          <TextInput style={styles.input} placeholder="example-id" />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="••••••••••"
            secureTextEntry={true}
          />
        </View>
        <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
          <Text style={styles.buttonText}>SIGN IN</Text>
        </TouchableOpacity>
        <Text style={styles.footerText}>
          Are you an admin? <Text style={styles.linkText}>Login Here</Text>
        </Text>
        <Text style={styles.footerText2}>
          Need to make a new account?{" "}
          <TouchableOpacity onPress={handleAdminRoute}>
            <Text style={styles.linkText}>Register Here</Text>
          </TouchableOpacity>
        </Text>
        {/* </ImageBackground> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    marginTop: 80,
  },
  hmsContainer: {
    flex: 1,
    padding: 30,
  },
  imageBackground: {
    flex: 1,
    justifyContent: "center",
  },
  hmsTitle: {
    fontFamily: "DMSans_700Bold",
    fontSize: 38,
    marginBottom: 50,
  },
  adminContainer: {
    flex: 1,
    padding: 30,
    justifyContent: "center",
  },
  adminTitle: {
    fontFamily: "DMSans_700Bold",
    fontSize: 38,
    marginBottom: 50,
  },
  inputContainer: {
    marginBottom: 30,
    borderBottomWidth: 1.5,
    borderBottomColor: "#ddd",
  },
  inputLabel: {
    fontFamily: "DMSans_400Regular",
    fontSize: 20,
    marginBottom: 15,
  },
  input: {
    fontFamily: "DMSans_400Regular",
    fontSize: 20,
  },
  signInButton: {
    backgroundColor: "#4A90E2",
    padding: 20,
    borderRadius: 7,
    alignItems: "center",
    marginBottom: 30,
  },
  buttonText: {
    fontFamily: "DMSans_700Bold",
    fontSize: 20,
    color: "#fff",
  },
  footerText: {
    fontFamily: "DMSans_400Regular",
    fontSize: 18,
    textAlign: "center",
  },
  footerText2: {
    fontFamily: "DMSans_400Regular",
    fontSize: 18,
    textAlign: "center",
    marginTop: 10,
  },
  linkText: {
    fontFamily: "DMSans_400Regular",
    fontSize: 18,
    color: "#4A90E2",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  rememberText: {
    fontFamily: "DMSans_400Regular",
    fontSize: 18,
    marginLeft: 15,
  },
  forgotPassword: {
    fontFamily: "DMSans_400Regular",
    fontSize: 18,
    marginLeft: "auto",
  },
});
