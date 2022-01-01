import React from 'react'
import { StyleSheet, View, Text, ImageBackground, TouchableOpacity, Dimensions } from 'react-native'

import Hole from '../holes/hole';
import { slotStyles } from '../../styles/hole';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const Greet = ({ next, prevAns }) => {
    const arrAns = prevAns.split('');
    const holeWidth = slotStyles.slotCont.width;

    return (
        <ImageBackground style={styles.imageBackgroundSize}>
            <Text style={styles.great}>GREAT</Text>
            <ImageBackground source={require('../../assets/img/coins41.png')} style={styles.coins}>
                <Text style={styles.plusFour}>+4</Text>
            </ImageBackground>
            <View style={{ ...styles.answerCont, width: holeWidth * arrAns.length + 50 }}>
                {
                    arrAns.map((letter, i) => (
                        <Hole 
                            key={i} 
                            id={i} 
                            letter={[ letter, () => {} ]} 
                            styles={{
                                ...slotStyles,
                                letter: {
                                    ...slotStyles.letter,
                                    backgroundColor: '#003',
                                    color: '#f1f1f1',
                                }
                            }}
                        />
                    ))
                }
            </View>
            <TouchableOpacity onPress={next} style={styles.next}> 
                <Text style={styles.text}>Next</Text>
            </TouchableOpacity>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    imageBackgroundSize: {
        width: screenWidth,
        height: screenHeight,
        paddingVertical: 40,
        alignItems: 'center',
    },

    great: {
        width: screenWidth,
        color: 'green',
        fontWeight: 'bold',
        fontSize: 45,
        backgroundColor: '#222',
        textAlign: 'center',
        marginTop: 30,
    },

    coins: {
        width: 150,
        height: 120,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: 100,
        marginBottom: 10,
    },

    plusFour: {
        color: '#f6cd64',
        fontWeight: 'bold',
        fontSize: 60,

        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: {width: -7, height: 1},
        textShadowRadius: 10,
    },

    answerCont: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
        marginVertical: 40,
        // backgroundColor: '#eee',
        borderRadius: 7,

        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 20,
        },
        shadowOpacity: 0.99,
        shadowRadius: 20,

        elevation: 30,
    },

    next: {
        width: 150,
        paddingVertical: 15,
        borderRadius: 20,
        backgroundColor: '#ccc',
        alignItems: 'center',
    },

    text: {
        color: '#005',
        fontWeight: 'bold',
        fontSize: 24,

        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10,
    },
});

export default Greet
