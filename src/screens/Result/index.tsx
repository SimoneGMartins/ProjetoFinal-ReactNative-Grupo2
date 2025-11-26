import React from 'react';
<<<<<<< Updated upstream
import { View, Text, Button, StyleSheet } from 'react-native';
//import from '../context/QuizContext';//

export default function ResultScreen({ route, navigation }: any) {
  const { score, playerName } = route.params; //  nome e pontuação
=======
import { View, Text, TouchableOpacity,  } from 'react-native';
import { styles } from './styles';

export default function ResultScreen({ route, navigation }: any) {
  const { score, playerName } = route.params;
>>>>>>> Stashed changes

  const handleSave = async () => {
    const newRecord = {
      name: playerName,
      score,
      date: new Date().toISOString(),
    };

    try {
<<<<<<< Updated upstream
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
=======
      await fetch("https://690a7b0d1a446bb9cc22a902.mockapi.io/Registro_Pontuacao", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newRecord),
      });
>>>>>>> Stashed changes

      navigation.navigate("Ranking");
    } catch (error) {
      console.error("Erro ao salvar:", error);
    }
  };

  return (
<<<<<<< Updated upstream
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


=======
   
      <View style={styles.container}>

        <Text style={styles.title}>Resultado</Text>
        <Text style={styles.subtitle}>Seu desempenho na missão do Noel</Text>

        
        <View style={styles.card}>
          <Text style={styles.cardTitle}>PONTUAÇÃO</Text>
          

          <View style={styles.scoreRow}>
            <Text style={styles.scoreLabel}>Você fez:</Text>
            <Text style={styles.scoreValue}>{score} pontos</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Salvar Pontuação</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Ranking")}
        >
          <Text style={styles.buttonText}>Ir para Ranking</Text>
        </TouchableOpacity>

      </View>
    
  );
}
>>>>>>> Stashed changes
