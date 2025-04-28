import { StyleSheet } from "react-native";
import { wp } from "../utils/ResponsiveScreen";

export const BottomModelStyle = StyleSheet.create({
    mainView: {
        backgroundColor: 'rgba(0,0,0,0.6)',
        flex: 1,
        justifyContent: 'flex-end'
    },
    subView: {
        backgroundColor: '#ffffff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        elevation: 1
    },
    centerView: {
        backgroundColor: 'rgba(0,0,0,0.6)',
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center'
    },
    centersubView: {
        backgroundColor: '#ffffff',
        borderRadius:20,
        elevation: 1,
        marginHorizontal: wp(5)
    }
})