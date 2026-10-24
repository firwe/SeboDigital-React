import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importe os dois Contextos
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext"; // <--- Faltava isto aqui!

import TelaHome from "./screens/TelaHome";
import TelaLogin from "./screens/TelaLogin";
import TelaCadastro from "./screens/TelaCadastro";
import TelaProduto from "./screens/TelaProduto";
import TelaCarrinho from "./screens/TelaCarrinho";
import TelaAcervo from "./screens/TelaAcervo";
import TelaColecoes from "./screens/TelaColecoes";
import TelaDesapega from "./screens/TelaDesapega";
import TelaAnunciar from "./screens/TelaAnunciar";
import TelaFinal from "./screens/TelaFinal";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={TelaHome} />
            <Stack.Screen name="Login" component={TelaLogin} />
            <Stack.Screen name="Cadastro" component={TelaCadastro} />
            <Stack.Screen name="Produto" component={TelaProduto} />
            <Stack.Screen name="Carrinho" component={TelaCarrinho} />
            <Stack.Screen name="Acervo" component={TelaAcervo} />
            <Stack.Screen name="Colecoes" component={TelaColecoes} />
            <Stack.Screen name="Desapega" component={TelaDesapega} />
            <Stack.Screen name="Anunciar" component={TelaAnunciar} />
            <Stack.Screen name="Final" component={TelaFinal} />
          </Stack.Navigator>
        </NavigationContainer>
      </CartProvider>
    </AuthProvider>
  );
}