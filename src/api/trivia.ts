import { GEMINI_API_KEY } from "@env";
import { getRandomFallbackQuestions } from "./fallbackQuestions";

export interface TriviaQuestion {
  question: string;
  options: string[];
  answer: number;
}

const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

export async function getHardQuestion(): Promise<TriviaQuestion> {
  try {
    const prompt = `Gere 1 pergunta DIFÍCIL sobre Natal (PT-BR).

Retorne APENAS um array com UMA pergunta neste formato JSON:
[["Pergunta difícil?", ["Opção1", "Opção2", "Opção3", "Opção4"], "Resposta Correta"]]

Sem markdown, sem texto extra, apenas o JSON puro.`;

    const response = await fetch(GEMINI_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.8,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048,
        }
      }),
    });

    if (!response.ok) {
      console.warn(`⚠️ [Trivia] API retornou erro ${response.status}. Usando pergunta local...`);
      return getRandomFallbackQuestions(1)[0];
    }

    const data = await response.json();
    const textResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!textResponse) {
      console.warn('⚠️ [Trivia] Resposta sem conteúdo. Usando pergunta local...');
      return getRandomFallbackQuestions(1)[0];
    }

    const jsonText = textResponse.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    const rawQuestions = JSON.parse(jsonText);

    if (!Array.isArray(rawQuestions) || rawQuestions.length === 0) {
      console.warn('⚠️ [Trivia] Formato inválido. Usando pergunta local...');
      return getRandomFallbackQuestions(1)[0];
    }

    const item = rawQuestions[0];
    const questionText = item[0];
    const options = [...item[1]];
    const correctAnswer = item[2];

    // Embaralhar opções
    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [options[i], options[j]] = [options[j], options[i]];
    }

    const correctIndex = options.indexOf(correctAnswer);

    console.log('✅ [Trivia] Pergunta carregada da API com sucesso!');

    return {
      question: questionText,
      options: options,
      answer: correctIndex,
    };
  } catch (error) {
    console.warn('⚠️ [Trivia] Não foi possível conectar à API. Usando pergunta local...');
    return getRandomFallbackQuestions(1)[0];
  }
}
