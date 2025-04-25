import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp,
    heightPercentageToDP as hp }
     from 'react-native-responsive-screen';

export const SelectorBoxStyle=StyleSheet.create({
    style:{
        backgroundColor:'#ffffff',
        elevation:2,
        borderRadius:7,
        alignItems:'center',
        paddingHorizontal:hp(2),
        paddingVertical:hp(1.5)
    }
})