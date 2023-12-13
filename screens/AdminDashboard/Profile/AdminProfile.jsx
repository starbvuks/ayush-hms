import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialCommunityIcons } from "react-native-vector-icons";

export default function AdminProfile({ navigation }) {
  const handleLogout = async () => {
    try {
      // Remove the user's data from AsyncStorage
      await AsyncStorage.multiRemove(["employee_id", "registered_dispensary"]);

      // Navigate the user back to the login screen
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
    } catch (error) {
      console.error("Error while logging out:", error);
      alert("An error occurred while logging out");
    }
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.optionContainer}
        onPress={() => {
          handleLogout();
        }}
      >
        {/* <MaterialCommunityIcons name={logout} color="#2E475D" size={80} /> */}
        <Text style={styles.optionText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "space-between",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    marginLeft: 20,
  },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  optionButton: {
    padding: 20,
    borderRadius: 20,
    borderColor: "gray",
    borderWidth: 1,
    alignItems: "center",
    width: 150,
    height: 150,
    justifyContent: "center",
  },
  optionText: {
    fontSize: 20,
    marginTop: 10,
    textAlign: "center",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 20,
  },
  footerButton: {
    alignItems: "center",
  },
  footerText: {
    fontSize: 24,
    marginTop: 10,
  },
});
