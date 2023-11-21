import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import DropDownPicker from "react-native-dropdown-picker";

export default function PatientEntryScreen() {
  const [patientData, setPatientData] = useState({
    first_name: "",
    last_name: "",
    age: "",
    gender: "",
    adhaar_number: "",
    marital_status: "",
    diagnosis: "",
    treatment: "",
    other_info: "",
  });

  const handleInputChange = (name, value) => {
    setPatientData({ ...patientData, [name]: value });
  };

  const handleSubmit = () => {
    // fetch("http://localhost:3000/patient-data", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     ...patientData,
    //     employeeId: 2,
    //   }),
    // })
    //   .then((response) => {
    //     console.log(response);
    //     return response.json();
    //   })
    //   .then((data) => {
    //     console.log("Success:", data);
    //   })
    //   .catch((error) => {
    //     console.error("Error:", error);
    //   });

    const formData = {
      patientData: patientData,
      employeeId: 2,
      location: {
        longitude: 123.456, // replace with actual longitude
        latitude: 78.901, // replace with actual latitude
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
                  <DropDownPicker
                    items={[
                      { label: "Male", value: "Male" },
                      { label: "Female", value: "Female" },
                      { label: "Other", value: "Other" },
                    ]}
                    value={patientData.gender}
                    containerStyle={{ height: 40 }}
                    style={{ backgroundColor: "#fafafa" }}
                    itemStyle={{
                      justifyContent: "flex-start",
                    }}
                    dropDownStyle={{ backgroundColor: "#fafafa" }}
                    onChangeItem={(item) =>
                      handleInputChange("gender", item.value)
                    }
                  />
                ) : (
                  <TextInput
                    style={styles.smallInput}
                    placeholder={key.replace("_", " ")}
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
    fontSize: 32,
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
    width: Dimensions.get("window").width / 5,
    height: 40,
    fontSize: 25,
    fontFamily: "DM-Sans-Bold",
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
