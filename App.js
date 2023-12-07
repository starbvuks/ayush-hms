import { StatusBar, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import * as SplashScreen from "expo-splash-screen";
SplashScreen.preventAutoHideAsync();
setTimeout(SplashScreen.hideAsync, 2000);

import Login from "./screens/Login/Login";
import Entries from "./screens/Entries/Entries.jsx";
import Dispensaries from "./screens/Dispensaries/Dispensaries";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const BottomNav = () => {
 return (
   <Tab.Navigator
     screenOptions={({ route }) => ({
       tabBarStyle: {
         height: 70,
         paddingTop: 12,
         backgroundColor: "#FCFCFC",
         borderTopWidth: 0,
         overflow: "hidden",
       },
       tabBarIcon: ({ focused, color }) => {
         let iconName;
         switch (route.name) {
           case "Entries":
             iconName = focused ? "home" : "home-outline";
             break;
           case "Dispensaries":
             iconName = focused ? "lightbulb" : "lightbulb-outline";
             break;
         }
         return <Icon name={iconName} size={24} color={color} />;
       },
       tabBarLabelStyle: {
         fontSize: 12,
         marginBottom: 14,
         fontFamily: "System",
       },
     })}
     tabBarOptions={{
       activeTintColor: "#FF5C35",
       inactiveTintColor: "#2E475D",
     }}
   >
     <Tab.Screen
       name="Entries"
       component={Entries}
       options={{ headerShown: false }}
     />
     <Tab.Screen
       name="Dispensaries"
       component={Dispensaries}
       options={{ headerShown: false }}
     />
   </Tab.Navigator>
 );
};

export default function App() {
 return (
   <View style={{ flex: 1 }}>
     <NavigationContainer>
       <StatusBar
         animated={true}
         backgroundColor="#FFFFFF"
         barStyle={"dark-content"}
       />
       <Stack.Navigator
         screenOptions={{
           headerShown: false,
         }}
       >
         <Stack.Screen name="Login" component={Login} />
         <Stack.Screen name="Bottom Navigator" component={BottomNav} />
       </Stack.Navigator>
     </NavigationContainer>
   </View>
 );
}
