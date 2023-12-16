import AsyncStorage from "@react-native-async-storage/async-storage";

export const handleLogout = async (navigation) => {
  try {
    // Remove the user's data from AsyncStorage
    await AsyncStorage.multiRemove(["employee_id", "registered_dispensary"]);

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
