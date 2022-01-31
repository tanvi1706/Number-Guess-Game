import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import * as Font from 'expo-font';
import AppLoading  from 'expo-app-loading';

import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOver from './screens/GameOver';

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
};

export default function App() {
const [userNumber, setUserNumber] = useState();
const [guessRounds, setGuessRounds] = useState(0);
const [dataLoaded, setDataLoaded] = useState(false);

if(!dataLoaded){
  return (<AppLoading 
  startAsync={fetchFonts} 
  onFinish={() => setDataLoaded(true)} 
  onError={(err) => console.log(err)} 
  />);  // startAsync should be the action which takes th eloading time and also it should return a promise!!
};

const configureNewGameHandler = () => {
  setGuessRounds(0);
  setUserNumber(0);
};

const startGameHnadler = (selectedNumber) => {
  setUserNumber(selectedNumber);
  setGuessRounds(0);
};
const gameOverHnadler = numOfRounds => {
  setGuessRounds(numOfRounds);
};

let content = <StartGameScreen onStartGame={startGameHnadler}/>;
if (userNumber && guessRounds <= 0) {
  content = <GameScreen userChoice={userNumber} onGameOver={gameOverHnadler}/>;
} else if( guessRounds > 0){
  content = <GameOver roundsNumber={guessRounds} userNumber={userNumber} newGame={configureNewGameHandler}/>;
}
  return (
    <View syle={styles.screen}>
      <Header title='Guess a Number'/>
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
   flex: 1
  },
});
