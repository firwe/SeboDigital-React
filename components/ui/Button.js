import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { styles } from "../../styles/authStyles";

export default function Botao({ children, onPress }) {
  return (
    <TouchableOpacity style={styles.btnAuth} onPress={onPress} activeOpacity={0.85}>
      <Text style={styles.btnAuthTexto}>{children}</Text>
    </TouchableOpacity>
  );
}