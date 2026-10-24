import React from "react";
import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
import { styles } from "../../styles/acervoStyles";

export default function AcervoCard({ livro, usuarioLogado, onPress, onAdicionar, onEditar, onApagar }) {
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

  // Prepara a imagem montando a URI correta com o cabeçalho base64
  let imagemFonte = null;
  if (livro.imagemBase64) {
    const uriLimpa = livro.imagemBase64.startsWith("data:image")
      ? livro.imagemBase64
      : `data:image/jpeg;base64,${livro.imagemBase64}`;
    imagemFonte = { uri: uriLimpa };
  } else if (livro.imagem) {
    imagemFonte = { uri: livro.imagem };
  }

  return (
    <TouchableOpacity 
      style={[styles.card, { height: 130, flexDirection: "row", overflow: "hidden", marginBottom: 12 }]} 
      onPress={() => onPress(livro)} 
      activeOpacity={0.85}
    >
      {/* Caixa da imagem travada em 100px de largura x 130px de altura */}
      <View style={{ width: 100, height: 130, backgroundColor: "#E5E7EB", justifyContent: "center", alignItems: "center" }}>
        {imagemFonte ? (
          <Image
            source={imagemFonte}
            style={{ width: 100, height: 130 }}
            resizeMode="cover"
          />
        ) : (
          <Text style={{ fontSize: 10, color: "#9CA3AF", textAlign: "center", paddingHorizontal: 4 }}>SEM FOTO</Text>
        )}
      </View>

      <View style={[styles.cardInfo, { flex: 1, padding: 10, justifyContent: "space-between" }]}>
        <View>
          <Text style={styles.cardTag}>Acervo - {livro.categoria}</Text>
          <Text style={styles.cardTitulo} numberOfLines={1}>
            {livro.titulo}
          </Text>
          <Text style={styles.cardPreco}>R$ {Number(livro.preco).toFixed(2).replace(".", ",")}</Text>
          <Text style={styles.cardDetalhe} numberOfLines={1}>
            Autor: {livro.autor}
          </Text>
        </View>

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