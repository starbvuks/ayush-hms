import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Image,
  useState,
  useEffect,
} from "react-native";
import { AsyncStorage } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import { MaterialCommunityIcons } from "react-native-vector-icons";

import LoginScreen from "./screens/Auth/LoginScreen";

import {
  useFonts,
  DM_Sans_Regular,
  DM_Sans_Bold,
  DMSans_400Regular,
  DMSans_700Bold,
} from "@expo-google-fonts/dm-sans";

import AttendanceScreen from "./screens/Attendance/Attendance";
import DispensariesScreen from "./screens/Dispensaries/Dispensaries";

function EntriesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.screenText}>Entries Screen</Text>
    </View>
  );
}

const AuthStack = createStackNavigator();
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
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [fontsLoaded] = useFonts({
    "DM-Sans-Regular": DMSans_400Regular,
    "DM-Sans-Bold": DMSans_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const restoreToken = async () => {
    let token;
    try {
      token = await AsyncStorage.getItem("userToken");
    } catch (e) {
      console.error(e);
    }
    setIsLoading(false);
    setUserToken(token);
  };

  useEffect(() => {
    restoreToken();
  }, []);

  if (isLoading) {
    return null; // You can return a loading screen here if you have one
  }

  return (
    <GluestackUIProvider config={config}>
      <View style={styles.header}>
        <Image
          source={require("./assets/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.appName}>Ayush HMS</Text>
      </View>
      <NavigationContainer style={styles.container}>
        {userToken == null ? (
          <AuthStack.Navigator>
            <AuthStack.Screen name="Login" component={LoginScreen} />
            {/* <AuthStack.Screen name="Signup" component={SignupScreen} /> */}
          </AuthStack.Navigator>
        ) : (
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
        )}
        <StatusBar style="auto" />
      </NavigationContainer>
    </GluestackUIProvider>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 170,
    backgroundColor: "#2E475D",
    paddingHorizontal: 20,
  },
  logo: {
    width: 120,
    height: 120,
    marginRight: 10,
  },
  appName: {
    fontSize: 36,
    fontFamily: "DM-Sans-Bold",
    color: "#FFF",
  },
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
    height: 150, // Adjust the height of the tab bar
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