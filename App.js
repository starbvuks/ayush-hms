import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "react-native-vector-icons";

import {
  useFonts,
  DM_Sans_Regular,
  DM_Sans_Bold,
  DMSans_400Regular,
  DMSans_700Bold,
} from "@expo-google-fonts/dm-sans";

function AttendanceScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.screenText}>Attendance Screen</Text>
    </View>
  );
}

function EntriesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.screenText}>Entries Screen</Text>
    </View>
  );
}

function DispensariesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.screenText}>Dispensaries Screen</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

function CustomTabBar({ state, descriptors, navigation }) {
  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            style={styles.tabItem}
            onPress={onPress} // Call the onPress function
            key={route.key}
          >
            <MaterialCommunityIcons
              name={options.iconName}
              color={isFocused ? "#2E475D" : "#ABB5BE"}
              size={45}
            />
            <Text
              style={[
                styles.tabText,
                { color: isFocused ? "#2E475D" : "#ABB5BE" },
              ]}
            >
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({
    "DM-Sans-Regular": DMSans_400Regular,
    "DM-Sans-Bold": DMSans_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GluestackUIProvider config={config}>
      <NavigationContainer>
        <Tab.Navigator
          tabBar={(props) => <CustomTabBar {...props} />}
          tabBarOptions={{
            activeTintColor: "#2E475D",
            inactiveTintColor: "#ABB5BE",
          }}
        >
          <Tab.Screen
            name="Attendance"
            component={AttendanceScreen}
            options={{
              iconName: "badge-account-horizontal",
              headerShown: false,
            }}
          />
          <Tab.Screen
            name="Entries"
            component={EntriesScreen}
            options={{
              iconName: "doctor",
              headerShown: false,
            }}
          />
          <Tab.Screen
            name="Dispensaries"
            component={DispensariesScreen}
            options={{
              iconName: "hospital-building",
              headerShown: false,
            }}
          />
        </Tab.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
    </GluestackUIProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "DM-Sans-Regular",
  },
  screenText: {
    fontSize: 28,
    fontFamily: "DM-Sans-Regular",
  },
  tabBar: {
    flexDirection: "row",
    height: 110, // Adjust the height of the tab bar
    backgroundColor: "#ECF0F9",
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  tabText: {
    fontSize: 24,
    marginTop: 4,
    fontFamily: "DM-Sans-Bold",
  },
});
