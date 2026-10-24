import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Header from "../components/global/Header";
import Footer from "../components/global/Footer";
import CategoriasModal from "../components/modals/CategoriasModal";

import { CORES, FONTES } from "../constants/themes";
import { CATEGORIAS, LINKS_RAPIDOS } from "../constants/Navbar";

export default function TelaSucesso({ navigation }) {
  const [busca, setBusca] = useState("");
  const [modalCategoriasVisivel, setModalCategoriasVisivel] = useState(false);

  function selecionarCategoria(categoria) {
    setModalCategoriasVisivel(false);
    if (categoria === "Desapega Uni") {
      navigation.navigate("Desapega");
    } else {
      navigation.navigate("Acervo", { categoria: categoria });
    }
  }

  return (
    <View style={styles.tela}>
      <Header
        navigation={navigation}
        busca={busca}
        setBusca={setBusca}
        onAbrirCategorias={() => setModalCategoriasVisivel(true)}
        linksRapidos={LINKS_RAPIDOS}
      />

      <View style={styles.conteudoCentral}>
        <View style={styles.cardSucesso}>
          <Text style={styles.emoji}>🎉</Text>
          <Text style={styles.titulo}>Pedido Recebido!</Text>
          <Text style={styles.subtitulo}>(Ambiente de Simulação de Compra)</Text>

          <Text style={styles.descricao}>
            Obrigado por utilizar o Sebo Digital! Esta é apenas uma demonstração do fluxo completo de ponta a ponta da nossa aplicação.
          </Text>

          <TouchableOpacity 
            style={styles.botaoHome} 
            onPress={() => navigation.navigate("Home")}
          >
            <Text style={styles.botaoHomeTexto}>Voltar para a Home</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Footer />

      <CategoriasModal
        visible={modalCategoriasVisivel}
        onFechar={() => setModalCategoriasVisivel(false)}
        categorias={CATEGORIAS}
        onSelecionar={selecionarCategoria}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: CORES.bg || "#f8fafc",
  },
  conteudoCentral: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    minHeight: "60vh",
  },
  cardSucesso: {
    backgroundColor: "#f0fdf4",
    borderWidth: 1,
    borderColor: "#bbf7d0",
    padding: 30,
    borderRadius: 16,
    width: "100%",
    maxWidth: 450,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  emoji: {
    fontSize: 48,
    marginBottom: 10,
  },
  titulo: {
    fontFamily: FONTES.display,
    color: "#166534",
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 4,
    textAlign: "center",
  },
  subtitulo: {
    color: "#15803d",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 20,
    textAlign: "center",
  },
  descricao: {
    color: "#64748b",
    fontSize: 15,
    lineHeight: 22,
    textAlign: "center",
    marginBottom: 24,
  },
  botaoHome: {
    backgroundColor: "#1e293b",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
    width: "100%",
  },
  botaoHomeTexto: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 15,
  },
});