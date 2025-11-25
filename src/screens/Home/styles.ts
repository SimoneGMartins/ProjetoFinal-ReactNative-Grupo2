import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#194201ff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  input: {
     width: '90%',
     height: 50,
     borderRadius: 15,
     backgroundColor: '#fff',
     paddingHorizontal: 15,
     fontSize: 16,
     marginTop: 25,
     marginBottom: 35,
},


  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },

  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#C1272D',
    marginBottom: 6,
  },

  subtitle: {
    fontSize: 16,
    color: '#ffffffff',
    marginTop: 15,
    marginBottom: 35,
  },

  buttonSecondary: {
    width: '45%',
    padding: 15,
    borderRadius: 12,
    backgroundColor: '#0B6623',
    alignItems: 'center',
    marginTop: 20,
  },

  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 18,
  }
});