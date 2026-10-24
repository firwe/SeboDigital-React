import React, { useState, useMemo, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";

import Header from "../components/global/Header";
import Footer from "../components/global/Footer";
import AcervoCard from "../components/cards/AcervoCard";
import FiltroAcervoModal from "../components/modals/FiltroAcervoModal";

import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { CORES } from "../constants/themes";
import { LINKS_RAPIDOS } from "../constants/Navbar";
import { styles } from "../styles/acervoStyles";

export default function TelaAcervo({ navigation }) {
  const route = useRoute();
  const { adicionarItem } = useCart();
  const { usuarioLogado } = useAuth();

  const [livros, setLivros] = useState([]);
  const [busca, setBusca] = useState("");
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(
    route.params?.categoria || "",
  );
  const [precoMin, setPrecoMin] = useState("");
  const [precoMax, setPrecoMax] = useState("");
  const [filtroVisivel, setFiltroVisivel] = useState(false);

  // 1. READ: Buscar os livros no Back-end ao abrir a tela
  useEffect(() => {
    async function carregarAcervo() {
      try {
        const resposta = await fetch('http://192.168.0.58:3000/api/produtos');
        const dados = await resposta.json();
        
        // Tira as coleções e desapega uni para mostrar só os livros normais
        const apenasAcervo = dados.filter(item => item.categoria !== "Coleção Exclusiva" && item.categoria !== "Desapega Uni");
        setLivros(apenasAcervo);
      } catch (error) {
        console.error("Erro ao buscar acervo da API:", error);
      }
    }
    
    // Atualiza a lista sempre que a tela ganha foco
    const unsubscribe = navigation.addListener('focus', () => {
      carregarAcervo();
    });
    return unsubscribe;
  }, [navigation]);

  const livrosFiltrados = useMemo(() => {
    const buscaLower = busca.trim().toLowerCase();
    const minNum =
      precoMin === "" ? null : parseFloat(String(precoMin).replace(",", "."));
    const maxNum =
      precoMax === "" ? null : parseFloat(String(precoMax).replace(",", "."));

    return livros.filter((livro) => {
      const bateBusca =
        buscaLower === "" ||
        livro.titulo.toLowerCase().includes(buscaLower) ||
        livro.autor.toLowerCase().includes(buscaLower);

      const bateCategoria =
        !categoriaSelecionada ||
        categoriaSelecionada === "" ||
        (livro.categoria &&
          livro.categoria.trim().toLowerCase() ===
            categoriaSelecionada.trim().toLowerCase());

      const batePrecoMin =
        minNum == null || isNaN(minNum) || livro.preco >= minNum;
      const batePrecoMax =
        maxNum == null || isNaN(maxNum) || livro.preco <= maxNum;

      return bateBusca && bateCategoria && batePrecoMin && batePrecoMax;
    });
  }, [livros, busca, categoriaSelecionada, precoMin, precoMax]);

  function abrirProduto(livro) {
    navigation.navigate("Produto", { produto: livro });
  }

  function handleAdicionar(livro) {
    adicionarItem(livro);
    Alert.alert("Sucesso", "Livro adicionado ao carrinho!");
  }

  function handleEditar(livro) {
    navigation.navigate("Anunciar", { produto: livro });
  }

  // 2. DELETE: Apagar o livro no Back-end
  async function handleApagar(livro) {
    try {
      const resposta = await fetch(`http://192.168.0.58:3000/api/produtos/${livro.id_produto}`, {
        method: 'DELETE',
      });

      if (resposta.ok) {
        setLivros((atual) => atual.filter((l) => l.id_produto !== livro.id_produto));
        Alert.alert("Sucesso", "Livro apagado com sucesso!");
      } else {
        Alert.alert("Erro", "Não foi possível apagar o anúncio no servidor.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Falha ao conectar com o servidor.");
    }
  }

  function handleAplicarFiltro({ categoria, min, max }) {
    setCategoriaSelecionada(categoria);
    setPrecoMin(min);
    setPrecoMax(max);
  }

  return (
    <View style={styles.tela}>
      <Header
        navigation={navigation}
        busca={busca}
        setBusca={setBusca}
        onAbrirCategorias={() => setFiltroVisivel(true)}
        linksRapidos={LINKS_RAPIDOS}
        onSelecionarLink={() => {}}
      />

      <FlatList
        data={livrosFiltrados}
        keyExtractor={(item) => String(item.id_produto)}
        contentContainerStyle={styles.scrollContent}
        ListHeaderComponent={
          <>
            <Text style={styles.tituloTopo}>
              Veja o que temos em nosso acervo
            </Text>

            <View style={styles.barraFiltro}>
              <Text style={styles.contadorTexto}>
                {livrosFiltrados.length}{" "}
                {livrosFiltrados.length === 1 ? "resultado" : "resultados"}
              </Text>
              <TouchableOpacity
                style={styles.btnFiltros}
                onPress={() => setFiltroVisivel(true)}
              >
                <Ionicons name="options-outline" size={16} color={CORES.dark} />
                <Text style={styles.btnFiltrosTexto}>Filtros</Text>
              </TouchableOpacity>
            </View>
          </>
        }
        renderItem={({ item }) => (
          <AcervoCard
            livro={item}
            usuarioLogado={usuarioLogado}
            onPress={abrirProduto}
            onAdicionar={handleAdicionar}
            onEditar={handleEditar}
            onApagar={handleApagar}
          />
        )}
        ListEmptyComponent={
          <View style={styles.listaVazia}>
            <Text style={styles.listaVaziaTexto}>
              Nenhum livro encontrado no servidor.
            </Text>
          </View>
        }
        ListFooterComponent={<Footer />}
      />

      <FiltroAcervoModal
        visible={filtroVisivel}
        onFechar={() => setFiltroVisivel(false)}
        categoriaSelecionada={categoriaSelecionada}
        precoMin={precoMin}
        precoMax={precoMax}
        onAplicar={handleAplicarFiltro}
      />
    </View>
  );
}