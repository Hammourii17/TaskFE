import React from "react";
import { Text, TouchableOpacity, StyleSheet, View, Modal } from "react-native";

const CustomModal = ({ isVisible, onClose, children, title }) => {
  return (
    <Modal visible={isVisible} animationType="slide" transparent>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>{title}</Text>
          {children}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  closeButton: {
    backgroundColor: "#007aff",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  closeButtonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },
});

export default CustomModal;
