import AsyncStorage from "@react-native-async-storage/async-storage";

export const fetchDispensaryName = async (
  setDispensaryName,
  setUsername,
  apiIp
) => {
  const registeredDispensary = await AsyncStorage.getItem(
    "registered_dispensary"
  );
  const employee_id = await AsyncStorage.getItem("employee_id");

  const apiEndpoint = `${apiIp}/my-dispensary/${registeredDispensary}`;
  // const apiEndpoint = `https://192.168.29.226:3000/my-dispensary/${registeredDispensary}`;
  fetch(apiEndpoint)
    .then((response) => response.json())
    .then((data) => {
      setDispensaryName(data.dispensary_name);
      setUsername(employee_id);
    })
    .catch((error) => console.error("Error:", error));
};
