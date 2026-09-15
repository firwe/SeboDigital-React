import React, { useState } from "react";
import { View, ScrollView, FlatList, Text } from "react-native";
import HeaderHome from "../components/global/Header";
import CategoriasModal from "../components/modals/CategoriasModal";
import Carrossel from "../components/ui/Carrossel";
import LivroCard from "../components/cards/LivroCard";
import CategoriaCard from "../components/cards/CategoriaCard";
import FooterHome from "../components/global/Footer";
import { styles } from "../styles/homeStyles";
import { CATEGORIAS, LINKS_RAPIDOS } from "../constants/Navbar";

// ============================================================================
// DADOS MOCKADOS — troque por fetch('https://SEU_BACKEND/api/produtos') e
// fetch('.../api/produtos?categoria=Mangás') quando o back estiver disponível
// (ex: dentro de um useEffect no lugar dessas constantes).
// ============================================================================

const PRODUTOS_DESTAQUE = [
  {
    id: 1,
    titulo: "Dom Casmurro",
    autor: "Machado de Assis",
    preco: 29.9,
    categoria: "Literatura Brasileira",
    editora: "Companhia das Letras",
    anoPublicacao: 1899,
    conservacao: "Bom estado",
    descricao: "Clássico da literatura brasileira, narrado por Bentinho, que revive a infância, o casamento com Capitu e a dúvida que o atormenta até o fim.",
  },
  {
    id: 2,
    titulo: "O Cortiço",
    autor: "Aluísio Azevedo",
    preco: 24.5,
    categoria: "Literatura Brasileira",
    editora: "Ática",
    anoPublicacao: 1890,
    conservacao: "Usado - bom estado",
    descricao: "Retrato naturalista da vida num cortiço carioca, acompanhando os moradores e as tensões sociais do Rio de Janeiro do século XIX.",
  },
  {
    id: 3,
    titulo: "Vidas Secas",
    autor: "Graciliano Ramos",
    preco: 22.0,
    categoria: "Literatura Brasileira",
    editora: "Record",
    anoPublicacao: 1938,
    conservacao: "Seminovo",
    descricao: "A saga de uma família de retirantes fugindo da seca no sertão nordestino, num dos maiores clássicos do regionalismo brasileiro.",
  },
  {
    id: 4,
    titulo: "Grande Sertão: Veredas",
    autor: "Guimarães Rosa",
    preco: 34.9,
    categoria: "Literatura Brasileira",
    editora: "Nova Fronteira",
    anoPublicacao: 1956,
    conservacao: "Bom estado",
    descricao: "Riobaldo narra sua vida de jagunço no sertão, misturando aventura, amor e uma linguagem que reinventou a prosa brasileira.",
  },
  {
    id: 5,
    titulo: "Iracema",
    autor: "José de Alencar",
    preco: 19.9,
    categoria: "Literatura Brasileira",
    editora: "Ática",
    anoPublicacao: 1865,
    conservacao: "Usado",
    descricao: "Lenda romântica sobre o amor entre a índia Iracema e o colonizador português Martim, ambientada no Ceará colonial.",
  },
];

const MANGAS_DESTAQUE = [
  {
    id: 101,
    titulo: "Berserk Vol. 1",
    autor: "Kentaro Miura",
    preco: 39.9,
    categoria: "Mangás",
    editora: "Panini",
    anoPublicacao: 1989,
    conservacao: "Novo",
    descricao: "Primeiro volume da saga sombria de Guts, o Espadachim Negro, numa jornada de vingança num mundo medieval brutal.",
  },
  {
    id: 102,
    titulo: "One Piece Vol. 12",
    autor: "Eiichiro Oda",
    preco: 24.9,
    categoria: "Mangás",
    editora: "Panini",
    anoPublicacao: 1999,
    conservacao: "Bom estado",
    descricao: "Luffy e a tripulação do Chapéu de Palha seguem em busca do maior tesouro dos mares nesta clássica saga shonen.",
  },
  {
    id: 103,
    titulo: "Vagabond Vol. 3",
    autor: "Takehiko Inoue",
    preco: 32.9,
    categoria: "Mangás",
    editora: "Panini",
    anoPublicacao: 1998,
    conservacao: "Seminovo",
    descricao: "Inspirado na vida do samurai Musashi Miyamoto, com uma arte reconhecida como uma das mais belas do mangá.",
  },
  {
    id: 104,
    titulo: "Vinland Saga Vol. 1",
    autor: "Makoto Yukimura",
    preco: 44.9,
    categoria: "Mangás",
    editora: "Panini",
    anoPublicacao: 2005,
    conservacao: "Novo",
    descricao: "Thorfinn cresce entre vikings sedentos por batalha, numa história sobre vingança, guerra e a busca por um lugar de paz.",
  },
];

const SLIDES = [
  {
    titulo: "Bem-vindo ao Sebo Digital",
    texto: "O maior acervo colaborativo de livros literários e acadêmicos.",
    cta: "Explorar Acervo",
    cor: "#1e293b",
  },
  {
    titulo: "Iniciativa Desapega Uni",
    texto: "Economia colaborativa de verdade. Materiais de faculdade com preços acessíveis.",
    cta: "Ver Áreas Acadêmicas",
    cor: "#0f172a",
  },
  {
    titulo: "Frete Grátis Reciclado",
    texto: "Nas compras acima de R$ 150,00, o frete é por nossa conta.",
    cta: "Aproveitar Agora",
    cor: "#111827",
  },
];

export default function TelaHome({ navigation }) {
  const [busca, setBusca] = useState("");
  const [modalCategoriasVisivel, setModalCategoriasVisivel] = useState(false);

  function abrirProduto(livro) {
    navigation.navigate("Produto", { produto: livro });
  }

  // CORREÇÃO AQUI: Faz o redirecionamento correto ao clicar em uma categoria na Home
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
      <HeaderHome
        navigation={navigation}
        busca={busca}
        setBusca={setBusca}
        linksRapidos={LINKS_RAPIDOS}
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Carrossel 
          slides={SLIDES} 
          onPressCta={() => navigation.navigate("Acervo")} 
        />

        <View style={styles.secao}>
          <Text style={styles.secaoTitulo}>Destaques do Acervo</Text>
          <FlatList
            data={PRODUTOS_DESTAQUE}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => <LivroCard livro={item} onPress={abrirProduto} />}
          />
        </View>

        <View style={styles.secao}>
          <Text style={styles.secaoTitulo}>Mundo Geek: Mangás em Destaque</Text>
          <FlatList
            data={MANGAS_DESTAQUE}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => <LivroCard livro={item} onPress={abrirProduto} />}
          />
        </View>

        <View style={styles.secaoCategorias}>
          <Text style={styles.secaoTitulo}>Navegue por Categorias</Text>
          <View style={styles.categoriasGrid}>
            {CATEGORIAS.map((cat) => (
              <CategoriaCard key={cat} nome={cat} onPress={selecionarCategoria} />
            ))}
            <CategoriaCard nome="Desapega Uni" onPress={selecionarCategoria} destaque />
          </View>
        </View>

        <FooterHome />
      </ScrollView>

      <CategoriasModal
        visible={modalCategoriasVisivel}
        onFechar={() => setModalCategoriasVisivel(false)}
        categorias={CATEGORIAS}
        onSelecionar={selecionarCategoria}
      />
    </View>
  );
}