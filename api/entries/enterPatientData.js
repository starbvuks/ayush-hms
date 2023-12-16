import axios from "axios";

export const handlePatientSubmit = async (
  patientData,
  employeeId,
  registeredDispensary,
  location,
  apiIp,
  navigation
) => {
  if (!location) {
    Alert.alert("Error", "Location must be on", [
      {
        text: "OK",
        onPress: () => navigation.goBack(),
      },
    ]);
    return;
  }

  const formData = {
    patientData: patientData,
    employeeId: employeeId,
    dispensaryId: registeredDispensary,
    location: {
      longitude: location.longitude,
      latitude: location.latitude,
    },
  };

  console.log("Form data:", formData); // Log the form data

  try {
    const response = await axios.post(
      `http://${apiIp}:3000/patient-entry`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      Alert.alert("Success", "Data submitted successfully", [
        {
          text: "OK",
          onPress: () => navigation.navigate("Main"),
        },
      ]);
    } else {
      Alert.alert("Error", "Failure in data submission. Try again.", [
        {
          text: "OK",
          onPress: () => navigation.navigate("Main"),
        },
      ]);
    }
  } catch (error) {
    Alert.alert("Error", `Failed to submit data: ${error.message}`, [
      {
        text: "OK",
        onPress: () => navigation.navigate("Main"),
      },
    ]);
  }
};
