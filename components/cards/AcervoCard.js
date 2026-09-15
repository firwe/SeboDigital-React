import React from "react";
import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
import { styles } from "../../styles/acervoStyles";

export default function AcervoCard({ livro, usuarioLogado, onPress, onAdicionar, onEditar, onApagar }) {
  // Regra de negócio:
  // - Dono do produto só pode editar/apagar o PRÓPRIO produto.
  // - Admin pode editar/apagar QUALQUER produto.
  const podeGerenciar =
    !!usuarioLogado &&
    (usuarioLogado.admin === true ||
      (livro.dono != null && livro.dono.id_usuario === usuarioLogado.id_usuario));

  function confirmarApagar() {
    Alert.alert(
      "Apagar anúncio",
      `Tem certeza que deseja apagar "${livro.titulo}"?`,
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Apagar", style: "destructive", onPress: () => onApagar(livro) },
      ]
    );
  }

  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(livro)} activeOpacity={0.85}>
      <View style={styles.cardImg}>
        {livro.imagemBase64 ? (
          <Image
            source={{ uri: `data:image/jpeg;base64,${livro.imagemBase64}` }}
            style={styles.cardImgFoto}
            resizeMode="cover"
          />
        ) : (
          <Text style={styles.semFoto}>SEM FOTO</Text>
        )}
      </View>

      <View style={styles.cardInfo}>
        <Text style={styles.cardTag}>Acervo - {livro.categoria}</Text>
        <Text style={styles.cardTitulo} numberOfLines={2}>
          {livro.titulo}
        </Text>
        <Text style={styles.cardPreco}>R$ {livro.preco.toFixed(2).replace(".", ",")}</Text>
        <Text style={styles.cardDetalhe} numberOfLines={1}>
          Autor: {livro.autor}
        </Text>

        <View style={styles.cardAcoes}>
          <TouchableOpacity style={styles.btnAdicionar} onPress={() => onAdicionar(livro)}>
            <Text style={styles.btnAdicionarTexto}>🛒 Adicionar</Text>
          </TouchableOpacity>

          {podeGerenciar && (
            <>
              <TouchableOpacity style={styles.btnEditar} onPress={() => onEditar(livro)}>
                <Text style={styles.btnEditarTexto}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnApagar} onPress={confirmarApagar}>
                <Text style={styles.btnApagarTexto}>Apagar</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}