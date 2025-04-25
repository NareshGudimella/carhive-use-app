import { View } from "react-native"
import { BottomModelStyle } from "../styles/BottomModelStyle"

export const BottomModelView = ({ children }: { children: any }) => {
   return(
    <View style={BottomModelStyle.mainView}>
    <View style={BottomModelStyle.subView}>
        {children}
    </View>
</View>
   )
}