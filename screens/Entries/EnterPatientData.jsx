import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import GenderPicker from "../../components/GenderPicker";

export default function PatientEntryScreen() {
  const [patientData, setPatientData] = useState({
    first_name: "",
    last_name: "",
    age: "",
    gender: "",
    adhaar_number: "",
    diagnosis: "",
    treatment: "",
    other_info: "",
    phone_number: "",
  });
  const [location, setLocation] = useState(null);
  const [adhaarNumber, setAdhaarNumber] = useState("");
  const [employeeId, setEmployeeId] = useState();

  const formatAdhaarNumber = (value) => {
    let formattedText = value.replace(/\D/g, ""); // Remove all non-digit characters
    if (formattedText.length > 0) {
      formattedText = formattedText.match(new RegExp(".{1,4}", "g")).join(" "); // Insert a space after every 4 digits
    }
    return formattedText;
  };

  const handleAdhaarNumberChange = (value) => {
    setAdhaarNumber(formatAdhaarNumber(value));
    handleInputChange("adhaar_number", value.replace(/\s/g, "")); // Remove spaces before storing the value
  };

  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.log("Location permission not granted");
          return;
        }

        let currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation.coords);
        console.log(currentLocation.coords);

        const employee_id = await AsyncStorage.getItem("employee_id");
        setEmployeeId(employee_id);

        const registered_dispensary = await AsyncStorage.getItem(
          "registered_dispensary"
        );

        console.log("Employee ID:", employee_id);
        console.log("Registered Dispensary:", registered_dispensary);
      } catch (error) {
        console.log("Error while fetching location:", error);
        console.error("Error retrieving data:", error.message);
      }
    })();
  }, []);

  const handleInputChange = (name, value) => {
    setPatientData({ ...patientData, [name]: value });
  };

  const handleSubmit = () => {
    if (!location) {
      console.log("Unable to retrieve location");
      return;
    }

    const formData = {
      patientData: patientData,
      employeeId: employeeId,
      location: {
        longitude: location.longitude,
        latitude: location.latitude,
      },
    };

    console.log("Form data:", formData); // Log the form data

    fetch("http://192.168.29.226:3000/patient-data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
  };

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 150 }}
      style={styles.container}
    >
      <Text style={styles.header}>Enter Patient Data</Text>
      {Object.keys(patientData).map((key) => {
        if (key === "age" || key === "gender") {
          return (
            <View>
              <Text style={styles.inputLabel}>{key.replace("_", " ")}</Text>
              <View key={key} style={styles.smallInputContainer}>
                {key === "gender" ? (
                  <GenderPicker
                    selectedGender={patientData.gender}
                    onGenderChange={(gender) =>
                      handleInputChange("gender", gender)
                    }
                  />
                ) : (
                  // age form
                  <TextInput
                    style={styles.smallInput}
                    placeholder=""
                    keyboardType="numeric"
                    onChangeText={(value) => handleInputChange(key, value)}
                  />
                )}
              </View>
            </View>
          );
        } else if (key === "other_info") {
          return (
            <View>
              <Text style={styles.inputLabel}>{key.replace("_", " ")}</Text>
              <View key={key} style={styles.largeInputContainer}>
                <TextInput
                  style={styles.largeInput}
                  onChangeText={(value) => handleInputChange(key, value)}
                  multiline
                />
              </View>
            </View>
          );
        } else if (key === "adhaar_number") {
          return (
            <View>
              <Text style={styles.inputLabel}>{key.replace("_", " ")}</Text>
              <View key={key} style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder=""
                  keyboardType="numeric"
                  onChangeText={handleAdhaarNumberChange}
                  value={adhaarNumber}
                  maxLength={14}
                />
              </View>
            </View>
          );
        } else {
          return (
            <View>
              <Text style={styles.inputLabel}>{key.replace("_", " ")}</Text>
              <View key={key} style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  onChangeText={(value) => handleInputChange(key, value)}
                />
              </View>
            </View>
          );
          Cold;
        }
      })}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingHorizontal: 40,
    paddingVertical: 70,
  },
  header: {
    fontSize: 36,
    marginBottom: 20,
    fontFamily: "DM-Sans-Bold",
  },
  inputContainer: {
    backgroundColor: "#EDEDED",
    borderRadius: 10,
    padding: 30,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "#ccc",
  },
  smallInputContainer: {
    flexDirection: "row",
    backgroundColor: "#EDEDED",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 2,
    borderColor: "#ccc",
  },
  largeInputContainer: {
    backgroundColor: "#EDEDED",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "#ccc",
  },
  inputLabel: {
    fontSize: 28,
    fontFamily: "DM-Sans-Bold",
    marginBottom: 10,
  },
  input: {
    height: 40,
    fontSize: 28,
    fontFamily: "DM-Sans-Normal",
  },
  smallInput: {
    height: 40,
    fontSize: 25,
    fontFamily: "DM-Sans-Normal",
  },
  largeInput: {
    height: 100,
    fontSize: 20,
    fontFamily: "DM-Sans-Bold",
  },
  submitButton: {
    backgroundColor: "#2E475D",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    marginTop: 20,
  },
  submitButtonText: {
    color: "#FFF",
    fontSize: 24,
    fontFamily: "DM-Sans-Bold",
  },
});
