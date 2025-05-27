import { StyleSheet } from "react-native";
import { hp, wp } from "../utils/ResponsiveScreen";

export const input = StyleSheet.create({
    continerstyle: {
        backgroundColor: '#EEEFF2',
        borderRadius: 10,
        elevation: 1,
        height: hp(6),
        marginVertical: hp(1),
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: wp(5),
        borderWidth: 1,
        borderColor: '#75757533'

    },
    imgstyle: {
        width: 25,
        height: 25
    },
    textinput: {
        color: '#393C47',
        fontSize: 16,
        paddingHorizontal: wp(4),
        fontWeight: '500',
        width: wp(80)
    },
    style: {
        width: 20,
        height: 20,
        tintColor: '#9CA3AF',
    },
    continer: {
        backgroundColor: '#EEEFF2',
        borderRadius: 10,
        elevation: 1,
        height: hp(6),
        marginVertical: hp(1),
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: wp(5),
        justifyContent: 'space-between'
    }
})