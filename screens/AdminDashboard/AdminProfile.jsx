import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';

export default function AdminProfile({navigation}) {
  return (
    <View style={styles.container}>
      
      <View style={styles.header}>
        <FontAwesome name="circle-thin" size={80} color="gray" />
        <Text style={styles.title}>Ayush HMS</Text>
      </View>

      <View style={styles.optionsContainer}>
        <TouchableOpacity style={styles.optionButton}>
          <MaterialCommunityIcons name="account-details" size={60} color="gray" />
          <Text style={styles.optionText}>Login Details</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButton}>
          <FontAwesome5 name="door-open" size={60} color="gray" />
          <Text style={styles.optionText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton}>
          <FontAwesome5 name="clinic-medical" size={40} color="gray" />
          <Text style={styles.footerText}>Dispensaries</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <FontAwesome name="user-circle" size={40} color="gray" />
          <Text style={styles.footerText}>Profile</Text>
        </TouchableOpacity>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginLeft: 20,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  optionButton: {
    padding: 20,
    borderRadius: 20,
    borderColor: 'gray',
    borderWidth: 1,
    alignItems: 'center',
    width: 150,
    height: 150,
    justifyContent: 'center',
  },
  optionText: {
    fontSize: 20,
    marginTop: 10,
    textAlign: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
  },
  footerButton: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: 24,
    marginTop: 10,
  },
});
