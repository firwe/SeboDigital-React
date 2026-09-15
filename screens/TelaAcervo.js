import React, { useState, useMemo } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
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

// ============================================================================
// DADOS MOCKADOS — troque por:
//   fetch(`https://SEU_BACKEND/api/produtos?busca=&categoria=&min=&max=`)
// quando o back estiver disponível (dentro de um useEffect no lugar do useState
// abaixo). id_produto e dono.id_usuario já vêm prontos pra bater com a regra
// de permissão (dono vs admin) usada no AcervoCard.
// ============================================================================
const MOCK_ACERVO = [
  {
    id_produto: 1,
    titulo: "Dom Casmurro",
    autor: "Machado de Assis",
    preco: 29.9,
    categoria: "Literatura Brasileira",
    imagemBase64: null,
    dono: { id_usuario: 1, nome: "Você" },
  },
  {
    id_produto: 2,
    titulo: "O Cortiço",
    autor: "Aluísio Azevedo",
    preco: 24.5,
    categoria: "Literatura Brasileira",
    imagemBase64: null,
    dono: { id_usuario: 2, nome: "Outro usuário" },
  },
  {
    id_produto: 3,
    titulo: "Berserk Vol. 1",
    autor: "Kentaro Miura",
    preco: 39.9,
    categoria: "Mangás",
    imagemBase64: null,
    dono: { id_usuario: 2, nome: "Outro usuário" },
  },
  {
    id_produto: 4,
    titulo: "1984",
    autor: "George Orwell",
    preco: 32.0,
    categoria: "Ficção",
    imagemBase64: null,
    dono: { id_usuario: 1, nome: "Você" },
  },
  {
    id_produto: 5,
    titulo: "O Iluminado",
    autor: "Stephen King",
    preco: 27.9,
    categoria: "Terror",
    imagemBase64: null,
    dono: { id_usuario: 3, nome: "Outro usuário" },
  },
  {
    id_produto: 6,
    titulo: "E.T.A: Escritos sobre o insólito",
    autor: "Vários Autores",
    preco: 18.0,
    categoria: "Poesia",
    imagemBase64: null,
    dono: null, // anúncio da própria plataforma — só admin pode gerenciar
  },
];

export default function TelaAcervo({ navigation }) {
  const route = useRoute();
  const { adicionarItem } = useCart();
  const { usuarioLogado } = useAuth();

  const [livros, setLivros] = useState(MOCK_ACERVO);
  const [busca, setBusca] = useState("");
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(route.params?.categoria || "");
  const [precoMin, setPrecoMin] = useState("");
  const [precoMax, setPrecoMax] = useState("");
  const [filtroVisivel, setFiltroVisivel] = useState(false);

  const livrosFiltrados = useMemo(() => {
    const buscaLower = busca.trim().toLowerCase();
    const minNum = precoMin === "" ? null : parseFloat(String(precoMin).replace(",", "."));
    const maxNum = precoMax === "" ? null : parseFloat(String(precoMax).replace(",", "."));

    return livros.filter((livro) => {
      const bateBusca =
        buscaLower === "" ||
        livro.titulo.toLowerCase().includes(buscaLower) ||
        livro.autor.toLowerCase().includes(buscaLower);

      // CORREÇÃO AQUI: Garante que se veio uma categoria da rota, ela bate com o livro.
      // Usamos .trim() para evitar problemas com espaços extras.
      const bateCategoria = 
        !categoriaSelecionada || 
        categoriaSelecionada === "" || 
        (livro.categoria && livro.categoria.trim().toLowerCase() === categoriaSelecionada.trim().toLowerCase());

      const batePrecoMin = minNum == null || isNaN(minNum) || livro.preco >= minNum;
      const batePrecoMax = maxNum == null || isNaN(maxNum) || livro.preco <= maxNum;

      return bateBusca && bateCategoria && batePrecoMin && batePrecoMax;
    });
  }, [livros, busca, categoriaSelecionada, precoMin, precoMax]);

  function abrirProduto(livro) {
    navigation.navigate("Produto", { produto: livro });
  }

  function handleAdicionar(livro) {
    adicionarItem(livro);
  }

  function handleEditar(livro) {
    // Tela "EditarProduto" ainda não existe — deixar pronto pra quando migrarmos ela:
    // navigation.navigate("EditarProduto", { produto: livro });
  }

  function handleApagar(livro) {
    // Mock local. Quando o back estiver pronto, troque por:
    // await fetch(`.../api/produtos/${livro.id_produto}`, { method: "DELETE" })
    setLivros((atual) => atual.filter((l) => l.id_produto !== livro.id_produto));
  }

  function handleAplicarFiltro({ categoria, min, max }) {
    setCategoriaSelecionada(categoria);
    setPrecoMin(min);
    setPrecoMax(max);
  }

  function selecionarLinkRapido(label) {
    // "Coleções" -> Colecoes | "Desapega Uni" -> Desapega | "Anuncie seu livro!" -> Anunciar
    // ainda não migradas, sem ação por enquanto.
  }

  return (
    <View style={styles.tela}>
      <Header
        navigation={navigation}
        busca={busca}
        setBusca={setBusca}
        onAbrirCategorias={() => setFiltroVisivel(true)}
        linksRapidos={LINKS_RAPIDOS}
        onSelecionarLink={selecionarLinkRapido}
      />

      <FlatList
        data={livrosFiltrados}
        keyExtractor={(item) => String(item.id_produto)}
        contentContainerStyle={styles.scrollContent}
        
        // Componente do Topo (Título e barra de filtro)
        ListHeaderComponent={
          <>
            <Text style={styles.tituloTopo}>Veja o que temos em nosso acervo</Text>

            <View style={styles.barraFiltro}>
              <Text style={styles.contadorTexto}>
                {livrosFiltrados.length} {livrosFiltrados.length === 1 ? "resultado" : "resultados"}
              </Text>
              <TouchableOpacity style={styles.btnFiltros} onPress={() => setFiltroVisivel(true)}>
                <Ionicons name="options-outline" size={16} color={CORES.dark} />
                <Text style={styles.btnFiltrosTexto}>Filtros</Text>
              </TouchableOpacity>
            </View>
          </>
        }

        // Renderização individual dos Cards
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

        // Componente de Lista Vazia
        ListEmptyComponent={
          <View style={styles.listaVazia}>
            <Text style={styles.listaVaziaTexto}>Nenhum livro encontrado com esses filtros.</Text>
          </View>
        }

        // Componente do Rodapé (Footer)
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