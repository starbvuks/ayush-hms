import AsyncStorage from "@react-native-async-storage/async-storage";

export const handleLogout = async (navigation) => {
  try {
    // Remove the admin username and password from AsyncStorage
    await AsyncStorage.multiRemove(["adminUsername", "adminPassword"]);

    // Navigate the user back to the login screen
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  } catch (error) {
    console.error("Error while logging out:", error);
    alert("An error occurred while logging out");
  }
};
