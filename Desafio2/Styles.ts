import { StyleSheet } from 'react-native';

export const Colors = {
  backgroundBody: '#aad8db',
  radioBody: '#FDCA6A',
  radioBorder: '#333533',
  displayBackground: 'grey',
  displayText: 'lightgrey',
  buttonBackground: '#DD3747',
  buttonText: '#333533',
  buttonPressed: '#C02A3A',
};

export const paperTheme = {
  colors: {
    background: Colors.backgroundBody,
    surface: Colors.radioBody,
    primary: Colors.buttonBackground,
    outline: Colors.radioBorder,
    onSurface: Colors.radioBorder,
    onSurfaceVariant: Colors.radioBorder,
    elevation: {
      level2: Colors.radioBody
    }
  },
};

export const navTheme = {
  colors: {
    background: Colors.backgroundBody,
    card: Colors.radioBody,
    text: Colors.radioBorder,
    border: Colors.radioBorder,
    primary: Colors.buttonBackground,
  },
};

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.radioBody,
  },
  screen: {
    flex: 1,
    padding: 16,
    backgroundColor: Colors.backgroundBody,
    gap: 16,
  },
  radioBody: {
    backgroundColor: Colors.radioBody,
    borderWidth: 5,
    borderColor: Colors.radioBorder,
  },
  display: {
    backgroundColor: Colors.displayBackground,
    borderWidth: 5,
    borderColor: Colors.radioBorder,
    minHeight: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    padding: 10,
  },
  displayText: {
    color: Colors.displayText,
    textAlign: 'center',
    fontSize: 20,
  },
  cardActions: {
    flexDirection: 'column',
    alignItems: 'stretch',
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 10,
  },
  jokeButton: {
    borderWidth: 4,
    borderColor: Colors.radioBorder,
    paddingVertical: 8,
  },
  jokeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.buttonText,
  },
  detailsButton: {
    borderColor: Colors.radioBorder,
    borderWidth: 2,
  }
});