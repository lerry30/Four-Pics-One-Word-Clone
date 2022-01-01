import React, { useEffect } from 'react'
import { StyleSheet, View } from 'react-native';

import { slotStyles } from '../../styles/hole';

import Hole from '../holes/hole';

const Slots = ({ reducer }) => {
    const [state, dispatch] = reducer;
    const noOfSlot = state.emptySlot.length;
    const holeWidth = slotStyles.slotCont.width;

    useEffect(() => {
        if(state.start) {
            if(state.emptySlot.length === 0) {
                dispatch({ type: 'INITIALIZE_EMPTY_SLOTS' });
            }
        }
    }, [state]);

    const updateSlot = (id, letter, prevLetter) => {
        dispatch({ type: 'RETURN_TO_PREV_STATE', id });
        dispatch({ type: 'CHANGE_EMPTY_SLOT_LETTER', id });
        dispatch({ type: 'UPDATE_EMPTY_SLOT_NO' });
    }


    return (
        <View style={styles.holes_container}>
            <View style={{ 
                width: holeWidth * noOfSlot + 20, 
                flexDirection: 'row',
                justifyContent: 'space-between',
            }}>
                {
                    state.emptySlot.map((letter, i) => {
                        let color = state.guessed ? '#002' : '#e00';
                        if(state.unPressable.length > 0) {
                            color = state.unPressable[i] && '#067B15';
                        }

                        return (
                            <Hole 
                                key={i} 
                                id={i} 
                                letter={[ letter[1], updateSlot ]} 
                                styles={{
                                    ...slotStyles,
                                    letter: {
                                        ...slotStyles.letter,
                                        color,
                                        shadowColor: state.guessed ? 'blue' : 'red',
                                    }
                                }}

                                helpToGuess={{ 
                                    disableHole: false, 
                                    fixLetterfalse: () => {} 
                                }}

                                unPressable={state.unPressable[i]}
                            />
                        )
                    })
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    holes_container: {
        flexDirection: 'row',
        justifyContent: 'center',
        margin: 5,
    },
});

export default Slots;
