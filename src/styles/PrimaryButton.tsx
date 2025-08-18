import { StyleSheet } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
}
    from 'react-native-responsive-screen';

export const PrimaryButtonStyle = StyleSheet.create({
    style: {
        backgroundColor: '#00354a',
        height: hp(5.5),
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center', elevation: 1
    },
    textstyle: {
        fontSize: 15,
        fontWeight: 'bold',
        marginHorizontal: wp(5),
        color:'#ffffff'
    }
})