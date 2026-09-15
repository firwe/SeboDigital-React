import React, { useState, useMemo } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Header from "../components/global/Header";
import Footer from "../components/global/Footer";
import AcervoCard from "../components/cards/AcervoCard"; // Reaproveitando o card!
import FiltroColecoesModal from "../components/modals/FiltroColecoesModal";

import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { CORES, FONTES } from "../constants/themes";
import { LINKS_RAPIDOS } from "../constants/Navbar";
import { styles as acervoStyles } from "../styles/acervoStyles"; // Reaproveitando estilos base

// ============================================================================
// DADOS MOCKADOS — Coleções
// ============================================================================
const MOCK_COLECOES = [
  {
    id_produto: 101,
    titulo: "Box Harry Potter - Série Completa",
    autor: "J.K. Rowling",
    preco: 250.0,
    categoria: "Coleção Exclusiva",
    imagemBase64: null,
    dono: { id_usuario: 1, nome: "Você" },
  },
  {
    id_produto: 102,
    titulo: "Box O Senhor dos Anéis",
    autor: "J.R.R. Tolkien",
    preco: 180.5,
    categoria: "Coleção Exclusiva",
    imagemBase64: null,
    dono: { id_usuario: 2, nome: "Outro usuário" },
  },
  {
    id_produto: 103,
    titulo: "As Crônicas de Gelo e Fogo",
    autor: "George R.R. Martin",
    preco: 310.0,
    categoria: "Coleção Exclusiva",
    imagemBase64: null,
    dono: null, // Anúncio oficial da plataforma
  },
];

export default function TelaColecoes({ navigation }) {
  const { adicionarItem } = useCart();
  const { usuarioLogado } = useAuth();

  const [colecoes, setColecoes] = useState(MOCK_COLECOES);
  const [buscaBarra, setBuscaBarra] = useState(""); // Busca rápida do Header
  
  // Estados do Modal de Filtro
  const [filtroTitulo, setFiltroTitulo] = useState("");
  const [filtroAutor, setFiltroAutor] = useState("");
  const [precoMin, setPrecoMin] = useState("");
  const [precoMax, setPrecoMax] = useState("");
  const [filtroVisivel, setFiltroVisivel] = useState(false);

  const colecoesFiltradas = useMemo(() => {
    const buscaLower = buscaBarra.trim().toLowerCase();
    const tituloLower = filtroTitulo.trim().toLowerCase();
    const autorLower = filtroAutor.trim().toLowerCase();
    
    const minNum = precoMin === "" ? null : parseFloat(String(precoMin).replace(",", "."));
    const maxNum = precoMax === "" ? null : parseFloat(String(precoMax).replace(",", "."));

    return colecoes.filter((item) => {
      // A busca da barra superior procura tanto no titulo quanto no autor
      const bateBuscaBarra =
        buscaLower === "" ||
        item.titulo.toLowerCase().includes(buscaLower) ||
        item.autor.toLowerCase().includes(buscaLower);

      // Filtros específicos do modal
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
  }

  function handleEditar(livro) {
    // navigation.navigate("EditarProduto", { produto: livro });
  }

  function handleApagar(livro) {
    setColecoes((atual) => atual.filter((c) => c.id_produto !== livro.id_produto));
  }

  function handleAplicarFiltro({ titulo, autor, min, max }) {
    setFiltroTitulo(titulo);
    setFiltroAutor(autor);
    setPrecoMin(min);
    setPrecoMax(max);
  }

  function selecionarLinkRapido(label) {}

  return (
    <View style={acervoStyles.tela}>
      <Header
        navigation={navigation}
        busca={buscaBarra}
        setBusca={setBuscaBarra}
        onAbrirCategorias={() => setFiltroVisivel(true)}
        linksRapidos={LINKS_RAPIDOS}
        onSelecionarLink={selecionarLinkRapido}
      />

      <FlatList
        data={colecoesFiltradas}
        keyExtractor={(item) => String(item.id_produto)}
        contentContainerStyle={acervoStyles.scrollContent}
        
        ListHeaderComponent={
          <>
            <Text style={acervoStyles.tituloTopo}>Coleções e Boxes</Text>
            
            {/* Texto Descritivo Exclusivo desta Tela */}
            <Text style={styles.textoDescritivo}>
              Explore conjuntos de obras selecionadas, sagas completas e boxes exclusivos. Perfeito para quem deseja completar sua estante com edições especiais.
            </Text>

            <View style={acervoStyles.barraFiltro}>
              <Text style={acervoStyles.contadorTexto}>
                {colecoesFiltradas.length} {colecoesFiltradas.length === 1 ? "resultado" : "resultados"}
              </Text>
              <TouchableOpacity style={acervoStyles.btnFiltros} onPress={() => setFiltroVisivel(true)}>
                <Ionicons name="options-outline" size={16} color={CORES.dark} />
                <Text style={acervoStyles.btnFiltrosTexto}>Filtros</Text>
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
          <View style={acervoStyles.listaVazia}>
            <Text style={acervoStyles.listaVaziaTexto}>Nenhuma coleção encontrada com esses filtros.</Text>
          </View>
        }

        ListFooterComponent={<Footer />}
      />

      <FiltroColecoesModal
        visible={filtroVisivel}
        onFechar={() => setFiltroVisivel(false)}
        tituloSalvo={filtroTitulo}
        autorSalvo={filtroAutor}
        precoMin={precoMin}
        precoMax={precoMax}
        onAplicar={handleAplicarFiltro}
      />
    </View>
  );
}

// Estilos extras específicos para a tela de Coleções
const styles = StyleSheet.create({
  textoDescritivo: {
    paddingHorizontal: 16,
    marginBottom: 20,
    color: CORES.muted || "#64748b",
    fontSize: 15,
    lineHeight: 22,
  }
});