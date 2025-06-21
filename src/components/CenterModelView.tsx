import { Pressable, View } from "react-native"
import { BottomModelStyle } from "../styles/BottomModelStyle"

export const CenterModalView = ({ children }: { children: any }) => {
    return (
        <Pressable style={BottomModelStyle.centerView}>
            <View style={BottomModelStyle.centersubView}>
                {children}
            </View>
        </Pressable>
    )
}