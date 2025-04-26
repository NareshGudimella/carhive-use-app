import { StyleSheet } from "react-native";
import { wp,hp } from "../utils/ResponsiveScreen";

export const ImageStyle=StyleSheet.create({
    style:{
        height:17,
        width:17
    },
    text:{
        marginHorizontal: wp(2),
        fontSize: 15,
        fontWeight: '500'
    }
})