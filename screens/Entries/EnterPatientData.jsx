import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { handlePatientSubmit } from "../../api/entries/enterPatientData";

import GenderPicker from "../../components/GenderPicker";

export default function EnterPatientData() {
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
  const [registeredDispensary, setRegisteredDispensary] = useState();

  const navigation = useNavigation();

  const apiIp = process.env.EXPO_PUBLIC_API_URL;

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
          Alert.alert("Error", "Location permission not granted", [
            {
              text: "OK",
              onPress: () => navigation.goBack(),
            },
          ]);
          return;
        }

        let currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation.coords);

        const employee_id = await AsyncStorage.getItem("employee_id");
        if (!employee_id) {
          Alert.alert("Error", "Please logout and login again", [
            {
              text: "OK",
              onPress: () => navigation.goBack(),
            },
          ]);
          return;
        }
        setEmployeeId(employee_id);

        const registered_dispensary = await AsyncStorage.getItem(
          "registered_dispensary"
        );
        if (!registered_dispensary) {
          Alert.alert("Error", "Please logout and login again", [
            {
              text: "OK",
              onPress: () => navigation.goBack(),
            },
          ]);
          return;
        }
        setRegisteredDispensary(registered_dispensary);
      } catch (error) {
        console.log("Error while fetching location:", error);
        console.error("Error retrieving data:", error.message);
      }
    })();
  }, []);

  const handleInputChange = (name, value) => {
    setPatientData({ ...patientData, [name]: value });
  };

  const onSubmit = async () => {
    await handlePatientSubmit(
      patientData,
      employeeId,
      registeredDispensary,
      location,
      apiIp,
      navigation
    );
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
        } else if (key === "phone_number") {
          return (
            <View>
              <Text style={styles.inputLabel}>{key.replace("_", " ")}</Text>
              <View key={key} style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder=""
                  keyboardType="numeric"
                  onChangeText={(value) => handleInputChange(key, value)}
                  maxLength={10}
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
        }
      })}
      <TouchableOpacity style={styles.submitButton} onPress={onSubmit}>
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
    width: "100%",
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
