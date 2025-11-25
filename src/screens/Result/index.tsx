import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
//import from '../context/QuizContext';//

export default function ResultScreen({ route, navigation }: any) {
  const { score, playerName } = route.params; //  nome e pontuação

  const handleSave = async () => {
    const newRecord = {
      name: playerName,
      score,
      date: new Date().toISOString(),
    };

    try {
      await fetch(
        "https://690a7b0d1a446bb9cc22a902.mockapi.io/Registro_Pontuacao",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newRecord),
        }
      );

      navigation.navigate("Ranking");
    } catch (error) {
      console.error("Erro ao salvar:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resultado</Text>

      <Text style={styles.player}>Jogador: {playerName}</Text>

      <Text style={styles.score}>Você fez {score} pontos!</Text>

      <Button title="Salvar Pontuação" onPress={handleSave} />

      <View style={{ height: 20 }} />

      <Button
        title="Ir para Ranking"
        onPress={() => navigation.navigate("Ranking")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 12
  },
  player: {
    fontSize: 20,
    marginBottom: 10
  },
  score: {
    fontSize: 20,
    marginBottom: 20
  }
});
