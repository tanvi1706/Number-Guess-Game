
import React, { useState } from 'react';
import { View, Text, StyleSheet,Button, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';


import Card from '../components/Card';
import Colors from '../constants/colors';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';
import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import MainButton from '../components/MainButton';

const StartGameScreen = props => {
    const [enteredValue, setEnteredValue] = useState('');
    const [confirmedInput, setConformation] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState();


    const inputChangeHandler = inputText => {
        setEnteredValue(inputText.replace(/[^0-9]/g,''));
    };

    const resetInputHandler = () => {
        setEnteredValue('');
        setConformation(false);
    };

    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredValue);
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert('Invalid number', 'Number has to be a number between 1 and 99.', [{text: 'Okay', style: 'destructive', onPress: resetInputHandler}]);
            return;
        }
        setConformation(true);
        setSelectedNumber(chosenNumber);
        setEnteredValue('');
        Keyboard.dismiss();
    };

    let confirmedOutput;
    if (confirmedInput) {
        confirmedOutput = (<Card style={styles.summaryContainer}>
            <BodyText>You Selected</BodyText>
            <NumberContainer>{selectedNumber}</NumberContainer>
            {/* <Button title="START GAME" onPress={() => { props.onStartGame(selectedNumber)}}/>  */}
            <MainButton onPress={props.onStartGame.bind(this, selectedNumber)}>START GAME</MainButton> 
            </Card>);
    }

    return (
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss();
        }}>
        <View style={styles.screen}>
            <TitleText style={styles.title}>Start a New Game!</TitleText>
            <Card style={styles.innerContainer}>
                <BodyText>Select a Number</BodyText>
                <Input 
                style={styles.inputStyle}
                blurOnSubmit
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="number-pad"
                maxLength={2}
                onChangeText={inputChangeHandler}
                value={enteredValue}
                />
                <View style={styles.buttonContainer}>
                    <View style={styles.buttonStyle}>
                        <Button title="Reset" onPress={resetInputHandler} color={Colors.accent}/>
                    </View>
                    <View style={styles.buttonStyle}>
                        <Button title="Confirm" onPress={confirmInputHandler} color={Colors.primary}/>
                    </View>
                </View>
            </Card>
            {confirmedOutput}
        </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    screen: {
        // flex: 1,
        padding: 10,
        height: '100%',
        alignItems: 'center'
    },
    innerContainer: {
        width: 300,
        maxWidth: '80%',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        marginVertical: 10,
        fontFamily: 'open-sans-bold'
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    buttonStyle: {
        width: 100
    },
    inputStyle: {
       width: 70,
       textAlign: 'center'
    },
    summaryContainer: {
        marginTop: 20,
        alignItems: 'center'
    }
});

export default StartGameScreen;