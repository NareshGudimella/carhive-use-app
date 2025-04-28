import { View } from "react-native"
import { BottomModelStyle } from "../styles/BottomModelStyle"

export const CenterModalView = ({ children }: { children: any }) => {
    return (
        <View style={BottomModelStyle.centerView}>
            <View style={BottomModelStyle.centersubView}>
                {children}
            </View>
        </View>
    )
}