import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';

export default function AdminDetails({navigation}) {
  return (
    <ScrollView style={styles.container}>

      <View style={styles.header}>
        <View style={styles.profileImage} />
        <Text style={styles.title}>Ayush HMS</Text>
      </View>
      
      <Text style={styles.adminDetailTitle}>Admin Details</Text>
      
      <View style={styles.detailsContainer}>
        <Text style={styles.username}>Username: xyz-123</Text>
        <TouchableOpacity style={styles.changePasswordButton}>
          <Text style={styles.buttonText}>Change Password</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.footerIcons}>
        <MaterialCommunityIcons name="local-hospital" size={40} color="gray" />
        <FontAwesome name="user-circle-o" size={40} color="purple" />
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
    // ... [styles go here]

    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'gray',
        marginRight: 20,
    },
    adminDetailTitle: {
        fontSize: 26,
        fontWeight: 'bold',
        marginVertical: 20,
    },
    detailsContainer: {
        padding: 20,
        borderRadius: 10,
        backgroundColor: '#F1F1F1',
        alignItems: 'center',
    },
    username: {
        fontSize: 20,
        marginBottom: 10,
    },
    changePasswordButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        backgroundColor: 'purple',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
    },
    footerIcons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 20,
    },
});
