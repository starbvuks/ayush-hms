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

  const formatData = (data) => {
    return Object.entries(data)
      .map(([key, value]) => `${key}: ${value}`)
      .join(", ");
  };

  const formatDispensaryData = (dispensary) => {
    return `Dispensary of ID: ${dispensary.dispensary_id}\nLocation: ${dispensary.location}\nTotal Entries: ${dispensary.count}`;
  };

  const formatEmployeeData = (employee) => {
    return `Employee of ID: ${employee.employee_id}\nDispensary: ${employee.dispensary_id}\nCount: ${employee.count}`;
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.dataBlock}>
        <Text style={styles.dataTitle}>Total number of dispensaries:</Text>
        <Text style={styles.dataValue}>{dashboardData?.totalDispensaries}</Text>
      </View>
      <View style={styles.dataBlock}>
        <Text style={styles.dataTitle}>Employees per dispensary:</Text>
        <ScrollView vertical>
          {dashboardData?.employeesPerDispensary
            .slice(0, 5)
            .map((entry, index) => (
              <Text key={index}>{formatEmployeeData(entry)}</Text>
            ))}
        </ScrollView>
      </View>
      <View style={styles.dataBlock}>
        <Text style={styles.dataTitle}>
          Most entries given at a specific day:
        </Text>
        <Text style={styles.dataValue}>
          {formatData(dashboardData?.mostEntriesDay)}
        </Text>
      </View>
      <View style={styles.dataBlock}>
        <Text style={styles.dataTitle}>
          Dispensary with the highest number of employees entering data:
        </Text>
        <Text style={styles.dataValue}>
          {formatDispensaryData(dashboardData?.mostActiveDispensary)}
        </Text>
      </View>
      <View style={styles.dataBlock}>
        <Text style={styles.dataTitle}>
          Total entries given by each dispensary:
        </Text>
        <ScrollView horizontal>
          {dashboardData?.totalEntries.slice(0, 5).map((entry, index) => (
            <Text key={index}>{formatDispensaryData(entry)}</Text>
          ))}
        </ScrollView>
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
  dataBlock: {
    backgroundColor: "#F1F1F1",
    padding: 20,
    marginBottom: 20,
    borderRadius: 8,
  },
  dataTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  dataValue: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
