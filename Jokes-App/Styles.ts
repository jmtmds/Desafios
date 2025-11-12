import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  // Estilo base do container da tela, vindo do seu exemplo
  screen: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FAFAFA',
    gap: 16, // 'gap' é útil para espaçar elementos filhos
  },
  
  // Estilos adicionados para o App de Piadas
  cardContent: {
    gap: 10, // Espaço entre o setup e a punchline
  },
  punchline: {
    fontStyle: 'italic',
    fontWeight: 'bold',
    marginTop: 5,
  },
  // Estilo para o container da FlatList
  listContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  }
});