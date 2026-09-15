import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import Header from "../components/global/Header";
import CategoriasModal from "../components/modals/CategoriasModal";
import Footer from "../components/global/Footer";
import Campo from "../components/ui/Campo";
import Alerta from "../components/ui/Alert";
import Botao from "../components/ui/Button";
import { styles } from "../styles/authStyles";
import { CATEGORIAS, LINKS_RAPIDOS } from "../constants/Navbar";

export default function TelaLogin({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState(false);
  const [busca, setBusca] = useState("");
  const [modalCategoriasVisivel, setModalCategoriasVisivel] = useState(false);

  function selecionarCategoria(categoria) {
    setModalCategoriasVisivel(false);
    // Tela "Acervo" ainda não existe:
    // navigation.navigate('Acervo', { categoria })
  }

  function selecionarLinkRapido(label) {
    // Cada um desses vai virar uma navegação quando as telas existirem:
    // "Explorar Acervo" -> Acervo | "Coleções" -> Colecoes
    // "Desapega Uni" -> Desapega | "Anuncie seu livro!" -> Anunciar
    // "Precisa de ajuda?" -> Ajuda
  }

  function handleEntrar() {
    if (!email || !senha) {
      setErro(true);
      return;
    }
    // Aqui entra a chamada real:
    // fetch('https://BACKEND/api/login', { method: 'POST', body: JSON.stringify({ email, senha }) })
    setErro(false);
    // navigation.navigate('Home') quando a tela Home estiver na stack
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
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <View style={styles.card}>
          <View style={styles.tabs}>
            <View style={[styles.tab, styles.tabAtiva]}>
              <Text style={[styles.tabTexto, styles.tabTextoAtivo]}>Login</Text>
            </View>
            <TouchableOpacity style={styles.tab} onPress={() => navigation.replace("Cadastro")}>
              <Text style={styles.tabTexto}>Cadastro</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.titulo}>Bem-vindo de volta!</Text>

          {erro && <Alerta tipo="erro">E-mail ou senha incorretos! Tente novamente.</Alerta>}

          <Campo
            label="E-mail"
            placeholder="seu@email.com"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
          <Campo
            label="Senha"
            placeholder="Digite sua senha"
            secureTextEntry
            value={senha}
            onChangeText={setSenha}
          />

          <Botao onPress={handleEntrar}>Entrar na conta</Botao>
        </View>
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