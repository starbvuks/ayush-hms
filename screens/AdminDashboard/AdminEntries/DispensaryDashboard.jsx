import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import axios from "axios";

export default function AdminDispensaryDashboard({ navigation }) {
  const [dashboardData, setDashboardData] = useState({});

  const apiIp = process.env.EXPO_PUBLIC_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`https://${apiIp}/admin/dashboard`);
      console.log(response.data);
      setDashboardData(response.data);
    };

    fetchData();
  }, []);

  const formatEmployeeData = (employee) => {
    return `Employee registered at dispensary ID: ${employee.registered_dispensary}\nCount: ${employee.count}`;
  };

  const formatDispensaryData = (dispensary) => {
    return `Dispensary ID: ${dispensary.dispensary_id}\nCount: ${dispensary.count}`;
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // getMonth() returns month index starting from 0
    const day = date.getDate();
    return `${year}-${month.toString().padStart(2, "0")}-${day
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 50 }}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.headerText}>Admin Dispensary Dashboard</Text>
      </View>
      <View style={styles.dataBlock}>
        <Text style={styles.dataTitle}>Total number of dispensaries:</Text>
        <Text style={styles.dataValue}>
          {dashboardData && dashboardData.totalDispensaries}
        </Text>
      </View>
      <View style={styles.dataBlock}>
        <Text style={styles.dataTitle}>Employees per dispensary:</Text>
        <ScrollView vertical>
          {(dashboardData?.employeesPerDispensary || [])
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
          {dashboardData?.mostEntriesDay &&
            `${formatDate(
              dashboardData.mostEntriesDay.entry_date
            )}, Total Entries: ${dashboardData.mostEntriesDay.count}`}
        </Text>
      </View>
      <View style={styles.dataBlock}>
        <Text style={styles.dataTitle}>
          Dispensary with the highest number of employees entering data:
        </Text>
        <Text style={styles.dataValue}>
          {dashboardData?.mostActiveDispensary &&
            formatDispensaryData(dashboardData.mostActiveDispensary)}
        </Text>
      </View>
      <View style={styles.dataBlock}>
        <Text style={styles.dataTitle}>
          Total entries given by each dispensary:
        </Text>
        <ScrollView horizontal>
          {(dashboardData?.totalEntries || [])
            .slice(0, 5)
            .map((entry, index) => (
              <Text style={styles.totalEntries} key={index}>
                {formatDispensaryData(entry)}
              </Text>
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
  header: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2E475D",
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
    color: "#2E475D",
  },
  dataValue: {
    fontSize: 18,
    fontWeight: "normal",
    color: "black",
  },
  totalEntries: {
    marginRight: 20,
  },
});
