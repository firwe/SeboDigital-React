import React from "react";
import { View, Text } from "react-native";
import { CORES } from "../../constants/themes";
import { styles } from "../../styles/authStyles";

export default function Alerta({ tipo, children }) {
  const estilo = tipo === "erro" ? styles.alertaErro : styles.alertaSucesso;
  const cor = tipo === "erro" ? CORES.erroTexto : "#15803d";
  return (
    <View style={[styles.alerta, estilo]}>
      <Text style={[styles.alertaTexto, { color: cor }]}>{children}</Text>
    </View>
  );
}