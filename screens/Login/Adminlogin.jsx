import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import { handleAdminLogin } from "../../api/login/adminLogin";

export default function AdminLogin({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [userRole, setUserRole] = useState(null);

  const apiIp = process.env.EXPO_PUBLIC_API_URL;

  const onAdminLogin = async () => {
    await handleAdminLogin(username, password, apiIp, navigation);
  };

  const handleAdminLogin2 = () => {
    navigation.navigate("Admin");
  };

  const handleAdminRoute = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <View style={styles.hmsContainer}>
        <Text style={styles.hmsTitle}>Admin Login</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>User ID</Text>
          <TextInput style={styles.input} onChangeText={setUsername} />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Password</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              secureTextEntry={!showPassword}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              style={[
                styles.showPass,
                { position: "absolute", right: 6, bottom: 3 },
              ]}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Text style={styles.showPassText}>
                {showPassword ? (
                  <MaterialCommunityIcons
                    name="eye-off-outline"
                    color="#white"
                    size={30}
                  />
                ) : (
                  <MaterialCommunityIcons
                    name="eye-outline"
                    color="white"
                    size={30}
                  />
                )}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.signInButton} onPress={onAdminLogin}>
          <Text style={styles.buttonText}>SIGN IN</Text>
        </TouchableOpacity>
        <Text style={styles.footerText}>
          Back to Employee Login?{" "}
          <TouchableOpacity onPress={handleAdminRoute}>
            <Text style={styles.linkText}>Press Here</Text>
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
  showPass: {
    backgroundColor: "#2E475D",
    borderRadius: 4,
  },
  showPassText: {
    color: "white",
    fontFamily: "DM-Sans-Regular",
    padding: 5,
  },
  signInButton: {
    backgroundColor: "#2E475D",
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
