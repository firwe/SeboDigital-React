import React from "react";
import { View, Text, TextInput } from "react-native";
import { styles } from "../../styles/authStyles";

export default function Campo({ label, ...props }) {
  return (
    <View style={styles.formGroup}>
      <Text style={styles.formLabel}>{label}</Text>
      <TextInput style={styles.formInput} placeholderTextColor="#94a3b8" {...props} />
    </View>
  );
}