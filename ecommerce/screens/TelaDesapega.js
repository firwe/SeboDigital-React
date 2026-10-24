import React, { useState, useMemo, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";

import Header from "../components/global/Header";
import Footer from "../components/global/Footer";
import AcervoCard from "../components/cards/AcervoCard";
import FiltroDesapegaModal from "../components/modals/FiltroDesapegaModal";

import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { CORES } from "../constants/themes";
import { LINKS_RAPIDOS } from "../constants/Navbar";
import { styles as acervoStyles } from "../styles/acervoStyles";

export default function TelaDesapega({ navigation }) {
  const route = useRoute();
  const { adicionarItem } = useCart();
  const { usuarioLogado } = useAuth();

  const [livros, setLivros] = useState([]);
  const [buscaBarra, setBuscaBarra] = useState("");

  const [areaSelecionada, setAreaSelecionada] = useState("");
  const [precoMin, setPrecoMin] = useState("");
  const [precoMax, setPrecoMax] = useState("");
  const [filtroVisivel, setFiltroVisivel] = useState(false);

  // 1. READ: Buscar produtos Desapega Uni na API
  useEffect(() => {
    async function carregarDesapega() {
      try {
        const resposta = await fetch('http://192.168.0.58:3000/api/produtos');
        const dados = await resposta.json();
        
        const apenasDesapega = dados.filter(item => item.categoria === "Desapega Uni");
        setLivros(apenasDesapega);
      } catch (error) {
        console.error("Erro ao buscar desapega:", error);
      }
    }
    
    const unsubscribe = navigation.addListener('focus', () => {
      carregarDesapega();
    });
    return unsubscribe;
  }, [navigation]);

  const livrosFiltrados = useMemo(() => {
    const buscaLower = buscaBarra.trim().toLowerCase();
    const minNum = precoMin === "" ? null : parseFloat(String(precoMin).replace(",", "."));
    const maxNum = precoMax === "" ? null : parseFloat(String(precoMax).replace(",", "."));

    return livros.filter((livro) => {
      const bateBusca = buscaLower === "" || livro.titulo.toLowerCase().includes(buscaLower) || livro.autor.toLowerCase().includes(buscaLower);
      const bateArea = areaSelecionada === "" || livro.categoria === areaSelecionada;
      const batePrecoMin = minNum == null || isNaN(minNum) || livro.preco >= minNum;
      const batePrecoMax = maxNum == null || isNaN(maxNum) || livro.preco <= maxNum;

      return bateBusca && bateArea && batePrecoMin && batePrecoMax;
    });
  }, [livros, buscaBarra, areaSelecionada, precoMin, precoMax]);

  function abrirProduto(livro) {
    navigation.navigate("Produto", { produto: livro });
  }

  function handleAdicionar(livro) {
    adicionarItem(livro);
    Alert.alert("Sucesso", "Material adicionado ao carrinho!");
  }

  function handleEditar(livro) {
    navigation.navigate("Anunciar", { produto: livro });
  }

  // 2. DELETE: Apagar material na API
  async function handleApagar(livro) {
    try {
      const resposta = await fetch(`http://192.168.0.58:3000/api/produtos/${livro.id_produto}`, {
        method: 'DELETE',
      });

      if (resposta.ok) {
        setLivros((atual) => atual.filter((l) => l.id_produto !== livro.id_produto));
        Alert.alert("Sucesso", "Material apagado com sucesso!");
      } else {
        Alert.alert("Erro", "Não foi possível apagar no servidor.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Falha ao conectar com o servidor.");
    }
  }

  function handleAplicarFiltro({ area, min, max }) {
    setAreaSelecionada(area);
    setPrecoMin(min);
    setPrecoMax(max);
  }

  return (
    <View style={acervoStyles.tela}>
      <Header navigation={navigation} busca={buscaBarra} setBusca={setBuscaBarra} onAbrirCategorias={() => setFiltroVisivel(true)} linksRapidos={LINKS_RAPIDOS} />

      <FlatList
        data={livrosFiltrados}
        keyExtractor={(item) => String(item.id_produto)}
        contentContainerStyle={acervoStyles.scrollContent}
        ListHeaderComponent={
          <>
            <Text style={acervoStyles.tituloTopo}>Iniciativa Desapega Uni</Text>
            <Text style={styles.textoDescritivo}>
              Facilitando o acesso ao conhecimento universitário através da economia colaborativa. Encontre aqui livros e materiais acadêmicos com preços acessíveis.
            </Text>
            <View style={acervoStyles.barraFiltro}>
              <Text style={acervoStyles.contadorTexto}>{livrosFiltrados.length} {livrosFiltrados.length === 1 ? "resultado" : "resultados"}</Text>
              <TouchableOpacity style={acervoStyles.btnFiltros} onPress={() => setFiltroVisivel(true)}>
                <Ionicons name="options-outline" size={16} color={CORES.dark} />
                <Text style={acervoStyles.btnFiltrosTexto}>Filtros</Text>
              </TouchableOpacity>
            </View>
          </>
        }
        renderItem={({ item }) => (
          <AcervoCard livro={item} usuarioLogado={usuarioLogado} onPress={abrirProduto} onAdicionar={handleAdicionar} onEditar={handleEditar} onApagar={handleApagar} />
        )}
        ListEmptyComponent={
          <View style={acervoStyles.listaVazia}><Text style={acervoStyles.listaVaziaTexto}>Nenhum material encontrado no servidor.</Text></View>
        }
        ListFooterComponent={<Footer />}
      />

      <FiltroDesapegaModal visible={filtroVisivel} onFechar={() => setFiltroVisivel(false)} areaSelecionada={areaSelecionada} precoMin={precoMin} precoMax={precoMax} onAplicar={handleAplicarFiltro} />
    </View>
  );
}

const styles = StyleSheet.create({
  textoDescritivo: {
    paddingHorizontal: 16,
    marginBottom: 20,
    color: CORES.muted || "#64748b",
    fontSize: 15,
    lineHeight: 22,
  },
});