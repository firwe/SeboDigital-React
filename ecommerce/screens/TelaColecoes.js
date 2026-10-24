import React, { useState, useMemo, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";

import Header from "../components/global/Header";
import Footer from "../components/global/Footer";
import AcervoCard from "../components/cards/AcervoCard";
import FiltroColecoesModal from "../components/modals/FiltroColecoesModal";

import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { CORES } from "../constants/themes";
import { LINKS_RAPIDOS } from "../constants/Navbar";
import { styles as acervoStyles } from "../styles/acervoStyles";

export default function TelaColecoes({ navigation }) {
  const route = useRoute();
  const { adicionarItem } = useCart();
  const { usuarioLogado } = useAuth();

  const [colecoes, setColecoes] = useState([]);
  const [buscaBarra, setBuscaBarra] = useState("");

  const [filtroTitulo, setFiltroTitulo] = useState("");
  const [filtroAutor, setFiltroAutor] = useState("");
  const [precoMin, setPrecoMin] = useState("");
  const [precoMax, setPrecoMax] = useState("");
  const [filtroVisivel, setFiltroVisivel] = useState(false);

  // 1. READ: Buscar Coleções na API
  useEffect(() => {
    async function carregarColecoes() {
      try {
        const resposta = await fetch('http://192.168.0.58:3000/api/produtos');
        const dados = await resposta.json();
        
        const apenasColecoes = dados.filter(item => item.categoria === "Coleção Exclusiva" || item.colecao === true);
        setColecoes(apenasColecoes);
      } catch (error) {
        console.error("Erro ao buscar coleções:", error);
      }
    }
    
    const unsubscribe = navigation.addListener('focus', () => {
      carregarColecoes();
    });
    return unsubscribe;
  }, [navigation]);

  const colecoesFiltradas = useMemo(() => {
    const buscaLower = buscaBarra.trim().toLowerCase();
    const tituloLower = filtroTitulo.trim().toLowerCase();
    const autorLower = filtroAutor.trim().toLowerCase();

    const minNum = precoMin === "" ? null : parseFloat(String(precoMin).replace(",", "."));
    const maxNum = precoMax === "" ? null : parseFloat(String(precoMax).replace(",", "."));

    return colecoes.filter((item) => {
      const bateBuscaBarra = buscaLower === "" || item.titulo.toLowerCase().includes(buscaLower) || item.autor.toLowerCase().includes(buscaLower);
      const bateTitulo = tituloLower === "" || item.titulo.toLowerCase().includes(tituloLower);
      const bateAutor = autorLower === "" || item.autor.toLowerCase().includes(autorLower);
      const batePrecoMin = minNum == null || isNaN(minNum) || item.preco >= minNum;
      const batePrecoMax = maxNum == null || isNaN(maxNum) || item.preco <= maxNum;

      return bateBuscaBarra && bateTitulo && bateAutor && batePrecoMin && batePrecoMax;
    });
  }, [colecoes, buscaBarra, filtroTitulo, filtroAutor, precoMin, precoMax]);

  function abrirProduto(livro) {
    navigation.navigate("Produto", { produto: livro });
  }

  function handleAdicionar(livro) {
    adicionarItem(livro);
    Alert.alert("Sucesso", "Coleção adicionada ao carrinho!");
  }

  function handleEditar(livro) {
    navigation.navigate("Anunciar", { produto: livro });
  }

  // 2. DELETE: Apagar Coleção na API
  async function handleApagar(livro) {
    try {
      const resposta = await fetch(`http://192.168.0.58:3000/api/produtos/${livro.id_produto}`, {
        method: 'DELETE',
      });

      if (resposta.ok) {
        setColecoes((atual) => atual.filter((c) => c.id_produto !== livro.id_produto));
        Alert.alert("Sucesso", "Coleção apagada com sucesso!");
      } else {
        Alert.alert("Erro", "Não foi possível apagar no servidor.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Falha ao conectar com o servidor.");
    }
  }

  function handleAplicarFiltro({ titulo, autor, min, max }) {
    setFiltroTitulo(titulo);
    setFiltroAutor(autor);
    setPrecoMin(min);
    setPrecoMax(max);
  }

  return (
    <View style={acervoStyles.tela}>
      <Header navigation={navigation} busca={buscaBarra} setBusca={setBuscaBarra} onAbrirCategorias={() => setFiltroVisivel(true)} linksRapidos={LINKS_RAPIDOS} />

      <FlatList
        data={colecoesFiltradas}
        keyExtractor={(item) => String(item.id_produto)}
        contentContainerStyle={acervoStyles.scrollContent}
        ListHeaderComponent={
          <>
            <Text style={acervoStyles.tituloTopo}>Coleções e Boxes</Text>
            <Text style={styles.textoDescritivo}>
              Explore conjuntos de obras selecionadas, sagas completas e boxes exclusivos. Perfeito para quem deseja completar sua estante com edições especiais.
            </Text>
            <View style={acervoStyles.barraFiltro}>
              <Text style={acervoStyles.contadorTexto}>{colecoesFiltradas.length} {colecoesFiltradas.length === 1 ? "resultado" : "resultados"}</Text>
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
          <View style={acervoStyles.listaVazia}><Text style={acervoStyles.listaVaziaTexto}>Nenhuma coleção encontrada no servidor.</Text></View>
        }
        ListFooterComponent={<Footer />}
      />

      <FiltroColecoesModal visible={filtroVisivel} onFechar={() => setFiltroVisivel(false)} tituloSalvo={filtroTitulo} autorSalvo={filtroAutor} precoMin={precoMin} precoMax={precoMax} onAplicar={handleAplicarFiltro} />
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