import React from "react";
import { Modal, View, Text, TouchableOpacity, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { CORES } from "../../constants/themes";
import { styles } from "../../styles/homeStyles";

export default function CategoriasModal({ visible, onFechar, categorias, onSelecionar }) {
  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onFechar}>
      <TouchableOpacity style={styles.modalFundo} activeOpacity={1} onPress={onFechar}>
        {/* View interna sem onPress: evita que tocar dentro da lista feche o modal */}
        <View style={styles.modalConteudo}>
          <View style={styles.modalCabecalho}>
            <Text style={styles.modalTitulo}>Categorias</Text>
            <TouchableOpacity onPress={onFechar}>
              <Ionicons name="close" size={24} color={CORES.dark} />
            </TouchableOpacity>
          </View>

          <FlatList
            data={categorias}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.modalItem} onPress={() => onSelecionar(item)}>
                <Text style={styles.modalItemTexto}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </TouchableOpacity>
    </Modal>
  );
}