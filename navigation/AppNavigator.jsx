import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "react-native-vector-icons";

import LoginScreen from "../screens/Login/Login";
import AttendanceScreen from "../screens/Attendance/Attendance";
import DispensariesScreen from "../screens/Dispensaries/Dispensaries";
// import EntriesScreen from "../screens/Entries/EntriesScreen";

function EntriesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.screenText}>Entries Screen</Text>
    </View>
  );
}

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
        style={styles.tabItem}
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
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    height: 150, // Adjust the height of the tab bar
    backgroundColor: "#ECF0F9",
  },
  tabLabel: {
    fontFamily: "DMSans_400Regular",
    fontSize: 12,
    marginBottom: 5,
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
