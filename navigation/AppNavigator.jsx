import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "react-native-vector-icons";

// Login Routes
import LoginScreen from "../screens/Login/Login";
import AdminLogin from "../screens/Login/AdminLogin";

// Main Employee Nav Screens
import MainEntriesScreen from "../screens/Entries/MainEntriesScreen";
import MainDispensaryScreen from "../screens/Dispensaries/MainDispensaryScreen";

// Patient Entries Related Screens
import EnterPatientData from "../screens/Entries/EnterPatientData";
import PatientEntries from "../screens/Entries/PatientEntries";

// Dispensary Related Screens
import RegisteredDispensaryDetails from "../screens/Dispensaries/RegisteredDispensaryDetails";

// Patient Entries on Admin Side
import EntriesDispensaryListScreen from "../screens/AdminDashboard/AdminEntries/EntriesDispensaryListScreen";
import AdminDispensaryEntries from "../screens/AdminDashboard/AdminEntries/AdminDispensaryEntries";

// Attendance / Employees on Admin Side
import AdminEmployeeDispensaryList from "../screens/AdminDashboard/AdminEmployees/AdminEmployeeDispensaryList";
import AdminEmployees from "../screens/AdminDashboard/AdminEmployees/AdminEmployees";

// Admin Profile Screens
import AdminProfile from "../screens/AdminDashboard/AdminProfile/AdminProfile";

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
        component={MainEntriesScreen}
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
        component={MainDispensaryScreen}
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
        name="Admin Entries Dispensaries"
        style={styles.tabItem}
        component={EntriesDispensaryListScreen}
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
        name="Admin Employees Dispensaries"
        style={styles.tabItem}
        component={AdminEmployeeDispensaryList} // replace with your actual Employees screen component
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
        component={EnterPatientData}
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
      <Stack.Screen
        name="Admin Employees"
        component={AdminEmployees}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Admin Dispensary Entries"
        component={AdminDispensaryEntries}
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
