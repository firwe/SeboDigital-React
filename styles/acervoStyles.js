import { StyleSheet } from "react-native";
import { CORES, FONTES } from "../constants/themes";

export const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: CORES.bg,
  },
  scrollContent: {
    paddingBottom: 20,
  },

  tituloTopo: {
    fontFamily: FONTES.display,
    fontSize: 26,
    fontWeight: "700",
    color: CORES.dark,
    paddingHorizontal: 16,
    marginTop: 18,
    marginBottom: 6,
  },

  barraFiltro: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 14,
  },
  contadorTexto: {
    color: CORES.muted,
    fontSize: 13,
  },
  btnFiltros: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderWidth: 1,
    borderColor: CORES.dark,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: CORES.white,
  },
  btnFiltrosTexto: {
    fontWeight: "700",
    fontSize: 13,
    color: CORES.dark,
  },

  listaVazia: {
    padding: 40,
    alignItems: "center",
  },
  listaVaziaTexto: {
    color: CORES.muted,
    fontSize: 15,
    textAlign: "center",
  },

  // ---------- Card de livro ----------
  card: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: CORES.white,
    marginHorizontal: 16,
    marginBottom: 16,
    minHeight: 150,
  },
  cardImg: {
    width: 120,
    backgroundColor: "#f1f5f9",
    borderRightWidth: 1,
    borderRightColor: CORES.borderLight,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  cardImgFoto: {
    width: "100%",
    height: "100%",
  },
  semFoto: {
    color: "#94a3b8",
    fontSize: 11,
    fontWeight: "700",
  },
  cardInfo: {
    flex: 1,
    padding: 14,
    justifyContent: "center",
    gap: 2,
  },
  cardTag: {
    fontSize: 10,
    color: CORES.muted,
  },
  cardTitulo: {
    fontFamily: FONTES.display,
    fontSize: 16,
    fontWeight: "700",
    color: CORES.dark,
    marginVertical: 2,
  },
  cardPreco: {
    color: CORES.accent,
    fontWeight: "700",
    fontSize: 15,
  },
  cardDetalhe: {
    fontSize: 12,
    color: CORES.muted,
  },
  cardAcoes: {
    flexDirection: "row",
    gap: 8,
    marginTop: 10,
  },
  btnAdicionar: {
    flex: 1,
    backgroundColor: CORES.header,
    borderRadius: 8,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  btnAdicionarTexto: {
    color: CORES.white,
    fontWeight: "700",
    fontSize: 12,
  },
  btnEditar: {
    backgroundColor: CORES.muted,
    borderRadius: 8,
    height: 32,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  btnEditarTexto: {
    color: CORES.white,
    fontWeight: "600",
    fontSize: 11,
  },
  btnApagar: {
    backgroundColor: "#b91c1c",
    borderRadius: 8,
    height: 32,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  btnApagarTexto: {
    color: CORES.white,
    fontWeight: "600",
    fontSize: 11,
  },

  // ---------- Modal de filtro ----------
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
    borderBottomColor: CORES.borderLight,
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
  },
  categoriaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 10,
  },
  categoriaBolinha: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: CORES.dark,
    alignItems: "center",
    justifyContent: "center",
  },
  categoriaBolinhaAtiva: {
    borderColor: CORES.accent,
  },
  categoriaPontoAtivo: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: CORES.accent,
  },
  categoriaTexto: {
    fontSize: 14,
    color: CORES.dark,
  },

  precoLinha: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 10,
  },
  precoInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 20,
    height: 44,
    paddingHorizontal: 14,
  },

  btnAplicar: {
    backgroundColor: CORES.header,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
  },
  btnAplicarTexto: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
  },
  linkLimpar: {
    textAlign: "center",
    marginTop: 14,
    marginBottom: 10,
    color: CORES.muted,
    fontSize: 12,
  },
});