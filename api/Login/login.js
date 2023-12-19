import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const handleSignIn = async (username, password, apiIp, navigation) => {
  if (username === "" || password === "") {
    alert("Please fill all fields");
    return;
  }

  try {
    console.log("Sending login request...");
    // const response = await axios.post(`http://${apiIp}:3000/login`, {
    const response = await axios.post(`https://${apiIp}/login`, {
      username: username,
      password: password,
    });

    console.log("Response:", response);

    const data = response.data;
    console.log("Data:", data);

    if (data.error) {
      alert(data.error);
      return;
    }

    if (data.message === "Logged in successfully") {
      try {
        await AsyncStorage.multiSet([
          ["employee_id", data.employee_id.toString()],
          ["registered_dispensary", data.registered_dispensary.toString()],
        ]);

        const employee_id = await AsyncStorage.getItem("employee_id");
        const registered_dispensary = await AsyncStorage.getItem(
          "registered_dispensary"
        );

        console.log("Employee ID:", employee_id);
        console.log("Registered Dispensary:", registered_dispensary);

        navigation.reset({
          index: 0,
          routes: [{ name: "Main" }],
        });
      } catch (error) {
        console.error(error);
        alert("An error occurred while saving data to local storage");
      }
    }
  } catch (error) {
    console.error("Error:", error);
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error("Response data:", error.response.data);
      console.error("Response status:", error.response.status);
      console.error("Response headers:", error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.error("Request:", error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Message:", error.message);
    }
    console.error(error.config);
    alert("invalid username or password");
  }
};
