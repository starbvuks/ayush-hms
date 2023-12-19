import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
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
        icon: "logout",
        routes: [{ name: "Login" }],
      });
    } catch (error) {
      console.error("Error while logging out:", error);
      alert("An error occurred while logging out");
    }
  };

  const options = [
    {
      id: "1",
      icon: "logout",
      label: "Logout",
      onPress: handleLogout,
    },
    // {
    //   id: "2",
    //   icon: "account-circle",
    //   label: "View Employee",
    //   onPress: () => navigation.navigate("ViewEmployee"),
    // },
    // {
    //   id: "3",
    //   icon: "account-plus",
    //   label: "Add Employee",
    //   onPress: () => navigation.navigate("AddEmployee"),
    // },
  ];

  const renderOption = ({ item }) => (
    <TouchableOpacity style={styles.optionContainer} onPress={item.onPress}>
      <MaterialCommunityIcons name={item.icon} color="#2E475D" size={80} />
      <Text style={styles.optionText}>{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={options}
        renderItem={renderOption}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.optionList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingHorizontal: 20,
    paddingTop: 70,
  },
  optionList: {
    justifyContent: "flex-start",
  },
  optionContainer: {
    backgroundColor: "#ECF0F9",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 10,
  },
  optionText: {
    fontSize: 24,
    marginTop: 10,
    color: "#2E475D",
    textAlign: "center",
    fontFamily: "DM-Sans-Bold",
  },
});
