import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Text, View, Pressable, ActivityIndicator, SafeAreaView } from 'react-native';
import { styles } from './Styles';

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