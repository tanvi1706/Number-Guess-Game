import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import defaultStyles from '../constants/default-styles';
import MainButton from '../components/MainButton';
import BodyText from '../components/BodyText';

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const ranNum = Math.floor(Math.random() * (max-min)) + min;
    if(ranNum === exclude){
        return generateRandomBetween(min,max,exclude);
    } else {
        return ranNum;
    }
};

const renderListItem = (value, numOfRound) => {
    return (<View key={value} style={style.listItem}>
        <BodyText>#{numOfRound}</BodyText>
        <BodyText>{value}</BodyText>
    </View>)
};


const GameScreen = props => {
    const initialGuess = generateRandomBetween(1,100,props.userChoice) 
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const currentLow = useRef(1); // there is no need to re-render the component just because a value got changed!
    const currentHigh = useRef(100);
    const [pastGuess, setPastGuess] = useState([initialGuess]);

    const { userChoice, onGameOver } = props;

    useEffect(() => {
        if(currentGuess === userChoice){
            onGameOver(pastGuess.length);
        }
    },[currentGuess,userChoice, onGameOver ]);

    const nextGuessDirection = (direction) => {
        if ((direction === 'lower' && currentGuess < props.userChoice) || (direction === 'greater' && currentGuess > props.userChoice))
        {
            Alert.alert('Don\'t lie', 'You know that this is wrong...',[{text: 'Sorry!', style: 'cancel'}]);
            return;
        }
        if(direction === 'lower'){
            currentHigh.current = currentGuess;
        }
        else{
            currentLow.current = currentGuess + 1;
        }
        const nextNum = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
        setCurrentGuess(nextNum);
        //setRounds(currRounds => currRounds + 1);
        setPastGuess(curPastGuesses => [nextNum, ...curPastGuesses]);
    };
    // bind: preconfigure with the next guess render cycle...

    return (
        <View style={style.screen}>
            <Text style={defaultStyles.bodyText}>Opponent's Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={style.buttonContainer}>
                <MainButton onPress={nextGuessDirection.bind(this,'lower')}>
                    <Ionicons name="md-remove" size={24} color="white"/>
                </MainButton>
                <MainButton onPress={nextGuessDirection.bind(this, 'greater')}>
                    <Ionicons name="md-add" size={24} color="white" />
                </MainButton>
            </Card>
            <View style={style.listConatiner}>
                <ScrollView contentContainerStyle={style.list}>
                    {pastGuess.map((guess,index) => renderListItem(guess, pastGuess.length - index))}
                </ScrollView>
            </View>
        </View>
    );
};

const style = StyleSheet.create({
    screen: {
        //flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        width: 300,
        maxWidth: '80%',
        alignItems: 'center'
    },
    
    listContainer: {
        //flex: 1,
        width: '80%'
    }, 
    list: {
       flexGrow: 1,
       alignItems: 'center',
       justifyContent: 'flex-end',
        
    },
    listItem: {
        borderColor: '#ccc',
        borderWidth: 1,
        flexDirection: 'row',
        padding: 15,
        marginVertical: 10,
        backgroundColor: 'white',
        justifyContent: 'space-around',
        width: '60%'
    },
});

export default GameScreen;