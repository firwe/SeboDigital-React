import React, { useState, useEffect } from "react";
import { Modal, View, Text, TouchableOpacity, ScrollView, TextInput, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { CORES, FONTES } from "../../constants/themes";

export default function FiltroColecoesModal({
  visible,
  onFechar,
  tituloSalvo,
  autorSalvo,
  precoMin,
  precoMax,
  onAplicar,
}) {
  const [titulo, setTitulo] = useState(tituloSalvo);
  const [autor, setAutor] = useState(autorSalvo);
  const [min, setMin] = useState(precoMin);
  const [max, setMax] = useState(precoMax);

  useEffect(() => {
    if (visible) {
      setTitulo(tituloSalvo);
      setAutor(autorSalvo);
      setMin(precoMin);
      setMax(precoMax);
    }
  }, [visible, tituloSalvo, autorSalvo, precoMin, precoMax]);

  function aplicar() {
    onAplicar({ titulo, autor, min, max });
    onFechar();
  }

  function limpar() {
    setTitulo("");
    setAutor("");
    setMin("");
    setMax("");
    onAplicar({ titulo: "", autor: "", min: "", max: "" });
    onFechar();
  }

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onFechar}>
      <View style={styles.modalFundo}>
        <View style={styles.modalConteudo}>
          <View style={styles.modalCabecalho}>
            <Text style={styles.modalTitulo}>Filtrar Coleções</Text>
            <TouchableOpacity onPress={onFechar}>
              <Ionicons name="close" size={24} color={CORES.dark} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalCorpo}>
            {/* Título da Coleção */}
            <Text style={styles.filtroLabel}>Título da Coleção</Text>
            <TextInput
              style={styles.inputTexto}
              placeholder="Ex: Harry Potter"
              placeholderTextColor="#94a3b8"
              value={titulo}
              onChangeText={setTitulo}
            />

            {/* Autor / Organizador */}
            <Text style={styles.filtroLabel}>Autor / Organizador</Text>
            <TextInput
              style={styles.inputTexto}
              placeholder="Nome do autor"
              placeholderTextColor="#94a3b8"
              value={autor}
              onChangeText={setAutor}
            />

            {/* Faixa de Preço */}
            <Text style={styles.filtroLabel}>Faixa de Preço (R$)</Text>
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
              <Text style={styles.btnAplicarTexto}>Aplicar Filtros</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={limpar}>
              <Text style={styles.linkLimpar}>Limpar seleção</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

// Reutilizei a base visual do modal do acervo para manter o padrão
const styles = StyleSheet.create({
  modalFundo: {
    flex: 1,
    backgroundColor: "rgba(15,23,42,0.5)",
    justifyContent: "flex-end",
  },
  modalConteudo: {
    backgroundColor: CORES.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: "85%",
  },
  modalCabecalho: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: CORES.borderLight || "#e2e8f0",
  },
  modalTitulo: {
    fontFamily: FONTES.display,
    fontSize: 20,
    fontWeight: "700",
    color: CORES.dark,
  },
  modalCorpo: {
    padding: 20,
  },
  filtroLabel: {
    fontWeight: "600",
    fontSize: 14,
    color: CORES.dark,
    marginBottom: 6,
    marginTop: 14,
  },
  inputTexto: {
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 20,
    height: 44,
    paddingHorizontal: 14,
    color: CORES.dark,
  },
  precoLinha: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 4,
  },
  precoInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 20,
    height: 44,
    paddingHorizontal: 14,
    color: CORES.dark,
  },
  btnAplicar: {
    backgroundColor: CORES.header || "#1e293b",
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  btnAplicarTexto: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
  },
  linkLimpar: {
    textAlign: "center",
    marginTop: 14,
    marginBottom: 20,
    color: CORES.muted || "#64748b",
    fontSize: 12,
  },
});