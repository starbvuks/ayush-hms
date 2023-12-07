import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

const Login = ({ navigation }) => {
    const handleSignIn2 = () => {
        navigation.navigate("Bottom Navigator");
      };
    
  return (
    <View>
      <Text>Login</Text>
      <TouchableOpacity style={styles.signInButton} onPress={handleSignIn2}>
          <Text style={styles.buttonText}>SIGN IN</Text>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "row",
      marginTop: 80,
    },
    hmsContainer: {
      flex: 1,
      padding: 30,
    },
    imageBackground: {
      flex: 1,
      justifyContent: "center",
    },
    hmsTitle: {
      // fontFamily: "DM-Sans-Bold",
      fontSize: 38,
      marginBottom: 50,
    },
    adminContainer: {
      flex: 1,
      padding: 30,
      justifyContent: "center",
    },
    adminTitle: {
      // fontFamily: "DM-Sans-Bold",
      fontSize: 38,
      marginBottom: 50,
    },
    inputContainer: {
      marginBottom: 30,
      borderBottomWidth: 1.5,
      borderBottomColor: "#ddd",
    },
    inputLabel: {
      // fontFamily: "DM-Sans-Regular",
      fontSize: 20,
      marginBottom: 15,
    },
    input: {
      // fontFamily: "DM-Sans-Regular",
      fontSize: 20,
    },
    signInButton: {
      backgroundColor: "#4A90E2",
      padding: 20,
      borderRadius: 7,
      alignItems: "center",
      marginBottom: 30,
    },
    buttonText: {
      // fontFamily: "DM-Sans-Bold",
      fontSize: 20,
      color: "#fff",
    },
    footerText: {
      // fontFamily: "DMSans_400Regular",
      fontSize: 18,
      textAlign: "center",
    },
    footerText2: {
      // fontFamily: "DM-Sans-Regular",
      fontSize: 18,
      textAlign: "center",
      marginTop: 10,
    },
    linkText: {
      // fontFamily: "DM-Sans-Regular",
      fontSize: 18,
      color: "#4A90E2",
    },
    checkboxContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 30,
    },
    rememberText: {
      // fontFamily: "DM-Sans-Regular",
      fontSize: 18,
      marginLeft: 15,
    },
    forgotPassword: {
      // fontFamily: "DM-Sans-Regular",
      fontSize: 18,
      marginLeft: "auto",
    },
  });

export default Login