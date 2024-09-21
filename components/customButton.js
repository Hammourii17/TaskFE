import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

const CustomButton = ({ onPress,title,style,disabled=false }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, style]}
      disabled={disabled}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
    button: {
        backgroundColor: "#007aff",
        borderRadius: 5,
        padding: 10,
        margin: 10,
        width: 150,
        alignItems: "center",
    },
    text: {
        color: "white",
        fontSize: 20,
    },
    });
export default CustomButton;