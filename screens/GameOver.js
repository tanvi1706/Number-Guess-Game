import React from 'react';
import { Text, View, StyleSheet, Button, Image} from 'react-native';


import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import Colors from '../constants/colors';
import MainButton from '../components/MainButton';

const GameOver = props => {
    return (
        <View style={style1.screenContainer}>
            <TitleText>The Game is Over!</TitleText>
            <View style={style1.imageContainer}>
            <Image style={style1.image}
            //  source={require('../assets/success.png')}
                source={{uri: 'https://cdn.mos.cms.futurecdn.net/ntFmJUZ8tw3ULD3tkBaAtf.jpg'}}
             />
             </View>
            <View style={style1.resultContainer}>
            <BodyText style={style1.resultText}>Your phone needed 
                <Text style={style1.highlight}> {props.roundsNumber} </Text> 
                 rounds to guess the number<Text style={style1.highlight}> {props.userNumber} </Text>
            </BodyText>
            </View>
            <MainButton onPress={props.newGame}>New Game ?</MainButton>
        </View>
    );
};

const style1 = StyleSheet.create({
    screenContainer: {
        
       // flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: '100%',
        height: '100%'
    },
    resultContainer:{
        width: '80%',
        marginHorizontal: 20
    },
    resultText:{
        textAlign: 'center',
        fontSize: 20,
        marginVertical: 15
    },
    imageContainer: {
        width: '80%',
        height: 300,
        borderRadius: 200,
        borderWidth: 3,
        borderColor: 'black', 
        overflow: 'hidden',
        marginVertical: 20
    },
    highlight: {
        color: Colors.primary,
        fontFamily: 'open-sans-bold'
    } // only Text components styles are passed down to the child components.... only for nested Text components...
    // View uses flexbox not text ... also the text is wrapped in a new-line
});
export default GameOver;