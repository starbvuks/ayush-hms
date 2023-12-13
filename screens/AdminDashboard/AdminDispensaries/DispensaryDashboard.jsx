import React, { useState, useEffect } from "react";
import {
 View,
 Text,
 StyleSheet,
 ScrollView,
} from "react-native";
import axios from "axios";

export default function AdminDispensaryDashboard({ navigation }) {
 const [dashboardData, setDashboardData] = useState({});

 const apiIp = process.env.EXPO_PUBLIC_API_URL

 useEffect(() => {
   const fetchData = async () => {
     const response = await axios.get(
       `http://192.168.0.111:3000/admin/dashboard`
     );
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

 return (
   <ScrollView contentContainerStyle={{ paddingBottom: 50 }} style={styles.container}>
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
         {dashboardData?.mostEntriesDay && `${dashboardData.mostEntriesDay.entry_date}: ${dashboardData.mostEntriesDay.count}`}
       </Text>
     </View>
     <View style={styles.dataBlock}>
       <Text style={styles.dataTitle}>
         Dispensary with the highest number of employees entering data:
       </Text>
       <Text style={styles.dataValue}>
         {dashboardData?.mostActiveDispensary && formatDispensaryData(dashboardData.mostActiveDispensary)}
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
