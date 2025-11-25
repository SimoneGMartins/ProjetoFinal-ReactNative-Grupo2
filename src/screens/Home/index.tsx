import React, { useState } from 'react';
import { styles } from './styles';
import { ButtonPrimary } from '../../components/ButtonPrimary';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation();
  const [name, setName] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎄 Quiz Natalino 🎅</Text>
      <Text style={styles.subtitle}>Teste seus conhecimentos sobre o Natal!</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite seu nome"
        placeholderTextColor="#aaa"
        value={name}
        onChangeText={setName}
      />

      <TouchableOpacity>
        <ButtonPrimary
          title="Iniciar Jogo"
          onPress={() => navigation.navigate('Quiz', { playerName: name })}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonSecondary}
        onPress={() => navigation.navigate('Ranking')}
      >
        <Text style={styles.buttonText}>Ver Ranking</Text>
      </TouchableOpacity>
    </View>
  );
}
