import { View } from "react-native"

export const Cardview = ({ children }: { children: any }) => {
    return (
        <View
            style={{
                backgroundColor: '#ffffff',
                borderRadius: 15,
                borderWidth:0.5,
                borderColor:'#EAECF2',
                elevation: 1
            }}>
            {children}
        </View>
    )
}