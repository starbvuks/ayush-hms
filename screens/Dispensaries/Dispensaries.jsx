import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { MaterialCommunityIcons } from "react-native-vector-icons";

export default function DispensariesScreen({ navigation }) {
  const options = [
    {
      id: "1",
      icon: "home-modern",
      label: "Registered Dispensary Details",
    },
    { id: "2", icon: "domain-plus", label: "Other Dispensary Details" },
    { id: "3", icon: "logout", label: "Logout of Registered Dispensary" },
  ];

  const renderOption = ({ item }) => (
    <TouchableOpacity style={styles.optionContainer}>
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
