import * as React from 'react';
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

import { styles, Colors, paperTheme as customPaperTheme, navTheme as customNavTheme } from './Styles'; 
import { StatusBar } from 'expo-status-bar';

type RootDrawerParamList = {
  Principal: undefined;
  Sobre: undefined;
};

type RootStackParamList = {
  Joker: undefined;
  Detalhes: { from?: string } | undefined;
};

const Drawer = createDrawerNavigator<RootDrawerParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

const paperTheme = {
  ...MD3LightTheme,
  ...customPaperTheme,
};

const navTheme = {
  ...NavLight,
  ...customNavTheme,
};

function Header({ title, navigation }: any) {
  return (
    <Appbar.Header mode="center-aligned" style={{ backgroundColor: Colors.radioBody }}>
      <Appbar.Action icon="menu" onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} />
      <Appbar.Content title={title} />
    </Appbar.Header>
  );
}

function JokerScreen({ navigation }: any) {
  const [joke, setJoke] = React.useState<string>('JM - Jokes API \n(icanhaz dadjoke)');
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

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
      if (!response.ok) throw new Error('A piada se perdeu!');
      const data = await response.json();
      setJoke(data.joke);
    } catch (error) {
      console.error(error);
      setJoke('Piada ruim. Tente de novo mais tarde.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScreenContainer>
      <Card style={styles.radioBodyCard} mode="elevated">
        <Card.Title
          title="Rádio de Piadas"
          left={(props) => <Icon source="radio-tower" size={props.size} />}
        />
        
        <Card.Content>
          <View style={styles.displayCard}>
            {isLoading ? (
              <ActivityIndicator animating={true} color={Colors.displayText} size="large" />
            ) : (
              <Text style={styles.displayText} variant="titleMedium">{joke}</Text>
            )}
          </View>
        </Card.Content>

        <Card.Actions style={styles.cardActions}>
          <Button
            mode="contained"
            onPress={getJoke}
            loading={isLoading}
            disabled={isLoading}
            style={styles.jokeButton}
            contentStyle={styles.jokeButtonContent}
            labelStyle={styles.jokeButtonLabel}
            buttonColor={Colors.buttonBackground}
            textColor={Colors.buttonText}
          >
            {isLoading ? 'BUSCANDO...' : 'JOKE'}
          </Button>
        </Card.Actions>
        
        <Card.Actions style={{justifyContent: 'center', paddingTop: 0}}>
           <Button
            mode="outlined"
            onPress={() => navigation.navigate('Detalhes', { from: 'Rádio' })}
            textColor={Colors.radioBorder}
            style={{ borderColor: Colors.radioBorder }}
          >
            Ir para Detalhes
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
        <Card>
          <Card.Title title="Tela de Detalhes" left={(props) => <Icon source="file-document" size={props.size} />} />
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

function StackPrincipal({ navigation }: any) {
  return (
    <>
      <Header title="Principal" navigation={navigation} />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Joker" component={JokerScreen} />
        <Stack.Screen name="Detalhes" component={DetalhesScreen} />
      </Stack.Navigator>
    </>
  );
}

function SobreScreen({ navigation }: any) {
  return (
    <>
      <Header title="Sobre" navigation={navigation} />
      <ScreenContainer>
        <Card>
          <Card.Title title="Sobre o App" left={(props) => <Icon source="information" size={props.size} />} />
          <Card.Content>
            <Text>Desafio 2: App com React Native Paper, Navegação e a Jokes API.</Text>
          </Card.Content>
        </Card>
      </ScreenContainer>
    </>
  );
}

function ScreenContainer({ children }: { children: React.ReactNode }) {
  return <SafeAreaView style={styles.screenContainer}>{children}</SafeAreaView>;
}

export default function App() {
  return (
    <PaperProvider theme={paperTheme}>
      <NavigationContainer theme={navTheme}>
        <StatusBar style="auto" />
        <Drawer.Navigator
          screenOptions={{
            headerShown: false,
            drawerActiveTintColor: Colors.primary,
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
  );
}