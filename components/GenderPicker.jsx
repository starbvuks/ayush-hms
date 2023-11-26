import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";

const genderOptions = [
  { value: "Male" },
  { value: "Female" },
  { value: "Other" },
];

const GenderPicker = ({ onGenderChange }) => {
  const [selectedGender, setSelectedGender] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const renderGender = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        setSelectedGender(item.value);
        onGenderChange(item.value); // Add this line
        setModalVisible(false);
      }}
      style={styles.listItem}
    >
      <Text style={styles.listItemText}>{item.value}</Text>
    </TouchableOpacity>
  );

  return (
    <View>
      <TouchableOpacity
        style={styles.picker}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.pickerText}>
          {selectedGender || "Select Gender"}
        </Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        onBackdropPress={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <FlatList
            data={genderOptions}
            renderItem={renderGender}
            keyExtractor={(item) => item.value}
            ListHeaderComponent={() => (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "98%",
                }}
              >
                <Text style={styles.modalSubheading}>Select Gender</Text>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Icon name="x-circle" size={24} color="black" />
                </TouchableOpacity>
              </View>
            )}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            showsVerticalScrollIndicator={true}
            indicatorStyle="black"
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  picker: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 4,
    padding: 12,
    width: "100%",
  },
  pickerText: {
    fontSize: 16,
    marginRight: 8,
    fontFamily: "NunitoSans_400Regular",
    alignSelf: "center",
  },
  modalContainer: {
    backgroundColor: "#F6F6F6",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: 16,
    paddingTop: 16,
    width: "100%",
    height: "60%",
    position: "absolute",
    bottom: 0,
  },
  modalSubheading: {
    fontSize: 18,
    fontFamily: "NunitoSans_700Bold",
    marginBottom: 16,
  },
  separator: {
    height: 1,
    backgroundColor: "#D0D0D0",
  },
  listItem: {
    paddingVertical: 18,
  },
  listItemText: {
    fontSize: 18,
    fontFamily: "NunitoSans_400Regular",
  },
});

export default GenderPicker;
