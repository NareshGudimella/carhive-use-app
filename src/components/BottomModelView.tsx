import { Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, View } from "react-native"
import { BottomModelStyle } from "../styles/BottomModelStyle"

export const BottomModelView = ({ children }: { children: any }) => {
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={BottomModelStyle.mainView}>
            <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'padding' : 'height'} style={{ width: '100%' }}>
                <View style={BottomModelStyle.subView}>
                    {children}
                </View>
                </KeyboardAvoidingView>
            </View>
        </TouchableWithoutFeedback>
    )
}