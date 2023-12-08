import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function DistrictList({navigation}) {
  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <MaterialIcons name="circle" size={80} color="gray" />
        <Text style={styles.title}>Ayush HMS</Text>
      </View>

      <View style={styles.searchContainer}>
        <TextInput 
            placeholder="Search By: District, Dispensary, etc."
            style={styles.searchInput}
        />
        <MaterialIcons name="search" size={24} color="black" />
      </View>

      <Text style={styles.districtTitle}>[District Name] Dispensaries</Text>
      
      <View style={styles.optionsContainer}>
        <TouchableOpacity style={styles.optionButton}>
          <MaterialCommunityIcons name="hospital-building" size={60} color="gray" />
          <Text style={styles.optionText}>[Dispensary Name]</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButton}>
          <MaterialCommunityIcons name="hospital-building" size={60} color="gray" />
          <Text style={styles.optionText}>[Dispensary Name]</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButton}>
          <MaterialCommunityIcons name="hospital-building" size={60} color="gray" />
          <Text style={styles.optionText}>[Dispensary Name]</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButton}>
          <MaterialCommunityIcons name="hospital-building" size={60} color="gray" />
          <Text style={styles.optionText}>[Dispensary Name]</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 15,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
  },
  districtTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  optionButton: {
    width: '48%',
    alignItems: 'center',
    marginBottom: 20,
  },
  optionText: {
    fontSize: 18,
    marginTop: 10,
  }
});
