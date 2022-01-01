import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity } from 'react-native';

const Hole = ({ id, letter, styles, helpToGuess = {}, unPressable }) => {
    const [fill, setFill] = letter;
    const [slotEnable, setSlotEnable] = useState(false);
    let disableHole = false;
    let fixLetter = () => {};

    if(Object.keys(helpToGuess).length > 0) {
        disableHole = helpToGuess.disableHole;
        fixLetter = helpToGuess.fixLetter;
    }

    const fillOrEmpty = () => {
        if(fill) {
            setFill(id, '', fill);
        }
    }

    useEffect(() => {
        if(disableHole) {
            console.log('////////////////');
            if(fill) {
                fixLetter(id, '', fill);
            };
            
            setSlotEnable(true);
        }
    }, [disableHole])

    useEffect(() => {
        setSlotEnable(unPressable);
    }, [unPressable]);

    return (
        <View style={ styles.slotCont }>
            <TouchableOpacity 
                disabled={slotEnable}
                style={ styles.slotCont }
                onPress={() => fillOrEmpty()
                }>
                    <Text style={{
                        ...styles.slotCont, 
                        ...styles.letter
                    }}>{ fill }</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Hole;
