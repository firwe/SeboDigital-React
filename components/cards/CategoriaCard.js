import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { styles } from "../../styles/homeStyles";

export default function CategoriaCard({ nome, onPress, destaque }) {
  return (
    <TouchableOpacity
      style={[styles.categoriaCard, destaque && styles.categoriaCardDestaque]}
      onPress={() => onPress(nome)}
      activeOpacity={0.8}
    >
      <Text style={[styles.categoriaCardTexto, destaque && styles.categoriaCardTextoDestaque]}>
        {nome}
      </Text>
    </TouchableOpacity>
  );
}