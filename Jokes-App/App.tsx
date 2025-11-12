import 'react-native-gesture-handler';
import * as React from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { NavigationContainer, DrawerActions, DefaultTheme as NavLight } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  Provider as PaperProvider,
  MD3LightTheme,
  Appbar,
  Text,
  Button,
  Card,
  Icon,
} from 'react-native-paper';
import { styles } from './Styles'; // Importando os estilos

// --- Tipagem da API de Piadas ---
type Joke = {
  id: number;
  type: string;
  setup: string;
  punchline: string;
};

// --- Tipagem da Navegação ---
type RootDrawerParamList = {
  Principal: undefined;
  Sobre: undefined;
};
type RootStackParamList = {
  Tabs: undefined;
  Detalhes: { from?: string } | undefined;
};

const Drawer = createDrawerNavigator<RootDrawerParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();
const Tabs = createBottomTabNavigator();

// --- Temas (do seu exemplo) ---
const paperTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    background: '#FAFAFA',
    surface: '#FFFFFF',
  },
};
const navTheme = {
  ...NavLight,
  colors: {
    ...NavLight.colors,
    background: '#FAFAFA',
    card: '#FFFFFF',
    text: '#1F2937',
    border: '#E5E7EB',
  },
};

// --- Componente Header (do seu exemplo) ---
function Header({ title, navigation }: any) {
  return (
    <Appbar.Header mode="center-aligned">
      <Appbar.Action icon="menu" onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} />
      <Appbar.Content title={title} />
    </Appbar.Header>
  );
}

// --- Componentes de Tela Modificados ---

// Tela 1: Busca uma piada aleatória
function RandomJokeScreen({ navigation }: any) {
  const [joke, setJoke] = React.useState<Joke | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const fetchJoke = async () => {
    setLoading(true);
    setError(null);
    setJoke(null);
    try {
      const response = await fetch('https://official-joke-api.appspot.com/random_joke');
      if (!response.ok) throw new Error('Erro ao buscar dados da API');
      const data: Joke = await response.json();
      setJoke(data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchJoke();
  }, []);

  return (
    <ScreenContainer>
      <Card mode="elevated">
        <Card.Title title="Piada Aleatória" left={(props) => <Icon source="emoticon-happy-outline" size={24} {...props} />} />
        <Card.Content style={styles.cardContent}>
          {loading && <ActivityIndicator animating={true} />}
          {error && <Text variant="bodyLarge">Erro: {error}</Text>}
          {joke && (
            <>
              <Text variant="titleMedium">{joke.setup}</Text>
              <Text variant="bodyLarge" style={styles.punchline}>{joke.punchline}</Text>
            </>
          )}
        </Card.Content>
        <Card.Actions>
          <Button mode="contained" onPress={fetchJoke} disabled={loading}>
            Nova Piada
          </Button>
          <Button mode="outlined" onPress={() => navigation.navigate('Detalhes', { from: 'Piada Aleatória' })}>
            Ir para Detalhes
          </Button>
        </Card.Actions>
      </Card>
    </ScreenContainer>
  );
}

// Tela 2: Busca 10 piadas e lista
function JokeListScreen({ navigation }: any) {
  const [jokes, setJokes] = React.useState<Joke[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const fetchJokes = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://official-joke-api.appspot.com/random_ten');
      if (!response.ok) throw new Error('Erro ao buscar dados da API');
      const data: Joke[] = await response.json();
      setJokes(data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchJokes();
  }, []);

  if (loading) {
    return <ScreenContainer><ActivityIndicator animating={true} size="large" /></ScreenContainer>;
  }

  if (error) {
    return <ScreenContainer><Text>Erro: {error}</Text></ScreenContainer>;
  }

  return (
    <FlatList
      data={jokes}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.listContainer}
      renderItem={({ item }) => (
        <Card mode="elevated" style={{ marginBottom: 16 }}>
          <Card.Content style={styles.cardContent}>
            <Text variant="bodyMedium">{item.setup}</Text>
            <Text variant="bodyMedium" style={styles.punchline}>{item.punchline}</Text>
          </Card.Content>
          <Card.Actions>
            <Button mode="outlined" onPress={() => navigation.navigate('Detalhes', { from: `Piada #${item.id}` })}>
              Abrir Detalhes
            </Button>
          </Card.Actions>
        </Card>
      )}
    />
  );
}

// --- Navegação (Tabs, Stack, Drawer) ---

function TabsScreen() {
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#2563EB',
        tabBarStyle: { backgroundColor: '#FFFFFF' },
        tabBarIcon: ({ color, size }) => {
          const icon = route.name === 'Piada' ? 'emoticon-happy-outline' : 'format-list-bulleted';
          return <Icon source={icon as any} size={size} color={color} />;
        },
      })}
    >
      <Tabs.Screen name="Piada" component={RandomJokeScreen} />
      <Tabs.Screen name="Lista" component={JokeListScreen} />
    </Tabs.Navigator>
  );
}

function DetalhesScreen({ route, navigation }: any) {
  const from = route?.params?.from ?? '—';
  return (
    <>
      <Header title="Detalhes" navigation={navigation} />
      <ScreenContainer>
        <Card>
          <Card.Title title="Tela de Detalhes" left={(p) => <Icon source="file-document-outline" size={24} {...p} />} />
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
      <Header title="App de Piadas" navigation={navigation} />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Tabs" component={TabsScreen} />
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
          <Card.Title title="Sobre o App" left={(p) => <Icon source="information-outline" size={24} {...p} />} />
          <Card.Content>
            <Text>App de Piadas com Paper + Drawer + Tabs + Stack.</Text>
            <Text>Consumindo a 'official-joke-api'.</Text>
          </Card.Content>
        </Card>
      </ScreenContainer>
    </>
  );
}

function ScreenContainer({ children }: { children: React.ReactNode }) {
  return <View style={styles.screen}>{children}</View>;
}

export default function App() {
  return (
    <PaperProvider theme={paperTheme}>
      <NavigationContainer theme={navTheme}>
        <Drawer.Navigator
          screenOptions={{
            headerShown: false,
            drawerActiveTintColor: '#2563EB',
            drawerStyle: { backgroundColor: '#FFFFFF' },
          }}
        >
          <Drawer.Screen
            name="Principal"
            component={StackPrincipal}
            options={{
              drawerIcon: ({ color, size }) => <Icon source="view-dashboard" size={size} color={color} />,
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