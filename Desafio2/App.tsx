import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { View, SafeAreaView } from 'react-native';
import { NavigationContainer, DrawerActions, DefaultTheme as NavLight } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  Provider as PaperProvider,
  MD3LightTheme,
  Appbar,
  Text,
  Button,
  Card,
  Icon,
  ActivityIndicator,
} from 'react-native-paper';

import { styles, Colors, paperTheme as customPaperTheme, navTheme } from './styles';

const paperTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    ...customPaperTheme.colors,
  },
};

const navigationTheme = {
  ...NavLight,
  colors: {
    ...NavLight.colors,
    ...navTheme.colors,
  },
};

type RootDrawerParamList = {
  Principal: undefined;
  Sobre: undefined;
};

type RootStackParamList = {
  Radio: undefined;
  Detalhes: { from?: string } | undefined;
};

const Drawer = createDrawerNavigator<RootDrawerParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

function Header({ title, navigation }: any) {
  return (
    <Appbar.Header mode="center-aligned" style={{ backgroundColor: Colors.radioBody }}>
      <Appbar.Action icon="menu" onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} />
      <Appbar.Content title={title} />
    </Appbar.Header>
  );
}

function ScreenContainer({ children }: { children: React.ReactNode }) {
  return <View style={styles.screen}>{children}</View>;
}

function JokerScreen({ navigation }: any) {
  const [joke, setJoke] = useState<string>('Toque no botão para uma piada!');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getJoke = async () => {
    setIsLoading(true);
    setJoke('...'); 

    try {
      const response = await fetch('https://icanhazdadjoke.com/', {
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'My Joker API Project (React Native)'
        }
      });
      if (!response.ok) throw new Error('Falha na rede');
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
    <ScreenContainer>
      <Card style={styles.radioBody} mode="elevated">
        <Card.Title
          title="Rádio de Piadas"
          left={(props) => <Icon source="radio-tower" size={props.size} />}
        />
        
        <Card.Content style={styles.display}>
          {isLoading ? (
            <ActivityIndicator animating={true} color={Colors.displayText} size="large" />
          ) : (
            <Text style={styles.displayText} variant="titleMedium">{joke}</Text>
          )}
        </Card.Content>

        <Card.Actions style={styles.cardActions}>
          <Button
            mode="contained"
            onPress={getJoke}
            loading={isLoading}
            disabled={isLoading}
            icon="play"
            style={styles.jokeButton}
            labelStyle={styles.jokeButtonText}
          >
            {isLoading ? 'Buscando...' : 'Nova Piada'}
          </Button>
          <Button
            mode="outlined"
            onPress={() => navigation.navigate('Detalhes', { from: 'Rádio' })}
            style={styles.detailsButton}
            icon="arrow-right-circle-outline"
          >
            Detalhes
          </Button>
        </Card.Actions>
      </Card>
    </ScreenContainer>
  );
}

function DetalhesScreen({ route, navigation }: any) {
  const from = route?.params?.from ?? '—';
  return (
    <>
      <Header title="Detalhes" navigation={navigation} />
      <ScreenContainer>
        <Card style={{ backgroundColor: Colors.radioBody }}>
          <Card.Title
            title="Tela de Detalhes"
            left={(props) => <Icon source="file-document" size={props.size} />}
          />
          <Card.Content>
            <Text>Você veio de: {from}</Text>
          </Card.Content>
          <Card.Actions>
            <Button onPress={() => navigation.goBack()}>Voltar</Button>
          </Card.Actions>
        </Card>
      </ScreenContainer>
    </>
  );
}

function SobreScreen({ navigation }: any) {
  return (
    <>
      <Header title="Sobre" navigation={navigation} />
      <ScreenContainer>
        <Card style={{ backgroundColor: Colors.radioBody }}>
          <Card.Title
            title="Sobre o App"
            left={(props) => <Icon source="information" size={props.size} />}
          />
          <Card.Content>
            <Text>Desafio 2:</Text>
            <Text>React Native Paper + Navegação + API de Piadas.</Text>
            <Text>Baseado no "Jokes API" e no exemplo de navegação.</Text>
          </Card.Content>
        </Card>
      </ScreenContainer>
    </>
  );
}

function StackPrincipal({ navigation }: any) {
  return (
    <>
      <Header title="Rádio de Piadas" navigation={navigation} />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Radio" component={JokerScreen} />
        <Stack.Screen name="Detalhes" component={DetalhesScreen} options={{ headerShown: true, header: (props) => <Header title="Detalhes" {...props} /> }} />
      </Stack.Navigator>
    </>
  );
}

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <PaperProvider theme={paperTheme}>
        <NavigationContainer theme={navigationTheme}>
          <Drawer.Navigator
            screenOptions={{
              headerShown: false,
              drawerActiveTintColor: Colors.buttonBackground,
              drawerInactiveTintColor: Colors.radioBorder,
              drawerStyle: { backgroundColor: Colors.radioBody },
            }}
          >
            <Drawer.Screen
              name="Principal"
              component={StackPrincipal}
              options={{
                drawerIcon: ({ color, size }) => <Icon source="radio" size={size} color={color} />,
              }}
            />
            <Drawer.Screen
              name="Sobre"
              component={SobreScreen}
              options={{
                drawerIcon: ({ color, size }) => <Icon source="information-outline" size={size} color={color} />,
              }}
            />
          </Drawer.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaView>
  );
}