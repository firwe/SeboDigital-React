import React, { useState, useEffect } from "react";
import { Modal, View, Text, TouchableOpacity, ScrollView, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { CORES } from "../../constants/themes";
import { CATEGORIAS_ACERVO } from "../../constants/CategoriasAcervo";
import { styles } from "../../styles/acervoStyles";

export default function FiltroAcervoModal({
  visible,
  onFechar,
  categoriaSelecionada,
  precoMin,
  precoMax,
  onAplicar,
}) {
  // Estado local: só reflete no filtro de verdade quando o usuário aperta
  // "Filtrar Acervo" (mesmo comportamento do form do HTML antigo).
  const [categoria, setCategoria] = useState(categoriaSelecionada);
  const [min, setMin] = useState(precoMin);
  const [max, setMax] = useState(precoMax);

  useEffect(() => {
    if (visible) {
      setCategoria(categoriaSelecionada);
      setMin(precoMin);
      setMax(precoMax);
    }
  }, [visible, categoriaSelecionada, precoMin, precoMax]);

  function aplicar() {
    onAplicar({ categoria, min, max });
    onFechar();
  }

  function limpar() {
    setCategoria("");
    setMin("");
    setMax("");
    onAplicar({ categoria: "", min: "", max: "" });
    onFechar();
  }

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onFechar}>
      <View style={styles.modalFundo}>
        <View style={styles.modalConteudo}>
          <View style={styles.modalCabecalho}>
            <Text style={styles.modalTitulo}>Filtrar Acervo</Text>
            <TouchableOpacity onPress={onFechar}>
              <Ionicons name="close" size={24} color={CORES.dark} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalCorpo}>
            <Text style={styles.filtroLabel}>Categorias</Text>

            <TouchableOpacity style={styles.categoriaItem} onPress={() => setCategoria("")}>
              <View style={[styles.categoriaBolinha, categoria === "" && styles.categoriaBolinhaAtiva]}>
                {categoria === "" && <View style={styles.categoriaPontoAtivo} />}
              </View>
              <Text style={styles.categoriaTexto}>Todas as categorias</Text>
            </TouchableOpacity>

            {CATEGORIAS_ACERVO.map((cat) => (
              <TouchableOpacity key={cat} style={styles.categoriaItem} onPress={() => setCategoria(cat)}>
                <View style={[styles.categoriaBolinha, categoria === cat && styles.categoriaBolinhaAtiva]}>
                  {categoria === cat && <View style={styles.categoriaPontoAtivo} />}
                </View>
                <Text style={styles.categoriaTexto}>{cat}</Text>
              </TouchableOpacity>
            ))}

            <Text style={[styles.filtroLabel, { marginTop: 20 }]}>Faixa de Preço (R$)</Text>
            <View style={styles.precoLinha}>
              <TextInput
                style={styles.precoInput}
                placeholder="Min"
                placeholderTextColor="#94a3b8"
                keyboardType="decimal-pad"
                value={min}
                onChangeText={setMin}
              />
              <Text>-</Text>
              <TextInput
                style={styles.precoInput}
                placeholder="Max"
                placeholderTextColor="#94a3b8"
                keyboardType="decimal-pad"
                value={max}
                onChangeText={setMax}
              />
            </View>

            <TouchableOpacity style={styles.btnAplicar} onPress={aplicar}>
              <Text style={styles.btnAplicarTexto}>Filtrar Acervo</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={limpar}>
              <Text style={styles.linkLimpar}>Limpar filtros</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}