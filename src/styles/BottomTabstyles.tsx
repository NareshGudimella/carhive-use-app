import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp,
     heightPercentageToDP as hp }
      from 'react-native-responsive-screen';

export const BottomTabstyles = StyleSheet.create({
    selectedstyle: {
       height:24,
       width:24
    },
    nonselectedstyle:{
        height:21,
        width:21
    },
    selectedtextStyle:{
        fontSize:15,
        fontWeight:'bold',
        marginTop:1
    },
    nonselectedtextstyle:{
        fontWeight:'500',
        marginTop:1,color:'#64748B'
    },
    baseStyle:{
        height:18,
        width:40,
        position:'absolute',
        alignSelf:'center',
        top:-4
        
    }
})