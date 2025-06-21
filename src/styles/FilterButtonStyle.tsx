import { StyleSheet } from "react-native";
import { hp, wp } from "../utils/ResponsiveScreen";

export const FilterButtonStyle = StyleSheet.create({
    buttonstyle: {
        borderWidth: 1,
        borderRadius: 15,
        paddingVertical: hp(1.5),
        paddingHorizontal: hp(2),
        marginRight: wp(2),
        marginTop: hp(1),
        borderColor: '#64748B',

    },
    selectedbutton: {
        backgroundColor: '#00354a',
        borderWidth: 1,
        borderRadius: 15,
        paddingVertical: hp(1.5),
        paddingHorizontal: hp(2),
        marginRight: wp(2),
        marginTop: hp(1),
        borderColor: '#ffffff'
    },
    onselectbutton: {
        borderWidth: 1,
        borderRadius: 15,
        paddingVertical: hp(1.5),
        paddingHorizontal: hp(2),
        marginRight: wp(2),
        marginTop: hp(1),
        borderColor: '#FBC41D',
        backgroundColor: '#FBC41D'
    },
    buttontext: {
        fontSize: 14,
        fontWeight: '500',
        color: '#64748B'
    },
    onselecttext: {
        fontSize: 14,
        fontWeight: '500',
        color: '#ffffff'
    }
})