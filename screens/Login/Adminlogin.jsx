import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import axios from "axios";

export default function AdminLogin({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userRole, setUserRole] = useState(null);

  const handleAdminLogin = async () => {
    if (username === "" || password === "") {
      alert("Please fill all fields");
      return;
    }

    try {
      console.log("Sending login request...");
      const response = await axios.post(
        "http://192.168.29.226:3000/admin/login",
        {
          username: username,
          password: password,
        }
      );

      console.log("Response:", response);

      const data = response.data;
      console.log("Data:", data);

      if (response.status === 401) {
        alert(data.message);
        return;
      }

      if (data.message === "Logged in successfully") {
        if (data.role === "super_admin" || "zone_admin_1" || "zone_admin_2") {
          setUserRole("admin");
          navigation.navigate("Admin");
        } else {
          alert("You do not have admin privileges");
        }
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while logging in");
    }
  };

  const handleAdminRoute = () => {
    navigation.navigate("Admin Dispensary Dashboard");
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
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            onChangeText={setPassword}
          />
        </View>
        <TouchableOpacity
          style={styles.signInButton}
          onPress={handleAdminLogin}
        >
          <Text style={styles.buttonText}>SIGN IN</Text>
        </TouchableOpacity>
        <Text style={styles.footerText}>
          Need to make a new account?{" "}
          <TouchableOpacity onPress={handleAdminRoute}>
            <Text style={styles.linkText}>Register Here</Text>
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
    fontFamily: "DMSans_400Regular",
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
