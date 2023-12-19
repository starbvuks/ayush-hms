import AsyncStorage from "@react-native-async-storage/async-storage";

export const fetchDispensaryName = async (setDispensaryName, apiIp) => {
  const registeredDispensary = await AsyncStorage.getItem(
    "registered_dispensary"
  );
  const apiEndpoint = `https://${apiIp}/my-dispensary/${registeredDispensary}`;
  // const apiEndpoint = `https://192.168.29.226:3000/my-dispensary/${registeredDispensary}`;

  fetch(apiEndpoint)
    .then((response) => response.json())
    .then((data) => {
      setDispensaryName(data.dispensary_name);
    })
    .catch((error) => console.error("Error:", error));
};
