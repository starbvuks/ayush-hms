import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import axios from "axios";

export default function AdminDispensaryDashboard({ navigation }) {
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "http://192.168.29.226:3000/admin/dashboard"
      );
      setDashboardData(response.data);
    };

    fetchData();
  }, []);
  return (
    <ScrollView style={styles.container}>
      <View>
        {dashboardData && (
          <>
            <Text>
              Total number of dispensaries: {dashboardData.totalDispensaries}
            </Text>
            <Text>
              Employees per dispensary:{" "}
              {JSON.stringify(dashboardData.employeesPerDispensary)}
            </Text>
            <Text>
              Most entries given at a specific day:{" "}
              {JSON.stringify(dashboardData.mostEntriesDay)}
            </Text>
            <Text>
              Dispensary with the highest number of employees entering data:{" "}
              {JSON.stringify(dashboardData.mostActiveDispensary)}
            </Text>
            <Text>
              Total entries given by each dispensary:{" "}
              {JSON.stringify(dashboardData.totalEntries)}
            </Text>
          </>
        )}
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
