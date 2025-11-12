import { StyleSheet } from 'react-native';
import { DefaultTheme as PaperDefaultTheme } from 'react-native-paper';
import { DefaultTheme as NavDefaultTheme } from '@react-navigation/native';

export const Colors = {
  backgroundBody: '#aad8db',
  radioBody: '#FDCA6A',
  radioBorder: '#333533',
  displayBackground: '#4a4a4a',
  displayText: '#E0E0E0',
  buttonBackground: '#DD3747',
  buttonText: '#FFFFFF',
  buttonPressed: '#C02A3A',
  buttonDisabled: '#B0B0B0',
  buttonDisabledBorder: '#666',
  primary: '#DD3747',
  accent: '#FDCA6A',
};

export const paperTheme = {
  ...PaperDefaultTheme,
  colors: {
    ...PaperDefaultTheme.colors,
    primary: Colors.primary,
    background: Colors.backgroundBody,
    surface: Colors.radioBody,
    onSurface: Colors.radioBorder,
  },
};

export const navTheme = {
  ...NavDefaultTheme,
  colors: {
    ...NavDefaultTheme.colors,
    background: Colors.backgroundBody,
    card: Colors.radioBody,
    text: Colors.radioBorder,
    primary: Colors.primary,
    border: Colors.radioBorder,
  },
};

export const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    padding: 16,
    gap: 16,
  },
  radioBodyCard: {
    backgroundColor: Colors.radioBody,
    borderWidth: 5,
    borderColor: Colors.radioBorder,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  displayCard: {
    width: '100%',
    minHeight: 200,
    backgroundColor: Colors.displayBackground,
    borderRadius: 15,
    borderWidth: 5,
    borderColor: Colors.radioBorder,
    justifyContent: 'center',
    alignItems: 'center',
  },
  displayText: {
    color: Colors.displayText,
    textAlign: 'center',
  },
  cardActions: {
    justifyContent: 'center',
    paddingBottom: 8,
    paddingHorizontal: 16,
    gap: 12,
  },
  jokeButton: {
    flex: 1,
    borderWidth: 4,
    borderColor: Colors.radioBorder,
    borderRadius: 5,
  },
  jokeButtonContent: {
    paddingVertical: 8,
  },
  jokeButtonLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});