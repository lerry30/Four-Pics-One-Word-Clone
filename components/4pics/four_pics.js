import React, { useState } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';

import Img from './image';

const screenWidth = Dimensions.get('window').width;

const FourPics = ({ images }) => {
    return (
        <View style={styles.fourPicsCont}>
            {
                Object.values(images).map((item, i) => <Img key={i} position={i} resource={item} />)
            }
        </View>
    );
}

const styles = StyleSheet.create({
    fourPicsCont: {
        width: screenWidth,
        height: screenWidth,
        flexDirection: 'row',
        marginTop: 10
    },
});

export default FourPics;