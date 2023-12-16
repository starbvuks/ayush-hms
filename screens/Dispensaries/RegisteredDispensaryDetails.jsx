import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { fetchDispensaryName } from "../../api/dispensaries/registeredDispensaryDetails";

export default function RegisteredDispensaryDetails() {
  const [dispensaryName, setDispensaryName] = useState("");
  const apiIp = process.env.EXPO_PUBLIC_API_URL;

  useEffect(() => {
    fetchDispensaryName(setDispensaryName, apiIp);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.normalText}>You are currently registered to:</Text>
        <Text style={styles.dispensaryName}>{dispensaryName}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  box: {
    backgroundColor: "#ECF0F9",
    padding: 30,
    margin: 30,
    borderRadius: 10,
  },
  normalText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  dispensaryName: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
