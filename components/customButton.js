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
      padding: 12,  // slightly increase padding
      marginVertical: 15,  // adjust vertical margin for better spacing
      width: 200,  // slightly wider button
      alignItems: "center",
  },
  text: {
      color: "white",
      fontSize: 20,
  },
});
export default CustomButton;