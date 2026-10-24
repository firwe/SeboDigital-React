import React, { useState, useRef, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList, Dimensions } from "react-native";
import { styles } from "../../styles/homeStyles";

const LARGURA_SLIDE = Dimensions.get("window").width - 32;

export default function Carrossel({ slides, onPressCta }) {
  const [indice, setIndice] = useState(0);
  const listaRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      const proximo = (indice + 1) % slides.length;
      listaRef.current?.scrollToOffset({ offset: proximo * LARGURA_SLIDE, animated: true });
      setIndice(proximo);
    }, 6000);
    return () => clearInterval(timer);
  }, [indice, slides.length]);

  function aoTerminarRolagem(evento) {
    const novoIndice = Math.round(evento.nativeEvent.contentOffset.x / LARGURA_SLIDE);
    setIndice(novoIndice);
  }

  return (
    <View style={styles.carrosselContainer}>
      <FlatList
        ref={listaRef}
        data={slides}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={aoTerminarRolagem}
        keyExtractor={(_, i) => String(i)}
        style={styles.carrosselLista}
        renderItem={({ item }) => (
          <View style={[styles.slide, { width: LARGURA_SLIDE, backgroundColor: item.cor }]}>
            <Text style={styles.slideTitulo}>{item.titulo}</Text>
            <Text style={styles.slideTexto}>{item.texto}</Text>
            <TouchableOpacity style={styles.slideBotao} onPress={() => onPressCta(item.cta)}>
              <Text style={styles.slideBotaoTexto}>{item.cta}</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <View style={styles.pontosContainer}>
        {slides.map((_, i) => (
          <View key={i} style={[styles.ponto, i === indice && styles.pontoAtivo]} />
        ))}
      </View>
    </View>
  );
}