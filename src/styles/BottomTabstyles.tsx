import { StyleSheet } from 'react-native';


export const BottomTabstyles = StyleSheet.create({
    selectedstyle: {
        height: 22,
        width: 22,
        tintColor: '#6292ab'
    },
    nonselectedstyle: {
        height: 21,
        width: 21
    },
    selectedtextStyle: {
        fontSize: 15,
        fontWeight: 'bold',
        marginTop: 1
    },
    nonselectedtextstyle: {
        fontWeight: '500',
        marginTop: 1, color: '#64748B'
    },
    baseStyle: {
        height: 18,
        width: 40,
        position: 'absolute',
        alignSelf: 'center',
        top: -4

    }
})