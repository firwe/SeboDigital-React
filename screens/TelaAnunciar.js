import React, { useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  Image, 
  StyleSheet, 
  Alert 
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker"; // Importante para pegar fotos no celular

import Header from "../components/global/Header";
import Footer from "../components/global/Footer";

import { CORES, FONTES } from "../constants/themes";
import { LINKS_RAPIDOS } from "../constants/Navbar";
import { styles as acervoStyles } from "../styles/acervoStyles";

const CATEGORIAS = [
  "Literatura Brasileira", "Literatura Estrangeira", "Ficção", "Romance", 
  "Poesia", "Terror", "Mistério & Suspense", "Infanto Juvenil", 
  "Mangás", "Autoajuda", "Idiomas", "Desapega Uni"
];

const AREAS_ACADEMICAS = [
  "Direito", "Medicina", "Enfermagem", "Psicologia", "Engenharia", 
  "Tecnologia", "Administração", "Economia", "Letras", "Pedagogia", 
  "História", "Geografia", "Biologia", "Artes"
];

const CONSERVACAO = ["Ótimo estado", "Bom estado"];

export default function TelaAnunciar({ navigation, route }) {
  // Se vier um produto via rota, significa que estamos EDITANDO. Se não, estamos CRIANDO.
  const produtoEdicao = route.params?.produto || null;

  // ESTADOS DO FORMULÁRIO
  const [isColecao, setIsColecao] = useState(produtoEdicao?.colecao || false);
  const [imagemUri, setImagemUri] = useState(
    produtoEdicao?.imagemBase64 ? `data:image/jpeg;base64,${produtoEdicao.imagemBase64}` : null
  );
  
  const [titulo, setTitulo] = useState(produtoEdicao?.titulo || "");
  const [autor, setAutor] = useState(produtoEdicao?.autor || "");
  const [editora, setEditora] = useState(produtoEdicao?.editora || "");
  const [ano, setAno] = useState(produtoEdicao?.anoPublicacao ? String(produtoEdicao.anoPublicacao) : "");
  const [preco, setPreco] = useState(produtoEdicao?.preco ? String(produtoEdicao.preco) : "");
  const [conservacao, setConservacao] = useState(produtoEdicao?.conservacao || "");
  const [categoria, setCategoria] = useState(produtoEdicao?.categoria || "");
  const [area, setArea] = useState(produtoEdicao?.area || "");
  const [descricao, setDescricao] = useState(produtoEdicao?.descricao || "");

  // FUNÇÃO: Escolher imagem da galeria do celular
  async function escolherImagem() {
    // Pede permissão e abre a galeria
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true, // Permite recortar a foto
      aspect: [3, 4], // Proporção ideal pra capa de livro
      quality: 0.8,
    });

    if (!result.canceled) {
      setImagemUri(result.assets[0].uri);
    }
  }

  // FUNÇÃO: Mudar categoria (limpa a área se não for Desapega Uni)
  function handleCategoriaChange(cat) {
    setCategoria(cat);
    if (cat !== "Desapega Uni") {
      setArea(""); // Reseta a área acadêmica se trocar de categoria
    }
  }

  // FUNÇÃO: Validar e Enviar Formulário
  function handleAnunciar() {
    // 1. Validação de Imagem
    if (!imagemUri) {
      Alert.alert("Atenção", "A foto real do produto é obrigatória.");
      return;
    }

    // 2. Validação de campos obrigatórios
    if (!titulo || !autor || !ano || !preco || !conservacao || !categoria) {
      Alert.alert("Atenção", "Preencha todos os campos obrigatórios marcados com (*).");
      return;
    }

    // 3. Validação do Desapega Uni
    if (categoria === "Desapega Uni" && !area) {
      Alert.alert("Atenção", "Selecione uma área acadêmica para produtos do Desapega Uni.");
      return;
    }

    // Monta o objeto pra enviar pro Back-end
    const anuncioFormatado = {
      colecao: isColecao,
      imagem: imagemUri,
      titulo,
      autor,
      editora,
      anoPublicacao: parseInt(ano),
      preco: parseFloat(preco.replace(",", ".")),
      conservacao,
      categoria,
      area: categoria === "Desapega Uni" ? area : null,
      descricao
    };

    console.log("DADOS PRONTOS PARA O BACKEND:", anuncioFormatado);
    Alert.alert("Sucesso!", produtoEdicao ? "Anúncio atualizado!" : "Livro anunciado com sucesso!");
    
    // Volta pra tela anterior (ou pra Home)
    navigation.goBack();
  }

  // Renderizador de Radios customizados (reaproveitando o estilo das bolinhas)
  const renderRadio = (label, selecionado, onPress) => (
    <TouchableOpacity style={styles.checkItem} onPress={onPress}>
      <View style={[styles.radioOuter, selecionado && styles.radioOuterAtivo]}>
        {selecionado && <View style={styles.radioInner} />}
      </View>
      <Text style={styles.checkItemText}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={acervoStyles.tela}>
      <Header navigation={navigation} busca="" setBusca={() => {}} linksRapidos={LINKS_RAPIDOS} />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.tituloSecao}>
          {produtoEdicao ? "Edite seu produto." : "Cadastre seu produto."}
        </Text>
        
        <Text style={styles.textoIntro}>
          Preencha os campos abaixo para anunciar seu produto. É importante que todas as informações sejam verídicas.
        </Text>
        <Text style={styles.textoAviso}>
          <Text style={{ fontWeight: "bold" }}>Observação:</Text> A plataforma acrescenta o valor da taxa de serviço ao seu anúncio, sendo ela 10% do valor indicado por você.
        </Text>

        {/* ========== FOTO ========== */}
        <TouchableOpacity style={styles.fotoContainer} onPress={escolherImagem}>
          {imagemUri ? (
            <Image source={{ uri: imagemUri }} style={styles.fotoImagem} />
          ) : (
            <View style={styles.fotoPlaceholderTexto}>
              <Ionicons name="camera-outline" size={40} color="#94a3b8" />
              <Text style={styles.fotoTexto}>A foto real do produto</Text>
              <Text style={[styles.fotoTexto, { fontWeight: "bold" }]}>é obrigatória</Text>
            </View>
          )}
          <View style={styles.btnFotoFooter}>
            <Text style={styles.btnFotoFooterTexto}>Selecionar Foto</Text>
          </View>
        </TouchableOpacity>
        <Text style={styles.fotoAvisoObrigatorio}>* Upload de imagem obrigatório</Text>

        {/* ========== ABAS (TABS) ========== */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity 
            style={[styles.tabBtn, !isColecao ? styles.tabAtiva : styles.tabInativa]}
            onPress={() => setIsColecao(false)}
          >
            <Text style={[styles.tabTexto, !isColecao && styles.tabTextoAtivo]}>Livro</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tabBtn, isColecao ? styles.tabAtiva : styles.tabInativa]}
            onPress={() => setIsColecao(true)}
          >
            <Text style={[styles.tabTexto, isColecao && styles.tabTextoAtivo]}>Coleção</Text>
          </TouchableOpacity>
        </View>

        {/* ========== FORMULÁRIO ========== */}
        <View style={styles.formContainer}>
          
          <Text style={styles.label}>{isColecao ? "Título da Coleção:*" : "Título:*"}</Text>
          <TextInput style={styles.input} value={titulo} onChangeText={setTitulo} placeholder={isColecao ? "Ex: Box Harry Potter" : "Digite o título do livro"} />

          <Text style={styles.label}>Autor / Organizador:*</Text>
          <TextInput style={styles.input} value={autor} onChangeText={setAutor} placeholder="Digite o nome do(a) autor(a)" />

          <Text style={styles.label}>Editora:</Text>
          <TextInput style={styles.input} value={editora} onChangeText={setEditora} placeholder="Digite o nome da editora" />

          {/* Grid de 2 colunas para Ano e Preço */}
          <View style={styles.row}>
            <View style={styles.col}>
              <Text style={styles.label}>Ano de publicação:*</Text>
              <TextInput style={styles.input} value={ano} onChangeText={setAno} keyboardType="numeric" placeholder="Ex: 2023" />
            </View>
            <View style={styles.col}>
              <Text style={styles.label}>Valor (R$):*</Text>
              <TextInput style={styles.input} value={preco} onChangeText={setPreco} keyboardType="decimal-pad" placeholder="0.00" />
            </View>
          </View>

          <Text style={styles.labelMargin}>Conservação do livro:*</Text>
          {CONSERVACAO.map((item) => renderRadio(item, conservacao === item, () => setConservacao(item)))}

          <Text style={styles.labelMargin}>Selecione a categoria:*</Text>
          <View style={styles.gridCategorias}>
            {CATEGORIAS.map((cat) => (
              <View key={cat} style={styles.gridItem}>
                {renderRadio(cat, categoria === cat, () => handleCategoriaChange(cat))}
              </View>
            ))}
          </View>

          {/* Áreas Acadêmicas (Opacidade controlada pelo pointerEvents) */}
          <View pointerEvents={categoria === "Desapega Uni" ? "auto" : "none"} style={{ opacity: categoria === "Desapega Uni" ? 1 : 0.3, marginTop: 20 }}>
            <Text style={styles.label}>Selecione a área acadêmica:*</Text>
            <View style={styles.gridCategorias}>
              {AREAS_ACADEMICAS.map((item) => (
                <View key={item} style={styles.gridItem}>
                  {renderRadio(item, area === item, () => setArea(item))}
                </View>
              ))}
            </View>
          </View>

          <Text style={styles.labelMargin}>Descrição:</Text>
          <TextInput 
            style={styles.textArea} 
            value={descricao} 
            onChangeText={setDescricao} 
            placeholder="Detalhes extras sobre a edição, marcas de uso, etc..." 
            multiline 
            numberOfLines={4} 
            textAlignVertical="top"
          />

          <TouchableOpacity style={styles.btnAnunciar} onPress={handleAnunciar}>
            <Text style={styles.btnAnunciarTexto}>{produtoEdicao ? "Salvar Alterações" : "Anunciar Produto"}</Text>
          </TouchableOpacity>

        </View>

        <Footer />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 16,
    paddingBottom: 40,
  },
  tituloSecao: {
    fontFamily: FONTES.display,
    fontSize: 28,
    fontWeight: "700",
    color: CORES.dark,
    marginTop: 10,
    marginBottom: 10,
  },
  textoIntro: {
    fontSize: 14,
    color: CORES.dark,
    marginBottom: 8,
  },
  textoAviso: {
    fontSize: 14,
    color: CORES.dark,
    marginBottom: 20,
  },
  
  // Foto Placeholder
  fotoContainer: {
    height: 250,
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "#cbd5e1",
    borderRadius: 20,
    backgroundColor: "#f8fafc",
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  fotoImagem: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  fotoPlaceholderTexto: {
    alignItems: "center",
  },
  fotoTexto: {
    color: "#94a3b8",
    fontSize: 13,
    marginTop: 4,
  },
  btnFotoFooter: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: CORES.header || "#1e293b",
    paddingVertical: 12,
    alignItems: "center",
  },
  btnFotoFooterTexto: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 13,
  },
  fotoAvisoObrigatorio: {
    color: "#ef4444",
    fontSize: 11,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 8,
    marginBottom: 24,
  },

  // Abas (Tabs)
  tabsContainer: {
    flexDirection: "row",
    paddingHorizontal: 10, // Um pouco de recuo pra conectar suave com a caixa de baixo
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: "#000",
    borderBottomWidth: 0,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    alignItems: "center",
  },
  tabAtiva: {
    backgroundColor: "#fff",
    zIndex: 2, // Fica "por cima" visualmente
  },
  tabInativa: {
    backgroundColor: "#f1f5f9",
    marginTop: 4, // Abaixa a aba inativa um pouquinho
  },
  tabTexto: {
    fontFamily: FONTES.display,
    fontSize: 18,
    fontWeight: "700",
    color: "#94a3b8",
  },
  tabTextoAtivo: {
    color: CORES.dark,
  },

  // Formulário Container
  formContainer: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 20,
    padding: 20,
    marginTop: -1, // Sobe 1px pra juntar as bordas com as abas
    zIndex: 1,
  },
  label: {
    fontWeight: "700",
    fontSize: 14,
    color: CORES.dark,
    marginBottom: 8,
  },
  labelMargin: {
    fontWeight: "700",
    fontSize: 14,
    color: CORES.dark,
    marginBottom: 8,
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 20,
    height: 44,
    paddingHorizontal: 14,
    marginBottom: 16,
    color: CORES.dark,
  },
  textArea: {
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 14,
    minHeight: 100,
    marginBottom: 24,
    color: CORES.dark,
  },
  row: {
    flexDirection: "row",
    gap: 16,
  },
  col: {
    flex: 1,
  },

  // Checkboxes/Radios Customizados
  gridCategorias: {
    flexDirection: "row",
    flexWrap: "wrap",
    rowGap: 12,
  },
  gridItem: {
    width: "50%", // Divide em 2 colunas
  },
  checkItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  checkItemText: {
    fontSize: 13,
    color: CORES.dark,
    flexShrink: 1,
  },
  radioOuter: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: CORES.dark,
    alignItems: "center",
    justifyContent: "center",
  },
  radioOuterAtivo: {
    borderColor: CORES.accent,
  },
  radioInner: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: CORES.accent,
  },

  // Botão Final
  btnAnunciar: {
    backgroundColor: CORES.accent || "#f59e0b",
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 10,
  },
  btnAnunciarTexto: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});