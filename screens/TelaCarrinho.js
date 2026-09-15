import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Header from "../components/global/Header";
import Footer from "../components/global/Footer";
import CategoriasModal from "../components/modals/CategoriasModal";
import { CORES } from "../constants/themes";
import { styles } from "../styles/carrinhoStyles";
import { CATEGORIAS, LINKS_RAPIDOS } from "../constants/Navbar";
import { useCart } from "../context/CartContext";

function iniciais(titulo) {
  return titulo.split(" ").slice(0, 2).map((p) => p[0]).join("");
}

export default function TelaCarrinho({ navigation }) {
  const { itens, removerItem, total } = useCart();
    
  const [busca, setBusca] = useState("");
  const [modalCategoriasVisivel, setModalCategoriasVisivel] = useState(false);

  function selecionarCategoria(categoria) {
    setModalCategoriasVisivel(false);
      
  }

  function selecionarLinkRapido(label) {
    // Mesmos placeholders das outras telas
  }

  function finalizarCompra() {
    navigation.replace("Final");
  }

  return (
    <View style={styles.tela}>
      <Header
        navigation={navigation}
        busca={busca}
        setBusca={setBusca}
        onAbrirCategorias={() => setModalCategoriasVisivel(true)}
        linksRapidos={LINKS_RAPIDOS}
        onSelecionarLink={selecionarLinkRapido}
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity style={styles.breadcrumb} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={16} color={CORES.muted} />
          <Text style={styles.breadcrumbTexto}>Continuar Comprando</Text>
        </TouchableOpacity>

        <Text style={styles.tituloPagina}>Meu Carrinho</Text>

        {itens.length === 0 ? (
          <View style={styles.vazioContainer}>
            <Text style={styles.vazioTexto}>Seu carrinho está vazio.</Text>
          </View>
        ) : (
          <>
            {itens.map((item, index) => (
              <View key={item.id ?? index} style={styles.cardItem}>
                <View style={styles.itemImagem}>
                  <Text style={styles.itemImagemTexto}>{iniciais(item.titulo)}</Text>
                </View>

                <View style={styles.itemInfo}>
                  <Text style={styles.itemCategoria}>{item.categoria}</Text>
                  <Text style={styles.itemTitulo} numberOfLines={2}>{item.titulo}</Text>
                  <Text style={styles.itemPreco}>
                    R$ {item.preco.toFixed(2).replace(".", ",")}
                  </Text>

                  <TouchableOpacity style={styles.removerBotao} onPress={() => removerItem(index)}>
                    <Text style={styles.removerTexto}>Remover item</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}

            <View style={styles.resumoCard}>
              <Text style={styles.resumoTitulo}>Resumo</Text>

              <View style={styles.resumoLinha}>
                <Text style={styles.resumoLabel}>Produtos ({itens.length})</Text>
                <Text style={styles.resumoValor}>R$ {total.toFixed(2).replace(".", ",")}</Text>
              </View>

              <View style={styles.resumoLinha}>
                <Text style={styles.resumoLabel}>Frete</Text>
                <Text style={styles.freteValor}>Grátis</Text>
              </View>

              <View style={styles.divisor} />

              <View style={styles.totalLinha}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValor}>R$ {total.toFixed(2).replace(".", ",")}</Text>
              </View>

              <TouchableOpacity style={styles.finalizarBotao} onPress={finalizarCompra}>
                <Text style={styles.finalizarTexto}>Finalizar Compra</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
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