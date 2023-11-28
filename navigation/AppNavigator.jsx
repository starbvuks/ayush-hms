import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "react-native-vector-icons";

import LoginScreen from "../screens/Login/Login";
import AttendanceScreen from "../screens/Attendance/Attendance";
import EntriesScreen from "../screens/Entries/Entries";
import DispensariesScreen from "../screens/Dispensaries/Dispensaries";
import AdminLogin from "../screens/Login/Adminlogin";

import RegisteredDispensaryDetails from "../screens/Dispensaries/RegisteredDispensaryDetails";
import PatientEntryScreen from "../screens/Entries/EnterPatientData";
import DispensaryDashboard from "../screens/AdminDashboard/DispensaryDashboard";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabNavigator() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: "#2E475D",
        inactiveTintColor: "#ABB5BE",
        style: styles.tabBar,
        labelStyle: styles.tabLabel,
      }}
    >
      <Tab.Screen
        name="Attendance"
        component={AttendanceScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="badge-account-horizontal"
              color={color}
              size={size}
            />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Entries"
        style={styles.tabItem}
        component={EntriesScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="doctor" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Dispensaries"
        style={styles.tabItem}
        component={DispensariesScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="hospital-building"
              color={color}
              size={size}
            />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Main"
        component={MainTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Registered Dispensary Details"
        component={RegisteredDispensaryDetails}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Enter Patient Data"
        component={PatientEntryScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Admin Login"
        component={AdminLogin}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Dispensary Dashboard"
        component={DispensaryDashboard}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 100, // Adjust the height of the tab bar
    backgroundColor: "#ECF0F9",
  },
  tabLabel: {
    fontSize: 16, // Make the text larger
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  screenText: {
    fontFamily: "DMSans_700Bold",
    fontSize: 24,
  },
});

export default AppNavigator;
