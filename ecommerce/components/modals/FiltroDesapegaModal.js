import React, { useState, useEffect } from "react";
import { Modal, View, Text, TouchableOpacity, ScrollView, TextInput, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { CORES, FONTES } from "../../constants/themes";

const AREAS_ACADEMICAS = [
  "Direito", "Medicina", "Enfermagem", "Psicologia", 
  "Engenharia", "Tecnologia", "Administração", "Economia", 
  "Letras", "Pedagogia", "História", "Geografia", 
  "Biologia", "Artes"
];

export default function FiltroDesapegaModal({
  visible,
  onFechar,
  areaSelecionada,
  precoMin,
  precoMax,
  onAplicar,
}) {
  const [area, setArea] = useState(areaSelecionada);
  const [min, setMin] = useState(precoMin);
  const [max, setMax] = useState(precoMax);

  useEffect(() => {
    if (visible) {
      setArea(areaSelecionada);
      setMin(precoMin);
      setMax(precoMax);
    }
  }, [visible, areaSelecionada, precoMin, precoMax]);

  function aplicar() {
    onAplicar({ area, min, max });
    onFechar();
  }

  function limpar() {
    setArea("");
    setMin("");
    setMax("");
    onAplicar({ area: "", min: "", max: "" });
    onFechar();
  }

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onFechar}>
      <View style={styles.modalFundo}>
        <View style={styles.modalConteudo}>
          <View style={styles.modalCabecalho}>
            <Text style={styles.modalTitulo}>Filtrar Área</Text>
            <TouchableOpacity onPress={onFechar}>
              <Ionicons name="close" size={24} color={CORES.dark} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalCorpo}>
            <Text style={styles.filtroLabel}>Áreas Acadêmicas</Text>

            <TouchableOpacity style={styles.categoriaItem} onPress={() => setArea("")}>
              <View style={[styles.categoriaBolinha, area === "" && styles.categoriaBolinhaAtiva]}>
                {area === "" && <View style={styles.categoriaPontoAtivo} />}
              </View>
              <Text style={styles.categoriaTexto}>Todas as áreas</Text>
            </TouchableOpacity>

            {AREAS_ACADEMICAS.map((item) => (
              <TouchableOpacity key={item} style={styles.categoriaItem} onPress={() => setArea(item)}>
                <View style={[styles.categoriaBolinha, area === item && styles.categoriaBolinhaAtiva]}>
                  {area === item && <View style={styles.categoriaPontoAtivo} />}
                </View>
                <Text style={styles.categoriaTexto}>{item}</Text>
              </TouchableOpacity>
            ))}

            <Text style={[styles.filtroLabel, { marginTop: 20 }]}>Preço Máximo (R$)</Text>
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
              <Text style={styles.btnAplicarTexto}>Filtrar Área</Text>
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

const styles = StyleSheet.create({
  modalFundo: { flex: 1, backgroundColor: "rgba(15,23,42,0.5)", justifyContent: "flex-end" },
  modalConteudo: { backgroundColor: CORES.white, borderTopLeftRadius: 24, borderTopRightRadius: 24, maxHeight: "85%" },
  modalCabecalho: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 20, borderBottomWidth: 1, borderBottomColor: CORES.borderLight || "#e2e8f0" },
  modalTitulo: { fontFamily: FONTES.display, fontSize: 20, fontWeight: "700", color: CORES.dark },
  modalCorpo: { padding: 20 },
  filtroLabel: { fontWeight: "600", fontSize: 14, color: CORES.dark, marginBottom: 6 },
  categoriaItem: { flexDirection: "row", alignItems: "center", gap: 10, paddingVertical: 10 },
  categoriaBolinha: { width: 18, height: 18, borderRadius: 9, borderWidth: 2, borderColor: CORES.dark, alignItems: "center", justifyContent: "center" },
  categoriaBolinhaAtiva: { borderColor: CORES.accent },
  categoriaPontoAtivo: { width: 9, height: 9, borderRadius: 5, backgroundColor: CORES.accent },
  categoriaTexto: { fontSize: 14, color: CORES.dark },
  precoLinha: { flexDirection: "row", alignItems: "center", gap: 10, marginTop: 4 },
  precoInput: { flex: 1, borderWidth: 1, borderColor: "#000", borderRadius: 20, height: 44, paddingHorizontal: 14, color: CORES.dark },
  btnAplicar: { backgroundColor: CORES.header || "#1e293b", height: 48, borderRadius: 24, alignItems: "center", justifyContent: "center", marginTop: 24 },
  btnAplicarTexto: { color: "#fff", fontWeight: "700", fontSize: 15 },
  linkLimpar: { textAlign: "center", marginTop: 14, marginBottom: 20, color: CORES.muted || "#64748b", fontSize: 12 },
});