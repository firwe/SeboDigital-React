import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../../styles/homeStyles";

const PAGAMENTOS = ["Visa", "Master", "Pix", "Boleto"];

const LINKS_INFORMACOES = [
  "Quem somos",
  "Dúvidas Frequentes",
  "Política de Privacidade",
  "Termos de Uso",
];

export default function Footer({ compacto = false }) {
  return (
    <View style={[styles.footerCompleto, compacto && styles.footerCompactoPadding]}>
      <View style={styles.footerTopoLinha}>
        <Text style={styles.footerLogo}>Sebo Digital</Text>
        <Text style={styles.footerCopy}>© Sebo Digital</Text>
      </View>

      {!compacto && <View style={styles.footerDivisor} />}

      <View style={[styles.footerSecao, compacto && styles.footerSecaoCompacta]}>
        <View style={styles.footerPagamentoLinha}>
          {PAGAMENTOS.map((forma) => (
            <View key={forma} style={styles.footerPagamentoChip}>
              <Ionicons name="card-outline" size={12} color="#cbd5e1" />
              <Text style={styles.footerPagamentoTexto}>{forma}</Text>
            </View>
          ))}
          <View style={styles.footerIconesLinha}>
            <Ionicons name="logo-instagram" size={18} color="#cbd5e1" />
            <Ionicons name="logo-whatsapp" size={18} color="#cbd5e1" />
            <Ionicons name="logo-facebook" size={18} color="#cbd5e1" />
          </View>
        </View>
      </View>

      <View
        style={
          compacto
            ? styles.footerColunasCompactas
            : { flexDirection: "row", justifyContent: "space-between", width: "100%" }
        }
      >
        <View style={[styles.footerSecao, compacto && styles.footerSecaoCompacta]}>
          <Text style={styles.footerTituloSecao}>Informações</Text>
          {LINKS_INFORMACOES.map((link) => (
            <Text key={link} style={styles.footerLinha}>{link}</Text>
          ))}
        </View>

        <View style={[styles.footerSecao, compacto && styles.footerSecaoCompacta]}>
          <Text style={styles.footerTituloSecao}>Contato</Text>
          <Text style={styles.footerLinha}>Fale Conosco</Text>
          <Text style={styles.footerLinha}>(11) 4002-8922</Text>
          <Text style={styles.footerLinha}>(11) 12345-6789</Text>
        </View>
      </View>
    </View>
  );
}