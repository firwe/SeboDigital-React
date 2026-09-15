import { StyleSheet } from "react-native";
import { CORES, FONTES } from "../constants/themes";

export const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: CORES.bg,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  breadcrumb: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  breadcrumbTexto: {
    marginLeft: 6,
    fontSize: 14,
    color: CORES.muted,
    fontFamily: FONTES.body,
  },
  tituloPagina: {
    fontFamily: FONTES.display,
    fontSize: 26,
    fontWeight: "700",
    color: CORES.header,
    marginBottom: 24,
  },

  vazioContainer: {
    alignItems: "center",
    paddingVertical: 60,
  },
  vazioTexto: {
    fontSize: 16,
    color: CORES.muted,
    fontFamily: FONTES.body,
  },

  cardItem: {
    flexDirection: "row",
    backgroundColor: CORES.white,
    borderRadius: 10,
    padding: 12,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: CORES.borderLight,
  },
  itemImagem: {
    width: 64,
    height: 84,
    borderRadius: 8,
    backgroundColor: CORES.dark,
    alignItems: "center",
    justifyContent: "center",
  },
  itemImagemTexto: {
    color: CORES.white,
    fontFamily: FONTES.display,
    fontSize: 18,
    fontWeight: "700",
  },
  itemInfo: {
    flex: 1,
    marginLeft: 14,
    justifyContent: "center",
  },
  itemCategoria: {
    fontSize: 12,
    color: CORES.muted,
    fontFamily: FONTES.body,
  },
  itemTitulo: {
    fontFamily: FONTES.display,
    fontSize: 17,
    fontWeight: "700",
    color: CORES.header,
    marginTop: 3,
    marginBottom: 6,
  },
  itemPreco: {
    color: CORES.accent,
    fontWeight: "700",
    fontSize: 16,
    fontFamily: FONTES.body,
  },
  removerBotao: {
    marginTop: 10,
    alignSelf: "flex-start",
  },
  removerTexto: {
    color: "#ff4d4d",
    fontSize: 13,
    fontWeight: "600",
    textDecorationLine: "underline",
    fontFamily: FONTES.body,
  },

  resumoCard: {
    backgroundColor: CORES.white,
    borderRadius: 12,
    padding: 20,
    marginTop: 10,
    borderWidth: 1,
    borderColor: CORES.borderLight,
  },
  resumoTitulo: {
    fontFamily: FONTES.display,
    fontSize: 22,
    fontWeight: "700",
    color: CORES.header,
    marginBottom: 18,
  },
  resumoLinha: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  resumoLabel: {
    fontSize: 15,
    color: CORES.header,
    fontFamily: FONTES.body,
  },
  resumoValor: {
    fontSize: 15,
    color: CORES.header,
    fontFamily: FONTES.body,
  },
  freteValor: {
    color: "#22c55e",
    fontWeight: "700",
    fontFamily: FONTES.body,
  },
  divisor: {
    height: 1,
    backgroundColor: CORES.borderLight,
    marginVertical: 14,
  },
  totalLinha: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: "700",
    color: CORES.header,
    fontFamily: FONTES.body,
  },
  totalValor: {
    fontSize: 22,
    fontWeight: "700",
    color: CORES.accent,
    fontFamily: FONTES.body,
  },
  finalizarBotao: {
    backgroundColor: "#166534",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  finalizarTexto: {
    color: CORES.white,
    fontWeight: "700",
    fontSize: 15,
    fontFamily: FONTES.body,
  },
});