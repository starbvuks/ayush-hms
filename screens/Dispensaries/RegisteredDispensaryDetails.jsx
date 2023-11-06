import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import * as Location from "expo-location";
import Icon from "react-native-vector-icons/Ionicons";

export default function RegisteredDispensaryDetails({ navigation }) {
  const [location, setLocation] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [dispensaryName, setDispensaryName] = useState("");

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Error", "Permission to access location was denied");
      return;
    }

    try {
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setErrorMessage(null);
    } catch (error) {
      console.log("Error getting location:", error);
      setErrorMessage("Failed to get location");
    }
  };

  const handleRegister = () => {
    if (dispensaryName && location) {
      // Perform the registration logic here
      console.log("Dispensary Name:", dispensaryName);
      console.log("Location:", location);
      // Uncomment the code below to perform the POST request
      /*
        fetch("https://your-api-endpoint.com/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            dispensaryName: dispensaryName,
            location: location,
          }),
        })
          .then(response => response.json())
          .then(data => {
            console.log("Registration successful:", data);
            // Reset the input fields
            setDispensaryName("");
            setLocation(null);
          })
          .catch(error => {
            console.log("Registration failed:", error);
          });
        */
    } else {
      Alert.alert(
        "Error",
        "Please enter the dispensary name and get the location"
      );
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Icon name="arrow-back" size={32} color="black" />
      </TouchableOpacity>
      <Text style={styles.screenTitle}>Registered Dispensary Details</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Dispensary Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter dispensary name"
          value={dispensaryName}
          onChangeText={(text) => setDispensaryName(text)}
        />
      </View>
      <TouchableOpacity
        title="Get Location"
        onPress={getLocation}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Get Location</Text>
      </TouchableOpacity>
      {location && (
        <Text style={styles.locText}>
          Latitude: {location.coords.latitude}, Longitude:{" "}
          {location.coords.longitude}
        </Text>
      )}
      <TouchableOpacity onPress={handleRegister} style={styles.button}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  backButton: {
    position: "absolute",
    top: 25,
    left: 20,
    zIndex: 1,
  },
  screenTitle: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
    marginLeft: 40,
  },
  inputContainer: {
    marginBottom: 70,
  },
  inputLabel: {
    fontSize: 26,
    marginBottom: 10,
    marginTop: 50,
    fontFamily: "DMSans_700Bold",
  },
  input: {
    fontSize: 20,
    borderWidth: 2,
    borderColor: "#ccc",
    padding: 10,
    width: "100%",
    fontFamily: "DMSans_400Regular",
  },
  button: {
    backgroundColor: "#4A90E2",
    padding: 20,
    borderRadius: 7,
    alignItems: "center",
    marginBottom: 20,
    marginTop: 40,
  },
  buttonText: {
    fontFamily: "DMSans_700Bold",
    fontSize: 20,
    color: "#fff",
  },
  locText: {
    fontFamily: "DMSans_700Bold",
    fontSize: 20,
    color: "green",
    textAlign: "center",
    marginBottom: 10,
  },
});
