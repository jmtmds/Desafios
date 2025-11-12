import { StyleSheet } from 'react-native';


export const styles = StyleSheet.create({
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