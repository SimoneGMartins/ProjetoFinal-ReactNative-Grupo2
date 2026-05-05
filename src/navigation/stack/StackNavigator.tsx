import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import HomeScreen from '../../screens/Home';
import RankingScreen from '../../screens/Ranking';
import QuizScreen from '../../screens/Quiz';
import ResultScreen from '../../screens/Result';
import { stackStyles, headerTintColor } from './styles';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function StackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: true,
        headerStyle: stackStyles.headerStyle,
        headerTintColor: headerTintColor,
        headerTitleStyle: stackStyles.headerTitleStyle,
        contentStyle: { backgroundColor: 'transparent' },
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Ranking"
        component={RankingScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Quiz"
        component={QuizScreen}
        options={{ title: 'Quiz' }}
      />
      <Stack.Screen
        name="Result"
        component={ResultScreen}
        options={{ title: 'Resultado' }}
      />
    </Stack.Navigator>
  );
}

