import React, { useState, useReducer, useEffect } from 'react';
import { StyleSheet, View, Text, ImageBackground, Image, TouchableOpacity, Dimensions} from 'react-native';

import { data } from './data';

import { reducer } from './reducers/reducer';
import { defaultState } from './reducers/default_state'; 
import { MY_STORAGE_ID, getData, clearAll } from '../async_storage/storage';

const Landing = ({ route, navigation }) => {
    const [state, dispatch] = useReducer(reducer, defaultState);
    const [stateData, setStateData] = useState(defaultState);
    const [fourImages, setFourImages] = useState([]);
    const [back, setBack] = useState(false);

    useEffect(() => {
        // clearAll();
        if(!state.init) {
            getData(MY_STORAGE_ID, setStateData, {...defaultState, init: true});
        }
    }, []);
    
    useEffect(() => {
        if(stateData.init) {
            dispatch({ type: 'INIT', stt: stateData });
            
            if(stateData.default.length == 0) {
                dispatch({ type: 'INITIALIZED' });
                dispatch({ type: 'SAVE_ANSWER_TO_STATE', data });
            }

            setFourPics(stateData);
        }
    }, [stateData]);

    const setFourPics = (_stateData) => {
        setFourImages(Object.values(data[_stateData.difficulty][`pzz_${_stateData.level}`].images));
    }

    const newState = () => {
        if(route.params && !back) {
            setBack(true);
            const { newState } = route.params;
            dispatch({ type: 'INIT', stt: newState });
            setFourPics(newState);
        }
    }

    const gameStart = () => {
        navigation.navigate('Main', { initState: state });
    }

    newState();

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            {/* HEADER */}
            <View style={styles.headerContainer}>
                <Text style={styles.headerTitle}>4 Pics 1 Word</Text>
                <View style={styles.coinsContainer}>
                    <Image 
                        source={require('../assets/img/coin41.png')} 
                        style={styles.icon}
                    />
                    <Text style={styles.coinNo}>{state.coins}</Text>
                </View>
            </View>

            <View style={styles.fourImagesCont}>
                <View style={styles.twoImagesCont}>
                    <Image style={styles.fourImages} source={fourImages[0]} />
                    <Image style={styles.fourImages} source={fourImages[1]} />
                </View>
                <View style={styles.twoImagesCont}>
                    <Image style={styles.fourImages} source={fourImages[2]} />
                    <Image style={styles.fourImages} source={fourImages[3]} />
                </View>
            </View>

            <ImageBackground 
                style={styles.level}
                source={require('../assets/img/award.png')} 
            >
                <Text style={styles.levelText}>{state.level}</Text>
            </ImageBackground>

            <TouchableOpacity 
                style={styles.buttonPlay}
                onPress={gameStart}>
                <Text style={styles.btnText}>Play</Text>
            </TouchableOpacity>
        </View>
    );
}

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    headerContainer: {
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#004',
    },

    headerTitle: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 17,
        textShadowColor: 'rgba(0, 0, 30, 0.9)',
        textShadowOffset: {width: -2, height: 4},
        textShadowRadius: 10
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

    fourImagesCont: {
        paddingVertical: 50,
    },

    twoImagesCont: {
        flexDirection: 'row',
        justifyContent: 'center',
    },

    fourImages: {
        width: 140,
        height: 140,
        borderRadius: 4,
        margin: 4,
    },

    level: {
        width: 100,
        height: 100,
        position: 'absolute',
        top: 215,
        // 50 is the half of width of this image
        left: (screenWidth / 2) - 50,
        justifyContent: 'center',
    },

    levelText: {
        color: '#003',
        fontWeight: 'bold',
        fontSize: 40,
        textShadowColor: 'rgba(100, 100, 100, 0.9)',
        textShadowOffset: {width: -2, height: 4},
        textShadowRadius: 10,
        alignSelf: 'center',
        marginBottom: 5,
    },

    buttonPlay: {
        width: 200,
        height: 60,
        backgroundColor: '#004',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 'bold',
        position: 'absolute',
        top: 375,
        // 100 is the half of width of this button
        left: (screenWidth / 2) - 100,
    },

    btnText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 22,
    },
});

export default Landing;
