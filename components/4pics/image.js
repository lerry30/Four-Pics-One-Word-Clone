import React, { useState } from 'react'
import { StyleSheet, View, Image, Dimensions, TouchableOpacity } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const imgWidth = screenWidth / 2 - 30;
const imgHeight = imgWidth;

const Img = ({ position, resource }) => {
    const [togglePic, setTogglePic] = useState([ false, false, false, false ]);
    const coord = [
        styles.imgPos1,
        styles.imgPos2,
        styles.imgPos3,
        styles.imgPos4,
    ];

    const view = (picId) => {
        setTogglePic([]);
        togglePic.forEach((item, id) => {
            let pic = false;
            if(id == picId) {
                pic = !item;
            }

            setTogglePic(tgls => [...tgls, pic]);
        });
    }

    return (
        <View style={{
                ...coord[position], 
                ...(togglePic[position] ? styles.oneImgSize : styles.fourImgSize),
                ...(togglePic[position] ? styles.top : styles.bottom),
            }}>
            <TouchableOpacity onPress={() => view(position)}>
                <Image 
                    source={resource}
                    style={{
                        ...styles.fourPics, 
                        ...(togglePic[position] ? styles.oneImgSize : styles.fourImgSize)
                    }}
                />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    top: {
        zIndex: 2,
        elevation: 2,
    },

    bottom: {
        zIndex: 1,
        elevation: 1,
    },

    fourImgSize: {
        width: imgWidth,
        height: imgHeight,
    },

    oneImgSize: {
        width: screenWidth - 40,
        height: screenWidth - 40,
        top: 10,
        left: 10,
    },

    imgPos1: {
        position: 'absolute',
        top: 20, 
        left: 20
    },

    imgPos2: {
        position: 'absolute',
        top: 20, 
        left: imgWidth + 40
    },

    imgPos3: {
        position: 'absolute',
        top: imgHeight + 40, 
        left: 20
    },

    imgPos4: {
        position: 'absolute',
        top: imgHeight + 40, 
        left: imgWidth + 40
    },

    fourPics: {
        borderBottomLeftRadius: 3,
        borderBottomRightRadius: 3,
        borderTopRightRadius: 3,
        borderTopLeftRadius: 3,
        overflow: 'hidden',
    },
});

export default Img
