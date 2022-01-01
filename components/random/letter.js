import React, { useEffect } from 'react'
import { StyleSheet, View } from 'react-native';

import { menuSlotStyles } from '../../styles/hole';
import { data } from '../data';

import Hole from '../holes/hole';
import Guess from './guess';

const Letter = ({ reducer }) => {
    const maxNoOfHoles = 12;
    const [state, dispatch] = reducer;

    useEffect(() => {
        if(state.start) {
            if(state.default.length === 0) {
                const noOfHolesGenLetter = maxNoOfHoles - state.answer.length;

                for(let i = 0; i < noOfHolesGenLetter; i++) {
                    const randNum = Math.ceil(Math.random() * 26) + 64;
                    dispatch({ type: 'ADD_LETTER', letter: String.fromCharCode(randNum) });
                }

                dispatch({ type: 'MERGE_ANSWER_AND_RANDOM', max: maxNoOfHoles });
            }
        }
    }, [state]);

    useEffect(() => {
        if(state.init) {
            if(state.setDisableHole.length === 0) {
                dispatch({ type: 'INIT_DISABLE_SLOT'});
            }

            if(state.unPressable.length === 0) {
                dispatch({ type: 'INIT_UNPRESSABLE'});
            }
        }
    }, [state]);

    useEffect(() => {
        if(state.guessedValues.length > 0) {
            const no = state.guessedValues[state.guessedValues.length-1];
            dispatch({ type: 'DISABLE_HOLE', no, paidLetter: state.answer[no] });
            dispatch({ type: 'UPDATE_EMPTY_SLOT_NO' });
            dispatch({ type: 'UNPRESSABLE', no });
        }
    }, [state.guessedValues]);

    const removeLetter = (id, letter, prevLetter) => {
        if(state.firstEmptySlotNo >= 0) {
            dispatch({ type: 'CHANGE_DEFAULT_ARRAY_LETTER', id, value: letter });
            dispatch({ type: 'UPDATE_EMPTY_SLOT', id, value: prevLetter });
            dispatch({ type: 'UPDATE_EMPTY_SLOT_NO' });

            dispatch({ type: 'FILLED_EMPTY_SLOT', data });
        }
    }

    // GUESS --------------------------------------------------------------------
    const fixLetter = (id, letter, prevLetter) => {
        if(state.firstEmptySlotNo >= 0) {
            const guessData = { id, letter, prevLetter, index: state.fastGuessData.length };
            dispatch({ type: 'SAVE_LETTER_DATA', guessData });
        }
    }

    useEffect(() => {
        const fastGuessData = state.fastGuessData;
        const guessData = fastGuessData[fastGuessData.length-1];
        if(typeof guessData === 'object') {
            countGuess(guessData);
        }
    }, [state.setGuessUpdate]);

    const countGuess = ({ id, letter, prevLetter, index }) => {
        dispatch({ type: 'CHANGE_DEFAULT_ARRAY_LETTER', id, value: letter });
        dispatch({ 
            type: 'UPDATE_GUESSED_SLOT', 
            id, 
            value: prevLetter, 
            index,
        });

        dispatch({ type: 'UPDATE_EMPTY_SLOT_NO' });
        dispatch({ type: 'FILLED_EMPTY_SLOT', data });
    }
    // ----------------------------------------------------------------------------

    return (
        <View style={styles.letterHolesCont}>
            <View>
                <View style={styles.menuCont}>
                    {
                        state.default.map((letter, i) => {
                            if(i > 5) return;

                            const disableHole = state.setDisableHole[i];

                            return (
                                <Hole 
                                    key={i}
                                    id={i} 
                                    letter={[ letter, removeLetter ]} 
                                    styles={menuSlotStyles}
                                    helpToGuess={{ disableHole, fixLetter }}
                                />
                            )
                        })
                    }
                </View>
                <View style={styles.menuCont}>
                    {
                        state.default.map((letter, i) => {
                            if(i < 6) return;

                            const disableHole = state.setDisableHole[i];

                            return (
                                <Hole 
                                    key={i}
                                    id={i} 
                                    letter={[ letter, removeLetter ]} 
                                    styles={menuSlotStyles}
                                    helpToGuess={{ disableHole, fixLetter }}
                                />
                            )
                        })
                    }
                </View>
            </View>
            {/**
            
                TODO: This tochable opacity helps players to guess some letters
                        It will give a letter in exchange with the coin
            
            */}
            <Guess reducer={[state, dispatch]} />
        </View>
    )
}

const styles = StyleSheet.create({
    letterHolesCont: {
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },

    menuCont: {
        flexDirection: 'row',
    },
});

export default Letter;
