import { StyleSheet, Platform } from 'react-native';
import { CORES, FONTES } from '../constants/themes';

const ALTURA_CARROSSEL = 190;

export const styles = StyleSheet.create({
  tela: { flex: 1, backgroundColor: CORES.bg },
  scrollContent: { paddingBottom: 30 },

  // Header
  header: {
    backgroundColor: CORES.header,
    paddingTop: Platform.OS === 'android' ? 44 : 56,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  headerTopo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  logoTexto: { fontFamily: FONTES.display, fontSize: 20, color: CORES.white },
  headerAcoes: { flexDirection: 'row', gap: 16 },
  acaoItem: { padding: 2 },

  buscaWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: CORES.white,
    borderRadius: 24,
    paddingHorizontal: 14,
    height: 42,
    marginBottom: 12,
  },
  buscaIcone: { marginRight: 8 },
  buscaInput: {
    flex: 1,
    fontFamily: FONTES.body,
    fontSize: 13,
    color: CORES.dark,
  },

  menuLinha: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  categoriasBotao: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: CORES.white,
    alignSelf: 'flex-start',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 14,
    gap: 6,
  },
  categoriasBotaoTexto: {
    fontFamily: FONTES.body,
    fontWeight: '700',
    fontSize: 13,
    color: CORES.header,
  },
  chipsScroll: {
    flexGrow: 0,
    flexShrink: 1,
  },
  chipsScrollConteudo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  chipCategoria: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.14)',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    gap: 6,
  },
  chipCategoriaTexto: {
    fontFamily: FONTES.body,
    fontWeight: '600',
    fontSize: 12,
    color: CORES.white,
  },

  // Modal de categorias
  modalFundo: {
    flex: 1,
    backgroundColor: 'rgba(15,23,42,0.5)',
    justifyContent: 'flex-end',
  },
  modalConteudo: {
    backgroundColor: CORES.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '70%',
    padding: 20,
  },
  modalCabecalho: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  modalTitulo: { fontFamily: FONTES.display, fontSize: 20, color: CORES.dark },
  modalItem: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: CORES.borderLight,
  },
  modalItemTexto: { fontFamily: FONTES.body, fontSize: 15, color: CORES.dark },

  // Carrossel
  carrosselContainer: {
    marginTop: 16,
    marginHorizontal: 16,
    height: ALTURA_CARROSSEL,
    borderRadius: 18,
    overflow: 'hidden',
  },
  carrosselLista: { height: ALTURA_CARROSSEL },
  slide: { height: ALTURA_CARROSSEL, justifyContent: 'center', padding: 20 },
  slideTitulo: {
    fontFamily: FONTES.body,
    fontWeight: '700',
    fontSize: 20,
    color: CORES.white,
    marginBottom: 8,
  },
  slideTexto: {
    fontFamily: FONTES.body,
    fontSize: 13,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 14,
  },
  slideBotao: {
    backgroundColor: CORES.white,
    alignSelf: 'flex-start',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 18,
  },
  slideBotaoTexto: {
    fontFamily: FONTES.body,
    fontWeight: '700',
    fontSize: 13,
    color: CORES.header,
  },
  pontosContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
    position: 'absolute',
    bottom: 10,
    width: '100%',
  },
  ponto: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  pontoAtivo: { backgroundColor: CORES.white, width: 16 },

  // Seções de livros
  secao: { marginTop: 26, paddingLeft: 16 },
  secaoTitulo: {
    fontFamily: FONTES.display,
    fontSize: 20,
    color: CORES.dark,
    marginBottom: 14,
  },

  livroCard: {
    width: 130,
    marginRight: 12,
    backgroundColor: CORES.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: CORES.borderLight,
    overflow: 'hidden',
  },
  livroImg: {
    height: 120,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  livroPlaceholder: {
    fontFamily: FONTES.display,
    fontSize: 22,
    color: '#cbd5e1',
    fontWeight: '700',
  },
  livroInfo: { padding: 8 },
  livroNome: {
    fontFamily: FONTES.body,
    fontWeight: '700',
    fontSize: 12,
    color: CORES.dark,
    minHeight: 30,
  },
  livroPreco: {
    fontFamily: FONTES.body,
    fontWeight: '700',
    fontSize: 13,
    color: CORES.dark,
    marginTop: 4,
  },
  livroAutor: {
    fontFamily: FONTES.body,
    fontSize: 11,
    color: CORES.muted,
    marginTop: 2,
  },

  // Categorias
  secaoCategorias: { marginTop: 30, paddingHorizontal: 16 },
  categoriasGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  categoriaCard: {
    width: '31%',
    height: 70,
    borderWidth: 1,
    borderColor: CORES.borderLight,
    borderRadius: 14,
    backgroundColor: CORES.white,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 6,
  },
  categoriaCardTexto: {
    fontFamily: FONTES.body,
    fontWeight: '600',
    fontSize: 11,
    color: CORES.dark,
    textAlign: 'center',
  },
  categoriaCardDestaque: { borderWidth: 2, borderColor: CORES.dark },
  categoriaCardTextoDestaque: { fontWeight: '700' },

  // Footer completo
  footerCompleto: {
    backgroundColor: CORES.header,
    padding: 16,
    paddingBottom: 20,
    marginTop: 16,
    alignItems: 'flex-start',
  },
  footerLogo: {
    fontFamily: FONTES.display,
    fontSize: 18,
    color: CORES.white,
    marginBottom: 4,
  },
  footerCopy: { fontFamily: FONTES.body, fontSize: 11, color: '#94a3b8' },
  footerDivisor: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    width: '100%',
    marginBottom: 12,
  },
  footerSecao: { marginBottom: 12 },
  footerTituloSecao: {
    fontFamily: FONTES.body,
    fontWeight: '700',
    fontSize: 13,
    color: CORES.white,
    marginBottom: 6,
  },
  footerIconesLinha: { flexDirection: 'row', gap: 12 },
  footerLinha: {
    fontFamily: FONTES.body,
    fontSize: 12,
    color: '#cbd5e1',
    marginBottom: 4,
  },
  footerPagamentoLinha: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  footerPagamentoChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 9,
  },
  footerPagamentoTexto: {
    fontFamily: FONTES.body,
    fontSize: 11,
    color: '#cbd5e1',
  },
  footerTopoLinha: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
    marginBottom: 10,
  },
  footerCompactoPadding: { padding: 12, paddingBottom: 14, marginTop: 10 },
  footerSecaoCompacta: { marginBottom: 10 },
  footerColunasCompactas: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});
