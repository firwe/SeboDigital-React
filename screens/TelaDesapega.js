import React, { useState, useMemo } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Header from "../components/global/Header";
import Footer from "../components/global/Footer";
import AcervoCard from "../components/cards/AcervoCard"; 
import FiltroDesapegaModal from "../components/modals/FiltroDesapegaModal";

import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { CORES } from "../constants/themes";
import { LINKS_RAPIDOS } from "../constants/Navbar";
import { styles as acervoStyles } from "../styles/acervoStyles"; 

// ============================================================================
// DADOS MOCKADOS — Desapega Uni
// ============================================================================
const MOCK_DESAPEGA = [
  {
    id_produto: 201,
    titulo: "Vade Mecum 2023",
    autor: "Editora Saraiva",
    preco: 85.0,
    categoria: "Direito", // Usando a área como categoria pro Card renderizar bonito
    imagemBase64: null,
    dono: { id_usuario: 4, nome: "João Silva" },
  },
  {
    id_produto: 202,
    titulo: "Cálculo - Volume 1",
    autor: "James Stewart",
    preco: 120.0,
    categoria: "Engenharia",
    imagemBase64: null,
    dono: { id_usuario: 5, nome: "Maria Oliveira" },
  },
  {
    id_produto: 203,
    titulo: "Anatomia Humana",
    autor: "Netter",
    preco: 190.5,
    categoria: "Medicina",
    imagemBase64: null,
    dono: { id_usuario: 1, nome: "Você" },
  },
];

export default function TelaDesapega({ navigation }) {
  const { adicionarItem } = useCart();
  const { usuarioLogado } = useAuth();

  const [livros, setLivros] = useState(MOCK_DESAPEGA);
  const [buscaBarra, setBuscaBarra] = useState(""); 
  
  // Estados do Modal
  const [areaSelecionada, setAreaSelecionada] = useState("");
  const [precoMin, setPrecoMin] = useState("");
  const [precoMax, setPrecoMax] = useState("");
  const [filtroVisivel, setFiltroVisivel] = useState(false);

  const livrosFiltrados = useMemo(() => {
    const buscaLower = buscaBarra.trim().toLowerCase();
    const minNum = precoMin === "" ? null : parseFloat(String(precoMin).replace(",", "."));
    const maxNum = precoMax === "" ? null : parseFloat(String(precoMax).replace(",", "."));

    return livros.filter((livro) => {
      const bateBusca =
        buscaLower === "" ||
        livro.titulo.toLowerCase().includes(buscaLower) ||
        livro.autor.toLowerCase().includes(buscaLower);

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
  }

  function handleEditar(livro) {
    // navigation.navigate("EditarProduto", { produto: livro });
  }

  function handleApagar(livro) {
    setLivros((atual) => atual.filter((l) => l.id_produto !== livro.id_produto));
  }

  function handleAplicarFiltro({ area, min, max }) {
    setAreaSelecionada(area);
    setPrecoMin(min);
    setPrecoMax(max);
  }

  return (
    <View style={acervoStyles.tela}>
      <Header
        navigation={navigation}
        busca={buscaBarra}
        setBusca={setBuscaBarra}
        onAbrirCategorias={() => setFiltroVisivel(true)}
        linksRapidos={LINKS_RAPIDOS}
      />

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
              <Text style={acervoStyles.contadorTexto}>
                {livrosFiltrados.length} {livrosFiltrados.length === 1 ? "resultado" : "resultados"}
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
            <Text style={acervoStyles.listaVaziaTexto}>Nenhum material encontrado com esses filtros.</Text>
          </View>
        }

        ListFooterComponent={<Footer />}
      />

      <FiltroDesapegaModal
        visible={filtroVisivel}
        onFechar={() => setFiltroVisivel(false)}
        areaSelecionada={areaSelecionada}
        precoMin={precoMin}
        precoMax={precoMax}
        onAplicar={handleAplicarFiltro}
      />
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
  }
});