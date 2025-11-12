import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable, ActivityIndicator, SafeAreaView } from 'react-native';

export default function App() {
  const [joke, setJoke] = useState<string>('JM - Jokes API \n(icanhaz dadjoke)');
  
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getJoke = async () => {
    setIsLoading(true);
    setJoke('...');

    try {
      const response = await fetch('https://icanhazdadjoke.com/', {
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'My Joker API Project'
        }
      });

      if (!response.ok) {
        throw new Error('A piada se perdeu no caminho!');
      }

      const data = await response.json();
      setJoke(data.joke);

    } catch (error) {
      console.error('Erro ao buscar a piada:', error);
      setJoke('Piada ruim. Tente de novo mais tarde.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      
      <View style={styles.radioBody}>
        
        <View style={styles.display}>
          {isLoading && !joke.includes('...') ? (
            <ActivityIndicator size="large" color="lightgrey" />
          ) : (
            <Text style={styles.displayText}>{joke}</Text>
          )}
        </View>

        <Pressable
          style={({ pressed }) => [
            styles.button,
            isLoading && styles.buttonDisabled,
            pressed && !isLoading && styles.buttonPressed
          ]}
          onPress={getJoke}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>
            {isLoading ? 'BUSCANDO...' : 'JOKE'}
          </Text>
        </Pressable>

      </View>
      
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#aad8db',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  radioBody: {
    width: '100%',
    maxWidth: 350,
    backgroundColor: '#FDCA6A',
    borderRadius: 30,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
    borderWidth: 5,
    borderColor: '#333533',
  },
  display: {
    width: '100%',
    minHeight: 200,
    backgroundColor: 'grey',
    borderRadius: 15,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 5,
    borderColor: '#333533',
    marginBottom: 25,
  },
  displayText: {
    fontSize: 20,
    color: 'lightgrey',
    textAlign: 'center',
    fontWeight: '500',
  },
  button: {
    width: '100%',
    backgroundColor: '#DD3747',
    padding: 18,
    borderRadius: 5,
    borderWidth: 4,
    borderColor: '#333533',
    alignItems: 'center',
  },
  buttonPressed: {
    backgroundColor: '#C02A3A',
  },
  buttonDisabled: {
    backgroundColor: '#B0B0B0',
    borderColor: '#666',
  },
  buttonText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333533',
  },
});