import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const Congrats = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.finishText}>FINISH</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    finishText: {
        fontSize: 50,
        fontWeight: 'bold',
    }
})

export default Congrats;
