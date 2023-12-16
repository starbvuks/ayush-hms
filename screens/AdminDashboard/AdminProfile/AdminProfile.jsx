import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

import { handleLogout } from "../../../api/adminDashboard/adminProfile/adminProfile";

export default function AdminProfile({ navigation }) {
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
