/**
 * Banco de perguntas locais (fallback) para quando a API do Gemini estiver
 * indisponível — por exemplo, quota excedida (429), chave inválida, ou sem internet.
 *
 * O array contém um número generoso de perguntas para manter o quiz variado
 * mesmo em modo offline.
 */

export interface FallbackQuestion {
  question: string;
  options: string[];
  answer: number; // índice da resposta correta em `options`
}

const FALLBACK_QUESTIONS: FallbackQuestion[] = [
  // ── História ──────────────────────────────────────────
  {
    question: "Em que país surgiu a tradição da árvore de Natal?",
    options: ["Alemanha", "Inglaterra", "França", "Estados Unidos"],
    answer: 0,
  },
  {
    question: "Qual papa oficializou o dia 25 de dezembro como data do Natal?",
    options: ["Papa Júlio I", "Papa Leão X", "Papa Gregório I", "Papa Urbano II"],
    answer: 0,
  },
  {
    question: "Em que século a tradição do Papai Noel moderno se popularizou?",
    options: ["Século XIX", "Século XVII", "Século XV", "Século XX"],
    answer: 0,
  },

  // ── Comidas ───────────────────────────────────────────
  {
    question: "Qual é o prato natalino típico da ceia brasileira feito com bacalhau?",
    options: ["Bacalhoada", "Moqueca", "Feijoada", "Bobó de camarão"],
    answer: 0,
  },
  {
    question: "O panetone é um bolo natalino originário de qual país?",
    options: ["Itália", "Portugal", "Espanha", "Grécia"],
    answer: 0,
  },
  {
    question: "Qual bebida quente é tradicional no Natal em países europeus?",
    options: ["Vinho quente (Glühwein)", "Caipirinha", "Mojito", "Sangria"],
    answer: 0,
  },

  // ── Músicas ───────────────────────────────────────────
  {
    question: "Quem compôs a famosa canção 'Noite Feliz' (Stille Nacht)?",
    options: ["Franz Gruber", "Ludwig van Beethoven", "Wolfgang Mozart", "Johann Bach"],
    answer: 0,
  },
  {
    question: "Qual canção natalina contém os versos 'Jingle bells, jingle bells, jingle all the way'?",
    options: ["Jingle Bells", "White Christmas", "Silent Night", "Rudolph"],
    answer: 0,
  },
  {
    question: "Em que ano a canção 'White Christmas' de Bing Crosby foi lançada?",
    options: ["1942", "1935", "1950", "1960"],
    answer: 0,
  },

  // ── Filmes ────────────────────────────────────────────
  {
    question: "Qual filme natalino conta a história de um elfo que descobre ser humano?",
    options: ["Elf (O Duende)", "O Grinch", "Sozinho em Casa", "Milagre na Rua 34"],
    answer: 0,
  },
  {
    question: "Em 'Sozinho em Casa', qual é o nome do protagonista?",
    options: ["Kevin McCallister", "Peter Parker", "John McClane", "Buddy"],
    answer: 0,
  },
  {
    question: "Qual animação da Disney/Pixar se passa durante o Natal e envolve brinquedos?",
    options: ["Toy Story (cena final)", "Frozen", "Carros", "Procurando Nemo"],
    answer: 0,
  },

  // ── Tradições pelo mundo ──────────────────────────────
  {
    question: "Na Islândia, quantos 'Papais Noéis' (Yule Lads) visitam as crianças antes do Natal?",
    options: ["13", "7", "12", "24"],
    answer: 0,
  },
  {
    question: "Em qual país é tradição comer KFC no dia de Natal?",
    options: ["Japão", "Coreia do Sul", "China", "Tailândia"],
    answer: 0,
  },
  {
    question: "Qual tradição mexicana envolve quebrar uma figura de papel machê cheia de doces?",
    options: ["Piñata", "Cascarón", "Tamale", "Posada"],
    answer: 0,
  },
  {
    question: "Na Austrália, o Natal acontece em qual estação do ano?",
    options: ["Verão", "Inverno", "Outono", "Primavera"],
    answer: 0,
  },
  {
    question: "Qual é o nome do companheiro do São Nicolau que assusta crianças más na tradição austríaca?",
    options: ["Krampus", "Grinch", "Zwarte Piet", "Belsnickel"],
    answer: 0,
  },
  {
    question: "Na Espanha, quem traz os presentes para as crianças no dia 6 de janeiro?",
    options: ["Os Reis Magos", "Papai Noel", "São Nicolau", "La Befana"],
    answer: 0,
  },

  // ── Perguntas extras variadas ─────────────────────────
  {
    question: "Qual planta é usada como decoração de Natal e representa um beijo?",
    options: ["Visco (Mistletoe)", "Poinsétia", "Azevinho", "Pinheiro"],
    answer: 0,
  },
  {
    question: "A flor Poinsétia, muito usada no Natal, é originária de qual país?",
    options: ["México", "Brasil", "Peru", "Colômbia"],
    answer: 0,
  },
];

/**
 * Seleciona `count` perguntas aleatórias do banco de fallback,
 * embaralhando as opções de cada uma.
 */
export function getRandomFallbackQuestions(count: number = 6): FallbackQuestion[] {
  const shuffled = [...FALLBACK_QUESTIONS].sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, Math.min(count, shuffled.length));

  // Embaralhar opções de cada pergunta selecionada
  return selected.map((q) => {
    const correctAnswer = q.options[q.answer];
    const shuffledOptions = [...q.options].sort(() => Math.random() - 0.5);
    return {
      ...q,
      options: shuffledOptions,
      answer: shuffledOptions.indexOf(correctAnswer),
    };
  });
}
