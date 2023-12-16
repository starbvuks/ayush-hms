import axios from "axios";

export const handleAdminLogin = async (
  username,
  password,
  apiIp,
  navigation
) => {
  if (username === "" || password === "") {
    alert("Please fill all fields");
    return;
  }

  console.log(username, password);

  try {
    console.log("Sending login request...");
    const response = await axios.post(`http://${apiIp}:3000/admin/login`, {
      username: username,
      password: password,
    });

    console.log("Response:", response);

    const data = response.data;
    console.log("Data:", data);

    if (response.status === 401) {
      alert(data.message);
      return;
    }

    if (data && data.message === "Logged in successfully") {
      if (
        data.role === "super_admin" ||
        data.role === "zone_admin_1" ||
        data.role === "zone_admin_2"
      ) {
        navigation.navigate("Admin");
      } else {
        alert("You do not have admin privileges");
      }
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred while logging in");
  }
};
