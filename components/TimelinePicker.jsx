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

const timeframeOptions = [
  { label: "Today", value: "today" },
  { label: "Last Week", value: "lastweek" },
  { label: "Last Month", value: "lastmonth" },
  { label: "Last Year", value: "lastyear" },
  { label: "All Time", value: "alltime" },
];

const TimelinePicker = ({ onTimeframeChange }) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const renderTimeframe = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        setSelectedTimeframe(item.label);
        onTimeframeChange(item.value);
        setModalVisible(false);
      }}
      style={styles.listItem}
    >
      <Text style={styles.listItemText}>{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <View>
      <TouchableOpacity
        style={styles.picker}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.pickerText}>
          {selectedTimeframe || "Select Timeframe"}
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
            data={timeframeOptions}
            renderItem={renderTimeframe}
            keyExtractor={(item) => item.value}
            ListHeaderComponent={() => (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "98%",
                }}
              >
                <Text style={styles.modalSubheading}>Filter Time: (Today)</Text>
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
    alignItems: "start",
    justifyContent: "center",
    borderRadius: 4,
    padding: 10,
    width: "40%",
    left: 20,
    backgroundColor: "#d6d5ed",
  },
  pickerText: {
    fontSize: 20,
    marginRight: 8,
    alignSelf: "center",
  },
  modalContainer: {
    backgroundColor: "#F6F6F6",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: 16,
    paddingTop: 16,
    width: "100%",
    height: "40%",
    position: "absolute",
    bottom: 0,
  },
  modalSubheading: {
    fontSize: 18,
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
  },
});

export default TimelinePicker;
