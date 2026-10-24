import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CORES } from '../../constants/themes';
import { styles } from '../../styles/homeStyles';
import { useAuth } from "../../context/AuthContext";

export default function Header({
  navigation,
  busca,
  setBusca,
  onAbrirCategorias,
  linksRapidos = [],
}) {
  const { usuarioLogado, logout } = useAuth();

  function handleNavegacao(label) {
    if (label.includes("Acervo")) {
      navigation.navigate("Acervo");
    } else if (label.includes("Coleções") || label.includes("Colecoes")) {
      navigation.navigate("Colecoes");
    } else if (label.includes("Desapega")) {
      navigation.navigate("Desapega");
    } else if (label.includes("Anuncie") || label.includes("Anunciar")) {
      navigation.navigate("Anunciar");
    }
  }

  async function exportarDadosJSON() {
    try {
      const resposta = await fetch('http://192.168.0.58:3000/api/exportar-dados');
      const json = await resposta.json();
      const stringJSON = JSON.stringify(json, null, 2);

      const FileSystem = require('expo-file-system');
      const Sharing = require('expo-sharing');

      const fileUri = FileSystem.documentDirectory + 'dashboard_sebo_digital.json';

      await FileSystem.writeAsStringAsync(fileUri, stringJSON, {
        encoding: FileSystem.EncodingType.UTF8,
      });

      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(fileUri, {
          mimeType: 'application/json',
          dialogTitle: 'Exportar dados para o Dashboard em Python',
          UTI: 'public.json',
        });
      } else {
        Alert.alert("Sucesso", "Arquivo salvo no dispositivo!");
      }
    } catch (e) {
      console.error(e);
      Alert.alert("Erro", "Não foi possível gerar ou salvar o arquivo JSON.");
    }
  }

  function handlePerfilPress() {
    if (usuarioLogado) {
      Alert.alert(
        `Olá, ${usuarioLogado.nome}!`,
        "O que deseja fazer?",
        [
          { text: "Cancelar", style: "cancel" },
          { 
            text: "📊 Gerar JSON (Dashboard)", 
            onPress: exportarDadosJSON 
          },
          { 
            text: "Terminar Sessão", 
            style: "destructive", 
            onPress: () => logout() 
          }
        ]
      );
    } else {
      navigation.navigate('Login');
    }
  }

  return (
    <View style={styles.header}>
      <View style={styles.headerTopo}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Text style={styles.logoTexto}>Sebo Digital</Text>
        </TouchableOpacity>

        <View style={styles.headerAcoes}>
          <TouchableOpacity
            style={styles.acaoItem}
            onPress={() => navigation.navigate('Carrinho')}>
            <Ionicons name="cart-outline" size={24} color={CORES.white} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.acaoItem}
            onPress={handlePerfilPress}>
            <Ionicons
              name="person-circle-outline"
              size={24}
              color={CORES.white}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.buscaWrap}>
        <Ionicons
          name="search"
          size={18}
          color={CORES.muted}
          style={styles.buscaIcone}
        />
        <TextInput
          style={styles.buscaInput}
          placeholder="Busque por títulos, autores ou palavras-chave"
          placeholderTextColor="#94a3b8"
          value={busca}
          onChangeText={setBusca}
        />
      </View>

      <View style={styles.menuLinha}>
        <TouchableOpacity
          style={styles.categoriasBotao}
          onPress={onAbrirCategorias}>
          <Ionicons name="menu" size={18} color={CORES.header} />
          <Text style={styles.categoriasBotaoTexto}>Categorias</Text>
          <Ionicons name="chevron-down" size={16} color={CORES.header} />
        </TouchableOpacity>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.chipsScroll}
          contentContainerStyle={styles.chipsScrollConteudo}>
          {linksRapidos.map((link) => (
            <TouchableOpacity
              key={link.label}
              style={styles.chipCategoria}
              onPress={() => handleNavegacao(link.label)}>
              <Ionicons name={link.icone} size={14} color={CORES.white} />
              <Text style={styles.chipCategoriaTexto}>{link.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}