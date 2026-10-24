import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "../../styles/homeStyles";

function iniciais(titulo) {
  return titulo.split(" ").slice(0, 2).map((p) => p[0]).join("");
}

export default function LivroCard({ livro, onPress }) {
  return (
    <TouchableOpacity style={styles.livroCard} onPress={() => onPress(livro)} activeOpacity={0.85}>
      <View style={styles.livroImg}>
        <Text style={styles.livroPlaceholder}>{iniciais(livro.titulo)}</Text>
      </View>
      <View style={styles.livroInfo}>
        <Text style={styles.livroNome} numberOfLines={2}>{livro.titulo}</Text>
        <Text style={styles.livroPreco}>R$ {livro.preco.toFixed(2).replace(".", ",")}</Text>
        <Text style={styles.livroAutor} numberOfLines={1}>{livro.autor}</Text>
      </View>
    </TouchableOpacity>
  );
}