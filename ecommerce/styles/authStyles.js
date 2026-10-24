import { StyleSheet, Platform } from "react-native";
import { CORES, FONTES } from "../constants/themes";

export const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: CORES.bg,
  },
  scrollContent: {
  flexGrow: 1,
  paddingHorizontal: 20,
  paddingTop: 24,
  paddingBottom: 24,
},

  // Header
  header: {
    backgroundColor: CORES.header,
    paddingTop: Platform.OS === "android" ? 44 : 56,
    paddingBottom: 18,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerBack: {
    width: 32,
  },
  logoTexto: {
    fontFamily: FONTES.display,
    fontSize: 20,
    color: CORES.white,
  },

  // Footer
  footer: {
    backgroundColor: CORES.header,
    paddingVertical: 18,
    alignItems: "center",
  },
  footerTexto: {
    fontFamily: FONTES.body,
    fontSize: 12,
    color: "#94a3b8",
  },

  // Card / Tabs
  card: {
    backgroundColor: CORES.white,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: CORES.borderLight,
    padding: 24,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  tabs: {
    flexDirection: "row",
    borderBottomWidth: 2,
    borderBottomColor: CORES.borderLight,
    marginBottom: 22,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
  },
  tabAtiva: {
    borderBottomWidth: 4,
    borderBottomColor: CORES.accent,
    marginBottom: -2,
  },
  tabTexto: {
    fontFamily: FONTES.body,
    fontWeight: "700",
    fontSize: 15,
    color: "#94a3b8",
  },
  tabTextoAtivo: {
    color: CORES.header,
  },

  // Textos
  titulo: {
    fontFamily: FONTES.display,
    fontSize: 26,
    textAlign: "center",
    color: CORES.dark,
    marginBottom: 6,
  },
  subtitulo: {
    fontFamily: FONTES.body,
    fontSize: 13,
    textAlign: "center",
    color: CORES.muted,
    marginBottom: 18,
  },

  // Form
  formGroup: {
    marginBottom: 16,
  },
  formLabel: {
    fontFamily: FONTES.display,
    fontSize: 15,
    color: CORES.dark,
    marginBottom: 6,
  },
  formInput: {
    height: 46,
    borderWidth: 1,
    borderColor: CORES.border,
    borderRadius: 23,
    paddingHorizontal: 18,
    fontFamily: FONTES.body,
    fontSize: 14,
    color: CORES.dark,
  },

  // Chips (estado)
  chip: {
    borderWidth: 1,
    borderColor: CORES.border,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
  },
  chipAtivo: {
    backgroundColor: CORES.header,
    borderColor: CORES.header,
  },
  chipTexto: {
    fontFamily: FONTES.body,
    fontWeight: "600",
    fontSize: 13,
    color: CORES.muted,
  },
  chipTextoAtivo: {
    color: CORES.white,
  },

  // Checkbox
  checkboxLinha: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    marginBottom: 20,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: CORES.border,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxMarcado: {
    backgroundColor: CORES.header,
    borderColor: CORES.header,
  },
  checkboxTexto: {
    fontFamily: FONTES.body,
    fontSize: 13,
    color: CORES.muted,
    flex: 1,
  },

  // Botão
  btnAuth: {
    height: 50,
    backgroundColor: CORES.header,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
  },
  btnAuthTexto: {
    fontFamily: FONTES.body,
    fontWeight: "700",
    fontSize: 16,
    color: CORES.white,
  },

  // Alertas
  alerta: {
    padding: 12,
    borderRadius: 10,
    marginBottom: 16,
  },
  alertaErro: {
    backgroundColor: CORES.erroBg,
    borderWidth: 1,
    borderColor: CORES.erroBorda,
  },
  alertaSucesso: {
    backgroundColor: "#dcfce7",
    borderWidth: 1,
    borderColor: "#4ade80",
  },
  alertaTexto: {
    fontFamily: FONTES.body,
    fontWeight: "600",
    fontSize: 13,
    textAlign: "center",
  },
});