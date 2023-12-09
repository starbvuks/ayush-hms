import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "react-native-vector-icons";

import LoginScreen from "../screens/Login/Login";
import EntriesScreen from "../screens/Entries/Entries";
import DispensariesScreen from "../screens/Dispensaries/Dispensaries";
import AdminLogin from "../screens/Login/AdminLogin";

import RegisteredDispensaryDetails from "../screens/Dispensaries/RegisteredDispensaryDetails";
import PatientEntryScreen from "../screens/Entries/EnterPatientData";
import PatientEntries from "../screens/Entries/PatientEntries";

import AdminDispensaryDashboard from "../screens/AdminDashboard/AdminDispensaries/DispensaryDashboard";
import AdminEmployees from "../screens/AdminDashboard/Employees/AdminEmployees";
import AdminProfile from "../screens/AdminDashboard/Profile/AdminProfile";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Bottom Nav for Employee
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

// Bottom Nav for Admin
function AdminTabNavigator() {
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
        name="Admin Dispensary Dashboard"
        style={styles.tabItem}
        component={AdminDispensaryDashboard}
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
      <Tab.Screen
        name="Admin Employees"
        style={styles.tabItem}
        component={AdminEmployees} // replace with your actual Employees screen component
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Admin Profile"
        style={styles.tabItem}
        component={AdminProfile} // replace with your actual Profile screen component
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
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
        name="Admin"
        component={AdminTabNavigator}
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
        name="Patient Entries"
        component={PatientEntries}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Admin Login"
        component={AdminLogin}
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
