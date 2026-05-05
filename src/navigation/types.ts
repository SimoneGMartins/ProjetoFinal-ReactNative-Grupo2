import { Score } from '../context/QuizContext';

export type RootStackParamList = {
  Home: undefined;
  Ranking: undefined;
  Quiz: { questionIndex: number, totalQuestions: number };
  Result: { score: number, totalQuestions: number };
};