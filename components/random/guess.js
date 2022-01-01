import React from 'react';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';

const Guess = ({ reducer}) => {
    const [state, dispatch] = reducer;

    const setLetter = () => {
        const emptySlot = state.emptySlot;
        const emp = [];

        if(state.coins > 0) {
            dispatch({ type: 'CUT'});

            for(let i = 0; i < emptySlot.length; i++) {
                if(!state.guessedValues.includes(i)) {
                    if(!state.emptySlot[i][0]) {
                        emp[emp.length] = i;
                    }
                }
            }

            if(emp.length === 0) {
                for(let i = 0; i < emptySlot.length; i++) {
                    const [id, char] = emptySlot[i];
                    if(char !== state.answer[i]) {
                        dispatch({ type: 'RETURN_TO_PREV_STATE', id: i });
                        dispatch({ type: 'CHANGE_EMPTY_SLOT_LETTER', id: i });
                        dispatch({ type: 'GUESS', value: i });
                        break;
                    }
                }

                return;
            }

            const randIndex = Math.floor(Math.random() * emp.length);
            const randValue = emp[randIndex];

            dispatch({ type: 'GUESS', value: randValue });
        }
    }

    return (
        <TouchableOpacity 
            onPress={setLetter}
            style={styles.guessContainer}>
            <Image 
                style={styles.guess}
                source={require('../../assets/img/mybrush.png')}
            />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    guessContainer: {
        paddingTop: 5,
    },

    guess: {
        width: 40,
        height: 86,
        marginLeft: 8,
        borderRadius: 5,
    }
});

export default Guess
