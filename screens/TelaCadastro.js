import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Header from "../components/global/Header";
import CategoriasModal from "../components/modals/CategoriasModal";
import Footer from "../components/global/Footer";
import Campo from "../components/ui/Campo";
import Alerta from "../components/ui/Alert";
import Botao from "../components/ui/Button";
import { CORES } from "../constants/themes";
import { styles } from "../styles/authStyles";
import { CATEGORIAS, LINKS_RAPIDOS } from "../constants/Navbar";

const ESTADOS = [
  { sigla: "AC", nome: "Acre" },
  { sigla: "AL", nome: "Alagoas" },
  { sigla: "SP", nome: "São Paulo" },
  { sigla: "RJ", nome: "Rio de Janeiro" },
  { sigla: "MG", nome: "Minas Gerais" },
];

export default function TelaCadastro({ navigation }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirma, setConfirma] = useState("");
  const [telefone, setTelefone] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [estado, setEstado] = useState("");
  const [cidade, setCidade] = useState("");
  const [aceitouTermos, setAceitouTermos] = useState(false);

  const [senhaCurta, setSenhaCurta] = useState(false);
  const [senhasDiferentes, setSenhasDiferentes] = useState(false);
  const [busca, setBusca] = useState("");
  const [modalCategoriasVisivel, setModalCategoriasVisivel] = useState(false);

  function selecionarCategoria(categoria) {
    setModalCategoriasVisivel(false);
  }

  function selecionarLinkRapido(label) {
  }

  function handleCadastrar() {
    if (senha.length < 6) {
      setSenhaCurta(true);
      setSenhasDiferentes(false);
      return;
    }
    if (senha !== confirma) {
      setSenhasDiferentes(true);
      setSenhaCurta(false);
      return;
    }
    setSenhaCurta(false);
    setSenhasDiferentes(false);
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
            <TouchableOpacity style={styles.tab} onPress={() => navigation.replace("Login")}>
              <Text style={styles.tabTexto}>Login</Text>
            </TouchableOpacity>
            <View style={[styles.tab, styles.tabAtiva]}>
              <Text style={[styles.tabTexto, styles.tabTextoAtivo]}>Cadastro</Text>
            </View>
          </View>

          <Text style={styles.titulo}>Crie sua conta</Text>
          <Text style={styles.subtitulo}>Junte-se à nossa comunidade de leitores.</Text>

          {senhaCurta && <Alerta tipo="erro">A senha deve ter no mínimo 6 dígitos.</Alerta>}
          {senhasDiferentes && <Alerta tipo="erro">As senhas não coincidem!</Alerta>}

          <Campo label="Nome completo*" placeholder="Seu nome" value={nome} onChangeText={setNome} />
          <Campo
            label="E-mail*"
            placeholder="seu@email.com"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
          <Campo
            label="Senha*"
            placeholder="Mínimo 6 dígitos"
            secureTextEntry
            value={senha}
            onChangeText={setSenha}
          />
          <Campo
            label="Confirme a senha*"
            placeholder="Repita a senha"
            secureTextEntry
            value={confirma}
            onChangeText={setConfirma}
          />
          <Campo
            label="Telefone*"
            placeholder="(00) 00000-0000"
            keyboardType="phone-pad"
            value={telefone}
            onChangeText={setTelefone}
          />
          <Campo
            label="Data de nascimento*"
            placeholder="DD/MM/AAAA"
            value={dataNascimento}
            onChangeText={setDataNascimento}
          />

          {
          }
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>Estado onde reside*</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {ESTADOS.map((e) => (
                <TouchableOpacity
                  key={e.sigla}
                  style={[styles.chip, estado === e.sigla && styles.chipAtivo]}
                  onPress={() => setEstado(e.sigla)}
                >
                  <Text style={[styles.chipTexto, estado === e.sigla && styles.chipTextoAtivo]}>
                    {e.nome}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <Campo label="Cidade*" placeholder="Sua cidade" value={cidade} onChangeText={setCidade} />

          <TouchableOpacity
            style={styles.checkboxLinha}
            onPress={() => setAceitouTermos(!aceitouTermos)}
            activeOpacity={0.7}
          >
            <View style={[styles.checkbox, aceitouTermos && styles.checkboxMarcado]}>
              {aceitouTermos && <Ionicons name="checkmark" size={14} color={CORES.white} />}
            </View>
            <Text style={styles.checkboxTexto}>Aceito os termos de uso e privacidade</Text>
          </TouchableOpacity>

          <Botao onPress={handleCadastrar}>Finalizar cadastro</Botao>
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