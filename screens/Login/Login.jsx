import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const apiIp = process.env.EXPO_PUBLIC_API_URL

  const handleSignIn = async () => {
    if (username === "" || password === "") {
      alert("Please fill all fields");
      return;
    }

    try {
      console.log("Sending login request...");
      const response = await axios.post(`http://${apiIp}:3000/login`, {
        username: username,
        password: password,
      });

      console.log("Response:", response);

      const data = response.data;
      console.log("Data:", data);

      if (data.error) {
        alert(data.error);
        return;
      }

      if (data.message === "Logged in successfully") {
        try {
          await AsyncStorage.multiSet([
            ["employee_id", data.employee_id.toString()],
            ["registered_dispensary", data.registered_dispensary.toString()],
          ]);

          const employee_id = await AsyncStorage.getItem("employee_id");
          const registered_dispensary = await AsyncStorage.getItem(
            "registered_dispensary"
          );

          console.log("Employee ID:", employee_id);
          console.log("Registered Dispensary:", registered_dispensary);

          navigation.reset({
            index: 0,
            routes: [{ name: "Main" }],
          });
        } catch (error) {
          console.error(error);
          alert("An error occurred while saving data to local storage");
        }
      }
    } catch (error) {
      console.error("Error:", error);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.error("Request:", error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Message:", error.message);
      }
      console.error(error.config);
      alert("invalid username or password");
    }
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
        <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
          <Text style={styles.buttonText}>SIGN IN</Text>
        </TouchableOpacity>
        <Text style={styles.footerText}>
          Are you an admin?{" "}
          <TouchableOpacity onPress={handleAdminRoute}>
            <Text style={styles.linkText}>Login Here</Text>
          </TouchableOpacity>
        </Text>
        {/* <Text style={styles.footerText2}>
          Need to make a new account?{" "}
          <TouchableOpacity onPress={handleAdminRoute}>
            <Text style={styles.linkText}>Register Here</Text>
          </TouchableOpacity>
        </Text> */}
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
