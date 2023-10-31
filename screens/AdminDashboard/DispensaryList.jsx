import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 

export default function DispensaryList({navigation}) {
  return (
    <View style={styles.container}>
      
      <View style={styles.header}>
        <FontAwesome name="user-circle-o" size={60} color="gray" />
        <Text style={styles.title}>Ayush HMS</Text>
      </View>

      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search By: District, Dispensary, etc."
        />
      </View>

      <View style={styles.districtContainer}>
        <TouchableOpacity style={styles.districtButton}>
          <Text style={styles.districtText}>Warangal</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.districtButton}>
          <Text style={styles.districtText}>Hyderabad</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton}>
          <Text style={styles.footerText}>Dispensaries</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
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
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 20,
  },
  searchBar: {
    margin: 20,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#f9f9f9',
  },
  searchInput: {
    flex: 1,
  },
  districtContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  districtButton: {
    padding: 20,
    backgroundColor: '#e1e1e1',
    borderRadius: 10,
  },
  districtText: {
    fontSize: 18,
    color: '#333',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  footerButton: {
    flex: 1,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 16,
  },
});
