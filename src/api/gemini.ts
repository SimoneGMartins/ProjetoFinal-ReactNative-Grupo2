import { GEMINI_API_KEY } from "@env";
import { getRandomFallbackQuestions } from "./fallbackQuestions";

const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

export interface Question {
  question: string;
  options: string[];
  answer: number;
}

const prompt = `Gere 5 perguntas ÚNICAS e VARIADAS sobre Natal (PT-BR).
Aborde temas diversos: História, Comidas, Músicas, Filmes e Tradições pelo mundo. Evite perguntas repetitivas.

Retorne APENAS um array de arrays (JSON válido e completo) neste formato:
[
  ["Pergunta 1?", ["Op1", "Op2", "Op3", "Op4"], "Resposta Correta"],
  ["Pergunta 2?", ["Op1", "Op2", "Op3", "Op4"], "Resposta Correta"]
]

Sem markdown, sem texto extra, apenas o JSON puro.`;

export async function getGeminiQuestions(): Promise<Question[]> {
  try {
    console.log('GEMINI_API_KEY loaded:', GEMINI_API_KEY ? 'Yes' : 'No');

    const response = await fetch(GEMINI_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.8,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 4096,
        }
      }),
    });

    if (!response.ok) {
      console.warn(`⚠️ Gemini API retornou erro ${response.status}. Usando perguntas locais...`);
      return getRandomFallbackQuestions(5);
    }

    const data = await response.json();
    const textResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!textResponse) {
      console.warn('⚠️ Resposta da API sem conteúdo. Usando perguntas locais...');
      return getRandomFallbackQuestions(5);
    }

    const jsonText = textResponse.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    const rawQuestions = JSON.parse(jsonText);

    if (!Array.isArray(rawQuestions)) {
      console.warn('⚠️ Formato de resposta inválido. Usando perguntas locais...');
      return getRandomFallbackQuestions(5);
    }

    console.log('✅ Perguntas carregadas da API Gemini com sucesso!');

    return rawQuestions.map((item: any) => {
      const questionText = item[0];
      const options = [...item[1]];
      const correctAnswer = item[2];

      for (let i = options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [options[i], options[j]] = [options[j], options[i]];
      }

      const correctIndex = options.indexOf(correctAnswer);

      return {
        question: questionText,
        options: options,
        answer: correctIndex,
      };
    });

  } catch (error) {
    console.warn('⚠️ Não foi possível conectar à API. Usando perguntas locais...');
    return getRandomFallbackQuestions(5);
  }
}
