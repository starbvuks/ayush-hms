import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// import axios from "axios";

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    if (username === "" || password === "") {
      alert("Please fill all fields");
      return;
    }
    console.log(username);
    console.log(password);
    try {
      // Make a POST request to your backend server
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => console.log(data))
        .catch((error) =>
          console.error(
            "There has been a problem with your fetch operation:",
            error
          )
        );

      // Parse the response as JSON
      const data = await response.json();

      // If the response contains an error message, show it
      if (data.error) {
        alert(data.error);
        return;
      }

      // If the response contains a success message and a registered_dispensary,
      // save the registered_dispensary and employee_id in local storage and navigate to the Main screen
      if (data.message === "Logged in successfully") {
        try {
          await AsyncStorage.multiSet([
            ["employee_id", data.employee_id],
            ["registered_dispensary", data.registered_dispensary],
          ]);
          const employee_id = await AsyncStorage.getItem("employee_id");
          const registered_dispensary = await AsyncStorage.getItem(
            "registered_dispensary"
          );
          console.log("Employee ID:", employee_id);
          console.log("Registered Dispensary:", registered_dispensary);
          navigation.navigate("Main");
        } catch (error) {
          console.error(error);
          alert("An error occurred while saving data to local storage");
        }
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while logging in");
    }
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
