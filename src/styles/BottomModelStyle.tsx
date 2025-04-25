import { StyleSheet } from "react-native";

export const BottomModelStyle =StyleSheet.create({
    mainView:{
        backgroundColor:'rgba(0,0,0,0.5)',
        flex:1,
        justifyContent:'flex-end' 
    },
    subView:{
        backgroundColor:'#ffffff',
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
        elevation:1
    }
})