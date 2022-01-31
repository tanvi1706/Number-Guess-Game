import React from "react";
import { StyleSheet, View } from "react-native";

const Card = props => {
    return (<View style={{...styles.inputContainer, ...props.style}}>
        {props.children}
    </View>);
};

const styles = StyleSheet.create({
    inputContainer: {
        shadowColor: 'black',
        shadowOffset: {
           width: 0, height: 2
        },
        shadowRadius: 6,
        shadowOpacity: 0.26,
        backgroundColor: 'white',

        padding:20,
        borderRadius: 20

    },
});


export default Card;