import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

import Header from "../components/global/Header";
import Footer from "../components/global/Footer";

import { LINKS_RAPIDOS } from "../constants/Navbar";
import { styles as acervoStyles } from "../styles/acervoStyles";
import { styles } from "../styles/anunciarStyles";
import { useAuth } from "../context/AuthContext";

const CATEGORIAS = [
  "Literatura Brasileira",
  "Literatura Estrangeira",
  "Ficção",
  "Romance",
  "Poesia",
  "Terror",
  "Mistério & Suspense",
  "Infanto Juvenil",
  "Mangás",
  "Autoajuda",
  "Idiomas",
  "Desapega Uni",
];

const AREAS_ACADEMICAS = [
  "Direito",
  "Medicina",
  "Enfermagem",
  "Psicologia",
  "Engenharia",
  "Tecnologia",
  "Administração",
  "Economia",
  "Letras",
  "Pedagogia",
  "História",
  "Geografia",
  "Biologia",
  "Artes",
];

const CONSERVACAO = ["Ótimo estado", "Bom estado"];

export default function TelaAnunciar({ navigation, route }) {
  const { usuarioLogado } = useAuth();
  const produtoEdicao = route.params?.produto || null;

  const [isColecao, setIsColecao] = useState(produtoEdicao?.colecao || false);
  const [imagemUri, setImagemUri] = useState(
    produtoEdicao?.imagemBase64
      ? `data:image/jpeg;base64,${produtoEdicao.imagemBase64}`
      : null,
  );
  // Estado exclusivo para guardar a string limpa em Base64
  const [imagemBase64, setImagemBase64] = useState(
    produtoEdicao?.imagemBase64 || "",
  );

  const [titulo, setTitulo] = useState(produtoEdicao?.titulo || "");
  const [autor, setAutor] = useState(produtoEdicao?.autor || "");
  const [editora, setEditora] = useState(produtoEdicao?.editora || "");
  const [ano, setAno] = useState(
    produtoEdicao?.anoPublicacao ? String(produtoEdicao.anoPublicacao) : "",
  );
  const [preco, setPreco] = useState(
    produtoEdicao?.preco ? String(produtoEdicao.preco) : "",
  );
  const [conservacao, setConservacao] = useState(
    produtoEdicao?.conservacao || "",
  );
  const [categoria, setCategoria] = useState(produtoEdicao?.categoria || "");
  const [area, setArea] = useState(produtoEdicao?.area || "");
  const [descricao, setDescricao] = useState(produtoEdicao?.descricao || "");

  async function escolherImagem() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 0.5, // Qualidade 0.5 para não pesar a memória
      base64: true, // <-- MÁGICA AQUI: O próprio ImagePicker devolve em Base64 sem erro!
    });

    if (!result.canceled) {
      setImagemUri(result.assets[0].uri);
      if (result.assets[0].base64) {
        setImagemBase64(result.assets[0].base64);
      }
    }
  }

  function handleCategoriaChange(cat) {
    setCategoria(cat);
    if (cat !== "Desapega Uni") {
      setArea("");
    }
  }

  async function handleAnunciar() {
    if (!usuarioLogado) {
      Alert.alert("Erro", "Precisa de estar logado para anunciar um produto.");
      return;
    }

    if (!imagemUri) {
      Alert.alert("Atenção", "A foto real do produto é obrigatória.");
      return;
    }

    if (!titulo || !autor || !ano || !preco || !conservacao || !categoria) {
      Alert.alert(
        "Atenção",
        "Preencha todos os campos obrigatórios marcados com (*).",
      );
      return;
    }

    if (categoria === "Desapega Uni" && !area) {
      Alert.alert(
        "Atenção",
        "Selecione uma área acadêmica para produtos do Desapega Uni.",
      );
      return;
    }

    try {
      const anuncioFormatado = {
        colecao: isColecao,
        imagemBase64: imagemBase64, // Envia a string limpa direto!
        titulo,
        autor,
        editora,
        anoPublicacao: parseInt(ano),
        preco: parseFloat(String(preco).replace(",", ".")),
        conservacao,
        categoria,
        area: categoria === "Desapega Uni" ? area : null,
        descricao,
        dono: {
          id_usuario: usuarioLogado.id_usuario,
          nome: usuarioLogado.nome,
        },
      };

      const url = produtoEdicao
        ? `http://192.168.0.58:3000/api/produtos/${produtoEdicao.id_produto}`
        : `http://192.168.0.58:3000/api/produtos`;

      const metodo = produtoEdicao ? "PUT" : "POST";

      const resposta = await fetch(url, {
        method: metodo,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(anuncioFormatado),
      });

      if (resposta.ok) {
        Alert.alert(
          "Sucesso!",
          produtoEdicao
            ? "Anúncio atualizado!"
            : "Livro anunciado com sucesso!",
        );
        navigation.goBack();
      } else {
        Alert.alert("Erro", "Não foi possível guardar o produto no servidor.");
      }
    } catch (error) {
      Alert.alert(
        "Erro",
        "Falha na ligação com a API. O servidor está a correr?",
      );
      console.error(error);
    }
  }

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
      <Header
        navigation={navigation}
        busca=""
        setBusca={() => {}}
        linksRapidos={LINKS_RAPIDOS}
      />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.tituloSecao}>
          {produtoEdicao ? "Edite seu produto." : "Cadastre seu produto."}
        </Text>

        <Text style={styles.textoIntro}>
          Preencha os campos abaixo para anunciar seu produto. É importante que
          todas as informações sejam verídicas.
        </Text>
        <Text style={styles.textoAviso}>
          <Text style={{ fontWeight: "bold" }}>Observação:</Text> A plataforma
          acrescenta o valor da taxa de serviço ao seu anúncio, sendo ela 10% do
          valor indicado por você.
        </Text>

        <TouchableOpacity style={styles.fotoContainer} onPress={escolherImagem}>
          {imagemUri ? (
            <Image source={{ uri: imagemUri }} style={styles.fotoImagem} />
          ) : (
            <View style={styles.fotoPlaceholderTexto}>
              <Ionicons name="camera-outline" size={40} color="#94a3b8" />
              <Text style={styles.fotoTexto}>A foto real do produto</Text>
              <Text style={[styles.fotoTexto, { fontWeight: "bold" }]}>
                é obrigatória
              </Text>
            </View>
          )}
          <View style={styles.btnFotoFooter}>
            <Text style={styles.btnFotoFooterTexto}>Selecionar Foto</Text>
          </View>
        </TouchableOpacity>
        <Text style={styles.fotoAvisoObrigatorio}>
          Upload de imagem obrigatório
        </Text>

        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[
              styles.tabBtn,
              !isColecao ? styles.tabAtiva : styles.tabInativa,
            ]}
            onPress={() => setIsColecao(false)}
          >
            <Text style={[styles.tabTexto, !isColecao && styles.tabTextoAtivo]}>
              Livro
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tabBtn,
              isColecao ? styles.tabAtiva : styles.tabInativa,
            ]}
            onPress={() => setIsColecao(true)}
          >
            <Text style={[styles.tabTexto, isColecao && styles.tabTextoAtivo]}>
              Coleção
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.label}>
            {isColecao ? "Título da Coleção:*" : "Título:*"}
          </Text>
          <TextInput
            style={styles.input}
            value={titulo}
            onChangeText={setTitulo}
            placeholder={
              isColecao ? "Ex: Box Harry Potter" : "Digite o título do livro"
            }
          />

          <Text style={styles.label}>Autor / Organizador:*</Text>
          <TextInput
            style={styles.input}
            value={autor}
            onChangeText={setAutor}
            placeholder="Digite o nome do(a) autor(a)"
          />

          <Text style={styles.label}>Editora:</Text>
          <TextInput
            style={styles.input}
            value={editora}
            onChangeText={setEditora}
            placeholder="Digite o nome da editora"
          />

          <View style={styles.row}>
            <View style={styles.col}>
              <Text style={styles.label}>Ano de publicação:*</Text>
              <TextInput
                style={styles.input}
                value={ano}
                onChangeText={setAno}
                keyboardType="numeric"
                placeholder="Ex: 2023"
              />
            </View>
            <View style={styles.col}>
              <Text style={styles.label}>Valor (R$):*</Text>
              <TextInput
                style={styles.input}
                value={preco}
                onChangeText={setPreco}
                keyboardType="decimal-pad"
                placeholder="0.00"
              />
            </View>
          </View>

          <Text style={styles.labelMargin}>Conservação do livro:*</Text>
          {CONSERVACAO.map((item) => (
            <View key={item}>
              {renderRadio(item, conservacao === item, () =>
                setConservacao(item),
              )}
            </View>
          ))}
          <Text style={styles.labelMargin}>Selecione a categoria:*</Text>
          <View style={styles.gridCategorias}>
            {CATEGORIAS.map((cat) => (
              <View key={cat} style={styles.gridItem}>
                {renderRadio(cat, categoria === cat, () =>
                  handleCategoriaChange(cat),
                )}
              </View>
            ))}
          </View>

          <View
            pointerEvents={categoria === "Desapega Uni" ? "auto" : "none"}
            style={{
              opacity: categoria === "Desapega Uni" ? 1 : 0.3,
              marginTop: 20,
            }}
          >
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
            <Text style={styles.btnAnunciarTexto}>
              {produtoEdicao ? "Salvar Alterações" : "Anunciar Produto"}
            </Text>
          </TouchableOpacity>
        </View>

        <Footer />
      </ScrollView>
    </View>
  );
}