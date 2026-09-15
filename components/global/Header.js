import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CORES } from '../../constants/themes';
import { styles } from '../../styles/homeStyles';

export default function Header({
  navigation,
  busca,
  setBusca,
  onAbrirCategorias,
  linksRapidos = [],
  // onSelecionarLink foi removido daqui para a lógica ficar interna!
}) {

  function handleNavegacao(label) {
    if (label.includes("Acervo")) {
      navigation.navigate("Acervo");
    } else if (label.includes("Coleções") || label.includes("Colecoes")) {
      navigation.navigate("Colecoes");
    } else if (label.includes("Desapega")) {
      navigation.navigate("Desapega"); // Para quando criarmos
    } else if (label.includes("Anuncie") || label.includes("Anunciar")) {
      navigation.navigate("Anunciar"); // Para quando criarmos
    }
  }

  return (
    <View style={styles.header}>
      <View style={styles.headerTopo}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Text style={styles.logoTexto}>Sebo Digital</Text>
        </TouchableOpacity>

        <View style={styles.headerAcoes}>
          {/* não há produtos, front end tá devendo */}
          <TouchableOpacity
            style={styles.acaoItem}
            onPress={() => navigation.navigate('Carrinho')}>
            <Ionicons name="cart-outline" size={24} color={CORES.white} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.acaoItem}
            onPress={() => navigation.navigate('Login')}>
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
              // AQUI CHAMAMOS A FUNÇÃO INTERNA NOVA!
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