import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";

export default function AdminDispensaryDashboard({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profileImage} />
        <Text style={styles.title}>Ayush HMS</Text>
      </View>

      <Text style={styles.dispensaryTitle}>[Dispensary Name]</Text>

      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Dispensary Patient Entries</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Filter</Text>
        </TouchableOpacity>
        {/* Placeholder for the chart. In a real application, a charting library such as react-native-svg-charts would be used here. */}
        <View style={styles.chartPlaceholder} />
        <Text style={styles.entriesCount}>
          Total Patient Entries: 1209 Entries
        </Text>
        <TouchableOpacity style={styles.filterButtonSmall}>
          <Text style={styles.filterText}>Filter</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footerIcons}>
        <MaterialCommunityIcons
          name="hospital-building"
          size={50}
          color="gray"
        />
        <FontAwesome name="user-circle-o" size={50} color="gray" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 30,
    paddingTop: 50,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "gray",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginLeft: 20,
  },
  dispensaryTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  chartContainer: {
    padding: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 20,
  },
  chartTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  filterButton: {
    alignSelf: "flex-end",
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
  },
  filterText: {
    color: "white",
  },
  chartPlaceholder: {
    width: "100%",
    height: 200,
    backgroundColor: "#F1F1F1",
    marginTop: 20,
    marginBottom: 20,
  },
  entriesCount: {
    fontSize: 18,
    marginBottom: 10,
  },
  filterButtonSmall: {
    alignSelf: "flex-end",
    backgroundColor: "#007BFF",
    padding: 8,
    borderRadius: 5,
  },
  footerIcons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 50,
  },
});
