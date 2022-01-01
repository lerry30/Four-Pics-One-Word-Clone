import React, { useReducer, useEffect } from 'react';
import { StyleSheet, View, Text, Modal, ImageBackground, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import FourPics from './4pics/four_pics';
import Slots from './slots/letters_slot';
import Letter from './random/letter';
import Greet from './greeting/modal';
import Congrats from './greeting/modal1';

import { MY_STORAGE_ID, saveData } from '../async_storage/storage';
import { reducer } from './reducers/reducer';
import { data } from './data';

const Main = ({ route, navigation }) => {
    const { initState } = route.params;
    const [state, dispatch] = useReducer(reducer, initState);

    // save to storage
    useEffect(() => {
        // console.log(state);
        saveData(MY_STORAGE_ID, state);
    }, [state]);

    const goBack = () => {
        navigation.navigate('Landing', { newState: state });
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <Modal visible={state.won} animationType='slide'>
                <Greet next={() => dispatch({ type: 'NEXT' })} prevAns={state.previousAnswer} />
            </Modal>

            <Modal visible={state.congratulation} animationType='slide'>
                <Congrats />
            </Modal>

            {/* HEADER */}
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={goBack}>
                    <Ionicons name="chevron-back" size={24} color="white" />
                </TouchableOpacity>
                <ImageBackground 
                    style={styles.level}
                    source={require('../assets/img/award.png')} 
                >
                    <Text style={styles.levelText}>{state.level}</Text>
                </ImageBackground>
                <View style={styles.coinsContainer}>
                    <Image 
                        source={require('../assets/img/coin41.png')} 
                        style={styles.icon}
                    />
                    <Text style={styles.coinNo}>{state.coins}</Text>
                </View>
            </View>

            <FourPics images={data[state.difficulty][`pzz_${state.level}`].images} />
            <Slots reducer={[state, dispatch]} />
            <Letter reducer={[state, dispatch]} />
        </View>
    )
}

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    headerContainer: {
        padding: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#004',
    },

    coinsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 10,
        paddingHorizontal: 4,
        paddingVertical: 2,
    },

    icon: {
        width: 20,
        height: 20,
    },

    coinNo: {
        paddingLeft: 7,
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 15,
        textShadowColor: 'rgba(0, 0, 30, 0.9)',
        textShadowOffset: {width: -2, height: 4},
        textShadowRadius: 10
    },

    level: {
        width: 64,
        height: 64,
        position: 'absolute',
        top: 10,
        // 35 is the half of width of this image
        left: (screenWidth / 2) - 32,
        justifyContent: 'center',
    },

    levelText: {
        color: '#003',
        fontWeight: 'bold',
        fontSize: 23,
        textShadowColor: 'rgba(100, 100, 100, 0.9)',
        textShadowOffset: {width: -2, height: 4},
        textShadowRadius: 10,
        alignSelf: 'center',
        marginBottom: 5,
    },
});

export default Main;
