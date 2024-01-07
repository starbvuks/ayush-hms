import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { handleSignIn } from "../../api/login/login";

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const apiIp = process.env.EXPO_PUBLIC_API_URL;

  const onSignIn = async () => {
    await handleSignIn(username, password, apiIp, navigation);
  };

  // const handleSignIn2 = () => {
  //   navigation.navigate("Main");
  // };

  const handleAdminRoute = () => {
    navigation.navigate("Admin Login");
  };

  return (
    <View style={styles.container}>
      {/* Ayush HMS screen */}
      <View style={styles.hmsContainer}>
        <Text style={styles.hmsTitle}>Ayush HMS</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>User ID</Text>
          <TextInput style={styles.input} onChangeText={setUsername} />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Password</Text>
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            onChangeText={setPassword}
          />
        </View>
        <TouchableOpacity style={styles.signInButton} onPress={onSignIn}>
          <Text style={styles.buttonText}>SIGN IN</Text>
        </TouchableOpacity>
        <Text style={styles.footerText}>
          Are you an admin?{" "}
          <TouchableOpacity onPress={handleAdminRoute}>
            <Text style={styles.linkText}>Login Here</Text>
          </TouchableOpacity>
        </Text>
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
    fontFamily: "DM-Sans-Bold",
    fontSize: 38,
    marginBottom: 50,
  },
  adminContainer: {
    flex: 1,
    padding: 30,
    justifyContent: "center",
  },
  adminTitle: {
    fontFamily: "DM-Sans-Bold",
    fontSize: 38,
    marginBottom: 50,
  },
  inputContainer: {
    marginBottom: 30,
    borderBottomWidth: 1.5,
    borderBottomColor: "#ddd",
  },
  inputLabel: {
    fontFamily: "DM-Sans-Regular",
    fontSize: 20,
    marginBottom: 15,
  },
  input: {
    fontFamily: "DM-Sans-Regular",
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
    fontFamily: "DM-Sans-Bold",
    fontSize: 20,
    color: "#fff",
  },
  footerText: {
    fontFamily: "DM-Sans-Regular",
    fontSize: 18,
    textAlign: "center",

    marginTop: 5,
  },
  footerText2: {
    fontFamily: "DM-Sans-Regular",
    fontSize: 18,
    textAlign: "center",
    marginTop: 10,
  },
  linkText: {
    fontFamily: "DM-Sans-Regular",
    fontSize: 18,
    color: "#4A90E2",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  rememberText: {
    fontFamily: "DM-Sans-Regular",
    fontSize: 18,
    marginLeft: 15,
  },
  forgotPassword: {
    fontFamily: "DM-Sans-Regular",
    fontSize: 18,
    marginLeft: "auto",
  },
});
