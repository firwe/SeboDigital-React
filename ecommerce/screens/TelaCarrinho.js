import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Header from "../components/global/Header";
import Footer from "../components/global/Footer";
import CategoriasModal from "../components/modals/CategoriasModal";
import { CORES } from "../constants/themes";
import { styles } from "../styles/carrinhoStyles";
import { CATEGORIAS, LINKS_RAPIDOS } from "../constants/Navbar";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

function iniciais(titulo) {
  if (!titulo) return "PD";
  return titulo.split(" ").slice(0, 2).map((p) => p[0]).join("");
}

export default function TelaCarrinho({ navigation }) {
  const { carrinho, itens = [], removerDoCarrinho, limparCarrinho } = useCart();
  const { usuarioLogado } = useAuth();
    
  const [busca, setBusca] = useState("");
  const [modalCategoriasVisivel, setModalCategoriasVisivel] = useState(false);
  const [processandoPagamento, setProcessandoPagamento] = useState(false);

  function selecionarCategoria(categoria) {
    setModalCategoriasVisivel(false);
    if (categoria === "Desapega Uni") {
      navigation.navigate("Desapega");
    } else {
      navigation.navigate("Acervo", { categoria: categoria });
    }
  }

  function selecionarLinkRapido(label) {}

  // Calcula o valor total em reais vindo de centavos ou do objeto carrinho
  const totalEmCentavos = carrinho?.valorTotalEmCentavos || 0;
  const totalCalculado = totalEmCentavos > 0 
    ? (totalEmCentavos / 100) 
    : itens.reduce((acc, item) => {
        const precoItem = (item.precoEmCentavos ? item.precoEmCentavos / 100 : item.preco) || 0;
        return acc + (precoItem * (item.quantidade || 1));
      }, 0);

  // Integração do Checkout com a rota do Mercado Pago (Padrão Professor)
  async function finalizarCompra() {
    if (itens.length === 0) return;

    setProcessandoPagamento(true);
    try {
      const userId = usuarioLogado?.id || usuarioLogado?.id_usuario || 'guest';
      const resposta = await fetch('http://192.168.0.58:3000/api/payments/mercadopago', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': String(userId)
        }
      });

      const json = await resposta.json();

      if (json.success && (json.url || json.init_point)) {
        const paymentUrl = json.url || json.init_point;
        
        // Limpa o carrinho local no backend após iniciar o pedido
        await limparCarrinho();
        
        // Redireciona para a WebView do Mercado Pago
        navigation.navigate("Pagamento", { paymentUrl });
      } else {
        Alert.alert("Erro", json.error?.message || "Não foi possível iniciar o pagamento.");
      }
    } catch (error) {
      Alert.alert("Erro de Conexão", "Falha ao conectar com o servidor de pagamento.");
      console.error(error);
    } finally {
      setProcessandoPagamento(false);
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
            {itens.map((item, index) => {
              const idParaRemover = item.produtoId || item.productId || item.id || index;
              const tituloExibido = item.nomeProduto || item.name || item.titulo || "Produto";
              const precoUnitario = (item.precoEmCentavos ? item.precoEmCentavos / 100 : item.preco) || 0;

              return (
                <View key={idParaRemover} style={styles.cardItem}>
                  <View style={styles.itemImagem}>
                    <Text style={styles.itemImagemTexto}>{iniciais(tituloExibido)}</Text>
                  </View>

                  <View style={styles.itemInfo}>
                    <Text style={styles.itemCategoria}>{item.categoria || "Geral"}</Text>
                    <Text style={styles.itemTitulo} numberOfLines={2}>{tituloExibido}</Text>
                    <Text style={styles.itemPreco}>
                      R$ {precoUnitario.toFixed(2).replace(".", ",")}
                      {item.quantidade > 1 && ` (${item.quantidade}x)`}
                    </Text>

                    <TouchableOpacity 
                      style={styles.removerBotao} 
                      onPress={() => removerDoCarrinho(idParaRemover)}
                    >
                      <Text style={styles.removerTexto}>Remover item</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}

            <View style={styles.resumoCard}>
              <Text style={styles.resumoTitulo}>Resumo</Text>

              <View style={styles.resumoLinha}>
                <Text style={styles.resumoLabel}>Produtos ({itens.length})</Text>
                <Text style={styles.resumoValor}>R$ {totalCalculado.toFixed(2).replace(".", ",")}</Text>
              </View>

              <View style={styles.resumoLinha}>
                <Text style={styles.resumoLabel}>Frete</Text>
                <Text style={styles.freteValor}>Grátis</Text>
              </View>

              <View style={styles.divisor} />

              <View style={styles.totalLinha}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValor}>R$ {totalCalculado.toFixed(2).replace(".", ",")}</Text>
              </View>

              <TouchableOpacity 
                style={styles.finalizarBotao} 
                onPress={finalizarCompra}
                disabled={processandoPagamento}
              >
                <Text style={styles.finalizarTexto}>
                  {processandoPagamento ? "Processando..." : "Finalizar Compra"}
                </Text>
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