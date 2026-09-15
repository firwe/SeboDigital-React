import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, TextInput, Image, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Header from "../components/global/Header";
import Footer from "../components/global/Footer";
import CategoriasModal from "../components/modals/CategoriasModal";
import Botao from "../components/ui/Button";

import { useCart } from "../context/CartContext"; // <-- Importando o carrinho de verdade!
import { CORES } from "../constants/themes";
import { styles } from "../styles/produtoStyles";
import { CATEGORIAS, LINKS_RAPIDOS } from "../constants/Navbar";

export default function TelaProduto({ navigation, route }) {
  const { produto } = route.params || {};
  const { adicionarItem } = useCart(); // <-- Hook do carrinho

  const [busca, setBusca] = useState("");
  const [modalCategoriasVisivel, setModalCategoriasVisivel] = useState(false);

  const [cep, setCep] = useState("");
  const [calculandoFrete, setCalculandoFrete] = useState(false);
  const [frete, setFrete] = useState(null);

  // Navegação inteligente pelas categorias do modal da tela
  function selecionarCategoria(categoria) {
    setModalCategoriasVisivel(false);
    if (categoria === "Desapega Uni") {
      navigation.navigate("Desapega");
    } else {
      navigation.navigate("Acervo", { categoria: categoria });
    }
  }

  function calcularFrete() {
    const digitos = cep.replace(/\D/g, "");
    if (digitos.length !== 8) {
      Alert.alert("CEP inválido", "Digite um CEP com 8 dígitos.");
      return;
    }

    setCalculandoFrete(true);
    setFrete(null);

    // Simulação de cálculo de frete (trocar por fetch futuramente)
    setTimeout(() => {
      setFrete({ valor: 14.9, prazo: "3 a 5 dias úteis" });
      setCalculandoFrete(false);
    }, 600);
  }

  // ADICIONAR AO CARRINHO DE VERDADE
  function adicionarAoCarrinho() {
    if (produto) {
      adicionarItem(produto);
      Alert.alert("Sucesso!", "Produto adicionado ao carrinho.");
      navigation.navigate("Carrinho"); // Opcional: já leva o usuário pro carrinho
    }
  }

  if (!produto) {
    return (
      <View style={styles.tela}>
        <Header
          navigation={navigation}
          busca={busca}
          setBusca={setBusca}
          linksRapidos={LINKS_RAPIDOS}
        />
        <View style={styles.vazioContainer}>
          <Text style={styles.vazioTexto}>Não encontramos esse produto.</Text>
        </View>
        <Footer />
      </View>
    );
  }

  // Trata se a imagem vem em base64 ou uri direta
  const imagemSrc = produto.imagemBase64 
    ? { uri: `data:image/jpeg;base64,${produto.imagemBase64}` } 
    : produto.imagem 
    ? { uri: produto.imagem } 
    : null;

  return (
    <View style={styles.tela}>
      <Header
        navigation={navigation}
        busca={busca}
        setBusca={setBusca}
        linksRapidos={LINKS_RAPIDOS}
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity style={styles.breadcrumb} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={16} color={CORES.muted} />
          <Text style={styles.breadcrumbTexto}>Voltar para a listagem</Text>
        </TouchableOpacity>

        {/* Exibição da Imagem (Mostra a foto real se houver, senão mostra o fallback estético) */}
        <View style={styles.imagemContainer}>
          {imagemSrc ? (
            <Image source={imagemSrc} style={{ width: "100%", height: "100%", resizeMode: "cover" }} />
          ) : (
            <>
              <Text style={styles.imagemSelo}>Sebo Digital</Text>
              <Text style={styles.imagemTitulo}>{produto.titulo}</Text>
              <View style={styles.imagemDivisor} />
              <Text style={styles.imagemAutor}>{produto.autor}</Text>
            </>
          )}
        </View>

        <Text style={styles.categoriaTexto}>{produto.categoria || "Categoria não informada"}</Text>
        <Text style={styles.titulo}>{produto.titulo}</Text>
        <Text style={styles.preco}>R$ {Number(produto.preco).toFixed(2).replace(".", ",")}</Text>

        <View style={styles.especificacoesBox}>
          <Text style={styles.especTitulo}>Especificações</Text>
          <View style={styles.especLinha}>
            <Text style={styles.especLabel}>Autor:</Text>
            <Text style={styles.especValor}>{produto.autor}</Text>
          </View>
          <View style={styles.especLinha}>
            <Text style={styles.especLabel}>Editora:</Text>
            <Text style={styles.especValor}>{produto.editora || "Não informada"}</Text>
          </View>
          <View style={styles.especLinha}>
            <Text style={styles.especLabel}>Ano:</Text>
            <Text style={styles.especValor}>{produto.anoPublicacao || "Não informado"}</Text>
          </View>
          <View style={styles.especLinha}>
            <Text style={styles.especLabel}>Conservação:</Text>
            <Text style={styles.especValor}>{produto.conservacao || "Não informada"}</Text>
          </View>
        </View>

        <View style={styles.descricaoBox}>
          <Text style={styles.descricaoTitulo}>Descrição</Text>
          <Text style={styles.descricaoTexto}>
            {produto.descricao || "O anunciante não forneceu uma descrição detalhada."}
          </Text>
        </View>

        <View style={styles.freteBox}>
          <Text style={styles.freteLabel}>Simular Frete e Prazo</Text>
          <View style={styles.freteLinha}>
            <TextInput
              style={styles.freteInput}
              placeholder="00000-000"
              placeholderTextColor="#94a3b8"
              keyboardType="numeric"
              maxLength={9}
              value={cep}
              onChangeText={setCep}
            />
            <TouchableOpacity style={styles.freteBotao} onPress={calcularFrete}>
              <Text style={styles.freteBotaoTexto}>{calculandoFrete ? "Calculando..." : "Calcular"}</Text>
            </TouchableOpacity>
          </View>

          {frete && (
            <View style={styles.freteResultado}>
              <View style={styles.freteResultadoLinha}>
                <Text style={styles.freteResultadoFrete}>🚚 Frete Expresso</Text>
                <Text style={styles.freteResultadoValor}>
                  R$ {frete.valor.toFixed(2).replace(".", ",")}
                </Text>
              </View>
              <Text style={styles.fretePrazo}>Chega em: {frete.prazo}</Text>
            </View>
          )}
        </View>

        <Botao onPress={adicionarAoCarrinho}>Adicionar ao Carrinho</Botao>
      </ScrollView>

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