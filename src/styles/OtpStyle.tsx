import { StyleSheet } from "react-native";
import { wp,hp } from "../utils/ResponsiveScreen";

 export const style = StyleSheet.create({
    otp: {
        borderColor: '#E8ECF4',
        marginHorizontal: wp(3),
        width: 55,
        height: 55,
        borderRadius: 10,
        backgroundColor: '#F7F8F9',
        marginVertical:hp(1)
    },
    otpText: {
        color: '#000000',
        fontSize: 18,
        fontWeight: 'bold'
    },
    otpContainer: {
        justifyContent: 'center'
    },
    aadharmodal:{
        borderColor: '#E8ECF4',
        width: 50,
        height: 50,
        borderRadius: 10,
        backgroundColor: '#F7F8F9',
        marginVertical:hp(1)
    },
    otpBox: {
        borderColor: '#E8ECF4',
        marginHorizontal: wp(1.5),
        width: 50,
        height: 50,
        borderRadius: 10,
        backgroundColor: '#F7F8F9',
        justifyContent: 'center',
        alignItems: 'center',
      },
    
})