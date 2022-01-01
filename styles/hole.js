import { StyleSheet } from 'react-native';

export const slotStyles = StyleSheet.create({
    slotCont: {
        width: 40,
        height: 40,
        backgroundColor: '#eee',
        borderRadius: 7,
    },

    letter: {
        width: 46,
        height: 46,
        position: 'absolute',
        top: -3,
        left: -3,
        color: '#002',
        textAlign: 'center',
        textAlignVertical: 'center',
        // backgroundColor: 'rgba(0, 0, 47, 0.5)',
        backgroundColor: 'transparent',
        borderRadius: 7,
        fontWeight: 'bold',
        fontSize: 18,

        shadowColor: 'blue',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 7,

        elevation: 2,
    }
});

export const menuSlotStyles = StyleSheet.create({
    slotCont: {
        width: 40,
        height: 40,
        margin: 2,
    },

    letter: {
        textAlign: 'center',
        textAlignVertical: 'center',
        color: '#004',
        borderColor: '#717171',
        borderBottomWidth: 3,
        borderRadius: 5,
        backgroundColor: '#ccc',
        fontWeight: 'bold',
        fontSize: 20
    }
});